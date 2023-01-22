export class UtilStringFormatter {
  value: string

  constructor(stringInKebabCase: string) {
    this.value = stringInKebabCase
  }

  toCamelCase(): string {
    const array = this.value.split('-')
    const firstWord = array[0]
    const otherWord = array.map((item, index) => {
      if (index > 0) {
        return `${item[0].toUpperCase()}${item.substring(1)}`
      }
    })

    return `${firstWord}${otherWord.join('')}`
  }

  toUpperSnakeCase(): string {
    const array = this.value.split('-')
    const string = array.map((item) => item.toUpperCase())
    return string.join('_')
  }

  toLowerSnakeCase(): string {
    const array = this.value.split('-')
    const string = array.map((item) => item.toLowerCase())
    return string.join('_')
  }

  toUpperKebabCase(): string {
    return this.value.toUpperCase()
  }

  toLowerKebabCase(): string {
    return this.value.toLowerCase()
  }

  toPascalCase(): string {
    const array = this.value.split('-')
    const firstWord = `${array[0][0].toUpperCase()}${array[0].substring(1)}`
    const otherWord = array.map((item, index) => {
      if (index > 0) {
        return `${item[0].toUpperCase()}${item.substring(1)}`
      }
    })

    return `${firstWord}${otherWord.join('')}`
  }
}
