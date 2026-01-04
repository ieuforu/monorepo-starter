const App = () => {
  console.log('环境变量测试:', import.meta.env.VITE_API_URL)
  console.log('Process兼容测试:', import.meta.env.VITE_APP_TITLE)
  return (
    <div>
      <h1 className={'text-5xl font-semibold text-cyan-500'}>Hello React + Vite</h1>
      {[1, 2, 3].map((item, index) => (
        <li className="px-6 bg-amber-400" key={`item_${index}`}>
          {item}
        </li>
      ))}
    </div>
  )
}
export default App
