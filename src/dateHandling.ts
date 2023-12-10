export const dateFormat = (dateString: string) => {
  const dayName = new Date(dateString).toLocaleDateString('en-fi', {
    weekday: 'short',
  })

  const date = new Date(dateString).toLocaleDateString('fi-fi', {
    month: 'numeric',
    day: 'numeric',
  })

  const time = new Date(dateString)
    .toLocaleTimeString('fi-fi', {
      timeStyle: 'short',
    })
    .replace('.', ':')

  const today = new Date().toISOString().substring(0, 10)
  const activity = new Date(dateString).toISOString().substring(0, 10)

  if (activity === today) {
    return `Today ${time}`
  }

  return `${dayName} ${date} ${time}`
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
