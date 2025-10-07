export const capitalize = (text: string): string => {
  if (!text || text.length === 0) {
    return ''
  }
  const firstLetter = text.charAt(0).toUpperCase()
  const restOfString = text.slice(1)
  return firstLetter + restOfString
}

interface NamedObject {
  name: string
  [key: string]: unknown
}
export const namesToStringCapitalized = (dataArray: NamedObject[]): string => {
  const names = dataArray.map((item) => capitalize(item.name))
  return names.join(', ')
}
