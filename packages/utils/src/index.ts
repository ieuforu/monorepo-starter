export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: Date): string {
  return date.toTimeString().split(' ')[0]!
}
