export const isObject = (x: any) => {
  return typeof x === 'object' && x !== null
}

export const getData = (key: string, isJSON: boolean = true)=> {
  try {
    const data = localStorage.getItem(key)
    if (isJSON) return JSON.parse(data as any)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const setData = (key: string, value: any)=> {
  try {
    if (isObject(value)) value = JSON.stringify(value)
    localStorage.setItem(key, value)
  } catch (error) {
    throw new Error(error)
  }
}

export const changePageTitle = (title: string)=> {
  try {
    document.title = title
  } catch (error) {
    throw new Error(error)
  }
}

export const changePageColor = (color: string)=> {
  try {
    document.body.style.backgroundColor = color
  } catch (error) {
    throw new Error(error)
  }
}

export const checkDesktop = (): boolean => {
  try {
    // just like ?target=desktop
    const ctx = window.location.search
    return ctx.indexOf("desktop") >= 0
  } catch (error) {
    throw new Error(error)
  }
}