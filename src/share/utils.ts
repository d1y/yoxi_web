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