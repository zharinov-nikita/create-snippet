import fs from 'fs'
import path from 'path'
import { CONSTANTS } from '../../constants'
import { enumPrefixName, enumSnippetName, enumSuffixName } from '../../enums'
import { TypeCase, TypeConfig } from '../../types'
import { InterfaceConfig } from './config.interface'

export class ModuleConfig implements InterfaceConfig<TypeConfig> {
  public readonly rootDirConfig: string
  public readonly isRootDirConfig: boolean

  constructor() {
    this.rootDirConfig = CONSTANTS.ROOT_DIR_CONFIG
    this.isRootDirConfig = fs.existsSync(CONSTANTS.ROOT_DIR_CONFIG)
  }

  private example(index: number): string {
    function objectToString(object: TypeCase): string {
      const values = Object.values(object)
      const indexLastValue = values.length - 1
      return values
        .map((item: string, i) => `'${item.replace(',', '')}'[x]${i !== indexLastValue ? '\n' : ''}`)
        .toString()
        .replaceAll(',', '')
        .replaceAll('[x]', ',')
    }

    if (index === 0)
      return `export const SnippetName = [
${objectToString(enumSnippetName)}
]
    `

    if (index === 1)
      return `export const PrefixNameSnippetName = [
${objectToString(enumPrefixName)}
      
${objectToString(enumSnippetName)}
]`

    if (index === 2)
      return `export const SnippetNameSuffixName = [
${objectToString(enumSnippetName)}
    
${objectToString(enumSuffixName)}
]`

    if (index === 3)
      return `export const PrefixNameSnippetNameSuffixName = [
${objectToString(enumPrefixName)}
    
${objectToString(enumSnippetName)}

${objectToString(enumSuffixName)}
]`

    return `export const SnippetName = [
${objectToString(enumSnippetName)}
]
    `
  }

  public init(): void {
    const array: number[] = Array.from(Array(4).keys())
    const examplePaths: string[] = array.map((_, index) => `${this.rootDirConfig}/my-snippet-${index + 1}`)

    examplePaths.forEach((pathExample, index) => {
      fs.mkdirSync(path.join(pathExample), { recursive: true })
      fs.writeFileSync(path.join(...[pathExample, 'snippet-name.ts']), this.example(index))
    })
  }

  public get() {
    const snippets = fs.readdirSync(this.rootDirConfig)
    return snippets.map((snippetName) => ({
      snippetName,
      pathToSnippet: path.join(...[this.rootDirConfig, snippetName]),
    }))
  }
}
