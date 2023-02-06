import chalk from 'chalk'
import fs from 'fs'
import { enumPrefixName, enumSnippetName, enumSuffixName } from '../../enums'
import { UtilString } from '../string'
import type { TypeCreateOptions, TypeFormatOptions } from './snippet.type'

export class UtilSnippet {
  private readonly string: UtilString

  constructor() {
    this.string = new UtilString()
  }

  public format({ pathToSnippet, name, prefix, suffix }: TypeFormatOptions): string {
    const unformattedSnippet = JSON.stringify(fs.readFileSync(pathToSnippet, 'utf-8'))
    const formattedSnippet = unformattedSnippet
      // name
      .replaceAll(enumSnippetName.camelCase, `${this.string.toCamelCase(name)}`)
      .replaceAll(enumSnippetName.pascalCase, `${this.string.toPascalCase(name)}`)
      .replaceAll(enumSnippetName.lowerSnakeCase, `${this.string.toLowerSnakeCase(name)}`)
      .replaceAll(enumSnippetName.upperSnakeCase, `${this.string.toUpperSnakeCase(name)}`)
      .replaceAll(enumSnippetName.lowerKebabCase, `${this.string.toLowerKebabCase(name)}`)
      .replaceAll(enumSnippetName.upperKebabCase, `${this.string.toUpperKebabCase(name)}`)
      // prefix
      .replaceAll(enumPrefixName.camelCase, `${this.string.toCamelCase(prefix)}`)
      .replaceAll(enumPrefixName.pascalCase, `${this.string.toPascalCase(prefix)}`)
      .replaceAll(enumPrefixName.lowerSnakeCase, `${this.string.toLowerSnakeCase(prefix)}`)
      .replaceAll(enumPrefixName.upperSnakeCase, `${this.string.toUpperSnakeCase(prefix)}`)
      .replaceAll(enumPrefixName.lowerKebabCase, `${this.string.toLowerKebabCase(prefix)}`)
      .replaceAll(enumPrefixName.upperKebabCase, `${this.string.toUpperKebabCase(prefix)}`)
      // suffix
      .replaceAll(enumSuffixName.camelCase, `${this.string.toCamelCase(suffix)}`)
      .replaceAll(enumSuffixName.pascalCase, `${this.string.toPascalCase(suffix)}`)
      .replaceAll(enumSuffixName.lowerSnakeCase, `${this.string.toLowerSnakeCase(suffix)}`)
      .replaceAll(enumSuffixName.upperSnakeCase, `${this.string.toUpperSnakeCase(suffix)}`)
      .replaceAll(enumSuffixName.lowerKebabCase, `${this.string.toLowerKebabCase(suffix)}`)
      .replaceAll(enumSuffixName.upperKebabCase, `${this.string.toUpperKebabCase(suffix)}`)
    return JSON.parse(formattedSnippet)
  }

  public create(options: TypeCreateOptions) {
    const mkdir = options.isFlat ? options.pathFlatSnippetFile : options.pathSnippetFile
    const writeFile = options.isFlat ? options.pathFlatWriteSnippetFile : options.pathWriteSnippetFile
    fs.mkdirSync(mkdir, { recursive: true })
    fs.writeFileSync(writeFile, options.formattedSnippet)
    // eslint-disable-next-line no-console
    console.log(`${chalk.green(`√`)} ${chalk.gray(`${options.snippetFileName}`)}`)
  }
}
