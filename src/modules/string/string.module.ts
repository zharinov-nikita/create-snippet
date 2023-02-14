export class ModuleString {
  public toCamelCase(stringInKebabCase: string): string {
    if (stringInKebabCase.length === 0) return ''
    const array = stringInKebabCase.split('-')
    const firstWord = array[0]
    const otherWord = array.map((item, index) => {
      if (index > 0) {
        return `${item[0].toUpperCase()}${item.substring(1)}`
      }
    })

    return `${firstWord}${otherWord.join('')}`
  }

  public toUpperSnakeCase(stringInKebabCase: string): string {
    if (stringInKebabCase.length === 0) return ''
    const array = stringInKebabCase.split('-')
    const string = array.map((item) => item.toUpperCase())
    return string.join('_')
  }

  public toLowerSnakeCase(stringInKebabCase: string): string {
    if (stringInKebabCase.length === 0) return ''
    const array = stringInKebabCase.split('-')
    const string = array.map((item) => item.toLowerCase())
    return string.join('_')
  }

  public toUpperKebabCase(stringInKebabCase: string): string {
    if (stringInKebabCase.length === 0) return ''
    return stringInKebabCase.toUpperCase()
  }

  public toLowerKebabCase(stringInKebabCase: string): string {
    if (stringInKebabCase.length === 0) return ''
    return stringInKebabCase.toLowerCase()
  }

  public toPascalCase(stringInKebabCase: string): string {
    if (stringInKebabCase.length === 0) return ''
    const array = stringInKebabCase.split('-')
    const firstWord = `${array[0][0].toUpperCase()}${array[0].substring(1)}`
    const otherWord = array.map((item, index) => {
      if (index > 0) {
        return `${item[0].toUpperCase()}${item.substring(1)}`
      }
    })

    return `${firstWord}${otherWord.join('')}`
  }

  private isFirstLetterUpperCase(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    return stringInAnyCase.charAt(0).toUpperCase() === stringInAnyCase.charAt(0)
  }

  private isFirstLetterLowerCase(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    return stringInAnyCase.charAt(0).toLowerCase() === stringInAnyCase.charAt(0)
  }

  private isStringContainsDash(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    return stringInAnyCase.search(/-/g) > 0
  }

  private isStringContainsUnderlining(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    return stringInAnyCase.search(/_/g) > 0
  }

  private isStringUpperCase(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    return stringInAnyCase.toUpperCase() === stringInAnyCase
  }

  private isStringLowerCase(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    return stringInAnyCase.toLowerCase() === stringInAnyCase
  }

  public isCamelCase(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    if (this.isFirstLetterUpperCase(stringInAnyCase)) return false
    if (this.isStringContainsDash(stringInAnyCase)) return false
    if (this.isStringContainsUnderlining(stringInAnyCase)) return false
    if (this.isStringUpperCase(stringInAnyCase)) return false
    return true
  }

  public isPascalCase(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    if (this.isFirstLetterLowerCase(stringInAnyCase)) return false
    if (this.isStringContainsDash(stringInAnyCase)) return false
    if (this.isStringContainsUnderlining(stringInAnyCase)) return false
    if (this.isStringUpperCase(stringInAnyCase)) return false
    return true
  }

  public isUpperSnakeCase(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    if (this.isStringUpperCase(stringInAnyCase) && this.isStringContainsUnderlining(stringInAnyCase)) {
      return true
    }
    return false
  }

  public isLowerSnakeCase(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    if (this.isStringLowerCase(stringInAnyCase) && this.isStringContainsUnderlining(stringInAnyCase)) {
      return true
    }
    return false
  }

  public isUpperKebabCase(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    if (this.isStringUpperCase(stringInAnyCase) && this.isStringContainsDash(stringInAnyCase)) {
      return true
    }
    return false
  }

  public isLowerKebabCase(stringInAnyCase: string): boolean {
    if (stringInAnyCase.length === 0) return false
    if (this.isStringLowerCase(stringInAnyCase) && this.isStringContainsDash(stringInAnyCase)) {
      return true
    }
    return false
  }
}
