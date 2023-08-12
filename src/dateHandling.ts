export const dateFormat = (dateString: string) => {
  const dayName = new Date(dateString).toLocaleDateString('en-fi', {
    weekday: 'short',
  })

  const date = new Date(dateString).toLocaleDateString('fi-fi', {
    month: 'numeric',
    day: 'numeric',
  })

  const time = new Date(dateString).toLocaleTimeString('fi-fi', {
    timeStyle: 'short',
  })

  const today = new Date().toISOString().substring(0, 10)
  const activity = new Date(dateString).toISOString().substring(0, 10)

  if (activity === today) {
    return `Today ${time}`
  }

  return `${dayName} ${date} ${time}`
}
