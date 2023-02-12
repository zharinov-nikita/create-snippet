import fs from 'fs'
import path from 'path'
import { CONSTANTS } from '../../constants'
import { enumPrefixName, enumSnippetName, enumSuffixName } from '../../enums'
import { TypeConfig } from '../../types'
import { InterfaceConfig } from './config.interface'

export class ModuleConfig implements InterfaceConfig<TypeConfig> {
  public readonly rootDirConfig: string
  public readonly isRootDirConfig: boolean

  constructor() {
    this.rootDirConfig = CONSTANTS.ROOT_DIR_CONFIG
    this.isRootDirConfig = fs.existsSync(CONSTANTS.ROOT_DIR_CONFIG)
  }

  private example(index: number): string {
    if (index === 0)
      return `export const SnippetName = [
  '${enumSnippetName.camelCase}',
  '${enumSnippetName.lowerKebabCase}',
  '${enumSnippetName.lowerSnakeCase}',
  '${enumSnippetName.pascalCase}',
  '${enumSnippetName.upperKebabCase}',
  '${enumSnippetName.upperSnakeCase}',
]
    `

    if (index === 1)
      return `export const PrefixNameSnippetName = [
  '${enumPrefixName.camelCase}',
  '${enumPrefixName.lowerKebabCase}',
  '${enumPrefixName.lowerSnakeCase}',
  '${enumPrefixName.pascalCase}',
  '${enumPrefixName.upperKebabCase}',
  '${enumPrefixName.upperSnakeCase}',
      
  '${enumSnippetName.camelCase}',
  '${enumSnippetName.lowerKebabCase}',
  '${enumSnippetName.lowerSnakeCase}',
  '${enumSnippetName.pascalCase}',
  '${enumSnippetName.upperKebabCase}',
  '${enumSnippetName.upperSnakeCase}',
]`

    if (index === 2)
      return `export const SnippetNameSuffixName = [
  '${enumSnippetName.camelCase}',
  '${enumSnippetName.lowerKebabCase}',
  '${enumSnippetName.lowerSnakeCase}',
  '${enumSnippetName.pascalCase}',
  '${enumSnippetName.upperKebabCase}',
  '${enumSnippetName.upperSnakeCase}',
      
  '${enumSuffixName.camelCase}',
  '${enumSuffixName.lowerKebabCase}',
  '${enumSuffixName.lowerSnakeCase}',
  '${enumSuffixName.pascalCase}',
  '${enumSuffixName.upperKebabCase}',
  '${enumSuffixName.upperSnakeCase}',
]`

    if (index === 3)
      return `export const PrefixNameSnippetNameSuffixName = [
  ${enumPrefixName.camelCase}',
  '${enumPrefixName.lowerKebabCase}',
  '${enumPrefixName.lowerSnakeCase}',
  '${enumPrefixName.pascalCase}',
  '${enumPrefixName.upperKebabCase}',
  '${enumPrefixName.upperSnakeCase}',
          
  '${enumSnippetName.camelCase}',
  '${enumSnippetName.lowerKebabCase}',
  '${enumSnippetName.lowerSnakeCase}',
  '${enumSnippetName.pascalCase}',
  '${enumSnippetName.upperKebabCase}',
  '${enumSnippetName.upperSnakeCase}',
        
  '${enumSuffixName.camelCase}',
  '${enumSuffixName.lowerKebabCase}',
  '${enumSuffixName.lowerSnakeCase}',
  '${enumSuffixName.pascalCase}',
  '${enumSuffixName.upperKebabCase}',
  '${enumSuffixName.upperSnakeCase}',
]`

    return `export const SnippetName = [
  '${enumSnippetName.camelCase}',
  '${enumSnippetName.lowerKebabCase}',
  '${enumSnippetName.lowerSnakeCase}',
  '${enumSnippetName.pascalCase}',
  '${enumSnippetName.upperKebabCase}',
  '${enumSnippetName.upperSnakeCase}',
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
