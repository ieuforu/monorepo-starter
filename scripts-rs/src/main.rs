use serde::{Serialize};
use serde_json::{json, Map, Value};
use std::env;
use std::fs;
use std::io::Result;
use std::path::Path;
use std::process::Command;

fn format_file(path: &str) {
    let _ = Command::new("pnpm")
        .args(["biome", "check", "--write", "--unsafe", path])
        .output();
}

struct PackageController {
    path: String,
    mode: String,
}

impl PackageController {
    fn new(path: &str, mode: &str) -> Self {
        Self {
            path: path.to_string(),
            mode: mode.to_string(),
        }
    }

    fn sync_exports(&self) -> Result<()> {
        let pkg_json_path = format!("{}/package.json", self.path);
        let src_path = format!("{}/src", self.path);

        if !Path::new(&pkg_json_path).exists() {
            return Ok(());
        }

        let content = fs::read_to_string(&pkg_json_path)?;
        let old_pkg: Map<String, Value> = serde_json::from_str(&content).expect("JSON error");

        let mut submodules = Vec::new();
        if let Ok(entries) = fs::read_dir(src_path) {
            for entry in entries.flatten() {
                let path = entry.path();
                if path.is_file() {
                    if let Some(name) = path.file_stem().and_then(|s| s.to_str()) {
                        if name != "index"
                            && (path.extension() == Some("ts".as_ref())
                                || path.extension() == Some("tsx".as_ref()))
                        {
                            submodules.push(name.to_string());
                        }
                    }
                }
            }
        }
        submodules.sort();

        let type_ext = if self.mode == "dev" { "ts" } else { "d.mts" };
        let type_dir = if self.mode == "dev" { "src" } else { "dist" };

        // 核心逻辑：根据模式决定运行时路径
        let get_runtime_path = |name: &str| {
            if self.mode == "dev" {
                format!("./src/{}.ts", name)
            } else {
                format!("./dist/{}.mjs", name)
            }
        };

        let mut exports_map = Map::new();

        // 处理主入口 "."
        let main_runtime = get_runtime_path("index");
        exports_map.insert(
            ".".to_string(),
            json!({
                "types": format!("./{}/index.{}", type_dir, type_ext),
                "development": "./src/index.ts",
                "import": main_runtime,
                "default": main_runtime
            }),
        );

        // 处理子模块
        for sub in submodules {
            let sub_runtime = get_runtime_path(&sub);
            exports_map.insert(
                format!("./{}", sub),
                json!({
                    "types": format!("./{}/{}.{}", type_dir, sub, type_ext),
                    "development": format!("./src/{}.ts", sub),
                    "import": sub_runtime,
                    "default": sub_runtime
                }),
            );
        }

        let mut new_pkg = Map::new();
        let priority_keys = [
            "name",
            "version",
            "private",
            "type",
            "types",
            "exports",
            "scripts",
            "dependencies",
            "devDependencies",
        ];

        for key in priority_keys {
            if let Some(val) = old_pkg.get(key) {
                if key == "exports" {
                    new_pkg.insert(key.to_string(), Value::Object(exports_map.clone()));
                } else if key == "types" {
                    new_pkg.insert(
                        key.to_string(),
                        Value::String(format!("./{}/index.{}", type_dir, type_ext)),
                    );
                } else {
                    new_pkg.insert(key.to_string(), val.clone());
                }
            }
        }

        for (key, val) in &old_pkg {
            if !priority_keys.contains(&key.as_str()) {
                new_pkg.insert(key.clone(), val.clone());
            }
        }

        let formatter = serde_json::ser::PrettyFormatter::with_indent(b"  ");
        let mut buf = Vec::new();
        let mut ser = serde_json::Serializer::with_formatter(&mut buf, formatter);
        Value::Object(new_pkg).serialize(&mut ser).unwrap();

        fs::write(&pkg_json_path, String::from_utf8(buf).unwrap())?;
        format_file(&pkg_json_path);
        Ok(())
    }
}

fn snake_to_pascal(s: &str) -> String {
    s.split('_')
        .map(|w| w[..1].to_uppercase() + &w[1..])
        .collect()
}

fn process_db() -> Result<()> {
    let output_file = "packages/db/src/schema/index.ts";
    let schema_dir = "packages/db/src/schema";
    if !Path::new(schema_dir).exists() {
        return Ok(());
    }

    let mut entries: Vec<String> = fs::read_dir(schema_dir)?
        .flatten()
        .filter_map(|e| e.file_name().into_string().ok())
        .filter(|n| n.ends_with(".ts") && n != "index.ts")
        .map(|n| n.replace(".ts", ""))
        .collect();
    entries.sort();

    let mut content = String::from("// AUTO-GENERATED\nimport type { z } from 'zod'\n");
    for name in &entries {
        content.push_str(&format!("import * as {}Table from './{}'\n", name, name));
    }
    content.push_str("\nexport const schema = {\n");
    for name in &entries {
        content.push_str(&format!("  ...{}Table,\n", name));
    }
    content.push_str("}\n\n");

    for name in &entries {
        let pascal = snake_to_pascal(name);
        content.push_str(&format!("export type {{ {} }} from './{}'\n", pascal, name));
        content.push_str(&format!(
            "export {{ {}s, insert{}Schema, select{}Schema }} from './{}'\n",
            name, pascal, pascal, name
        ));
        content.push_str(&format!(
            "export type New{} = z.infer<typeof {}Table.insert{}Schema>\n\n",
            pascal, name, pascal
        ));
    }

    fs::write(output_file, content)?;
    format_file(output_file);
    Ok(())
}

fn process_api() -> Result<()> {
    let output_file = "packages/api/src/root.ts";
    let router_dir = "packages/api/src/router";
    if !Path::new(router_dir).exists() {
        return Ok(());
    }

    let mut entries: Vec<String> = fs::read_dir(router_dir)?
        .flatten()
        .filter_map(|e| e.file_name().into_string().ok())
        .filter(|n| n.ends_with(".ts"))
        .map(|n| n.replace(".ts", ""))
        .collect();
    entries.sort();

    let mut content = String::from("// AUTO-GENERATED\nimport { createTRPCRouter } from './trpc'\n");
    for name in &entries {
        content.push_str(&format!(
            "import {{ {}Router }} from './router/{}'\n",
            name, name
        ));
    }
    content.push_str("\nexport const appRouter = createTRPCRouter({\n");
    for name in &entries {
        content.push_str(&format!("  {}: {}Router,\n", name, name));
    }
    content.push_str("})\n\nexport type AppRouter = typeof appRouter\n");

    fs::write(output_file, content)?;
    format_file(output_file);
    Ok(())
}

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let mode = if args.len() > 1 && args[1] == "build" {
        "build"
    } else {
        "dev"
    };

    process_db()?;
    process_api()?;

    if let Ok(entries) = fs::read_dir("packages") {
        for entry in entries.flatten() {
            if entry.path().is_dir() {
                PackageController::new(entry.path().to_str().unwrap(), mode).sync_exports()?;
            }
        }
    }
    println!("\x1b[32m✨ Codegen & Auto-format completed! (Mode: {})\x1b[0m", mode);
    Ok(())
}