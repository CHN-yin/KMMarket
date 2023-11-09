
export const setLocalStorage = (key, value) => {
  const now = new Date()
  const expirationDate = now.setTime(now.getTime() + 24 * 60 * 60 * 1000)
  const item = { value, expirationDate }
  localStorage.setItem(key, JSON.stringify(item))
}

export const getLocalStorage = (key) => {
  try {
    const item = JSON.parse(localStorage.getItem(key))
    const now = new Date()
    if (now.getTime() > item.expirationDate) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  } catch (error) {
    if (key === 'cartList') return {}
    return ''
  }
}

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key)
}
