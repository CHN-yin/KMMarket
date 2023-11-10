
export const setLocalStorage = (key, value) => {
  const item = { value }
  localStorage.setItem(key, JSON.stringify(item))
}

export const getLocalStorage = (key) => {
  try {
    const item = JSON.parse(localStorage.getItem(key))
    return item.value
  } catch (error) {
    if (key === 'cartList') return {}
    return ''
  }
}

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  localStorage.clear()
}
