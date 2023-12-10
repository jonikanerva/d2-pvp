const daySuffix = (n: number) => {
  if (n > 3 && n < 21) return `${n}th`
  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

export const dateFormat = (dateString: string) => {
  const date = new Date(dateString)
  const weekday = date.toLocaleDateString('en-fi', { weekday: 'long' })
  const month = date.toLocaleDateString('en-fi', { month: 'short' })
  const day = date.getDate()

  return `${weekday}, ${month} ${daySuffix(day)}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const groupBy = <T, K extends keyof any>(
  array: T[],
  getKey: (item: T) => K,
): Record<K, T[]> =>
  array.reduce<Record<K, T[]>>(
    (accumulator, currentItem) => {
      const key = getKey(currentItem)

      if (!accumulator[key]) {
        accumulator[key] = []
      }

      accumulator[key].push(currentItem)
      return accumulator
    },
    {} as Record<K, T[]>,
  )

export const isInLastMonth = (dateStr: string): boolean => {
  const date = new Date(dateStr)
  const now = new Date()
  const timeDiff = now.getTime() - date.getTime()
  const daysDiff = timeDiff / (1000 * 3600 * 24)

  return daysDiff <= 30
}
