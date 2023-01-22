export class UtilStringFormatter {
  toCamelCase(stringInKebabCase: string): string {
    const array = stringInKebabCase.split('-')
    const firstWord = array[0]
    const otherWord = array.map((item, index) => {
      if (index > 0) {
        return `${item[0].toUpperCase()}${item.substring(1)}`
      }
    })

    return `${firstWord}${otherWord.join('')}`
  }

  toUpperSnakeCase(stringInKebabCase: string): string {
    const array = stringInKebabCase.split('-')
    const string = array.map((item) => item.toUpperCase())
    return string.join('_')
  }

  toLowerSnakeCase(stringInKebabCase: string): string {
    const array = stringInKebabCase.split('-')
    const string = array.map((item) => item.toLowerCase())
    return string.join('_')
  }

  toUpperKebabCase(stringInKebabCase: string): string {
    return stringInKebabCase.toUpperCase()
  }

  toLowerKebabCase(stringInKebabCase: string): string {
    return stringInKebabCase.toLowerCase()
  }

  toPascalCase(stringInKebabCase: string): string {
    const array = stringInKebabCase.split('-')
    const firstWord = `${array[0][0].toUpperCase()}${array[0].substring(1)}`
    const otherWord = array.map((item, index) => {
      if (index > 0) {
        return `${item[0].toUpperCase()}${item.substring(1)}`
      }
    })

    return `${firstWord}${otherWord.join('')}`
  }
}
