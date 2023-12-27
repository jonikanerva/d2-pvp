import { isInLastMonth } from './dateHandling'

const isSupported = (): boolean => {
  const testString = 'test'

  try {
    window.localStorage.setItem(testString, testString)
    window.localStorage.removeItem(testString)
    return true
  } catch (e) {
    return false
  }
}

const setItem = <T>(id: string, value: T): void => {
  window.localStorage.setItem(id, JSON.stringify(value))
}

const getItem = <T>(id: string): T | null => {
  const value = window.localStorage.getItem(id)

  if (value === null) {
    return null
  }

  try {
    return JSON.parse(value) as T
  } catch (e) {
    return null
  }
}

export const cleanStorage = () => {
  Object.keys(window.localStorage).forEach((key) => {
    const date = key.substring(0, 10)

    if (isInLastMonth(date) === false) {
      console.log('Cleaned localStorage')
      window.localStorage.removeItem(key)
    }
  })
}

export const getOrSet = async <T>(
  id: string,
  fetchFunction: () => Promise<T>,
): Promise<T | null> => {
  if (!isSupported()) {
    return null
  }

  const storedValue = getItem<T>(id)

  if (storedValue !== null) {
    console.log('Cache hit from localStorage')
    return storedValue
  }

  return fetchFunction()
    .then((fetchedValue) => {
      setItem(id, fetchedValue)

      return fetchedValue
    })
    .catch((error) => {
      console.error('Error fetching data: ', error)

      return null
    })
}
