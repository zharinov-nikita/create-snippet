import chalk from 'chalk'
import fs from 'fs'
import { enumSnippetName } from '../../enums'
import { UtilString } from '../string'
import type { TypeCreateOptions, TypeFormatOptions } from './snippet.type'

export class UtilSnippet {
  private readonly string: UtilString

  constructor() {
    this.string = new UtilString()
  }

  public format({ pathToSnippet, name }: TypeFormatOptions): string {
    const unformattedSnippet = JSON.stringify(fs.readFileSync(pathToSnippet, 'utf-8'))
    const formattedSnippet = unformattedSnippet
      .replaceAll(enumSnippetName.camelCase, `${this.string.toCamelCase(name)}`)
      .replaceAll(enumSnippetName.pascalCase, `${this.string.toPascalCase(name)}`)
      .replaceAll(enumSnippetName.lowerSnakeCase, `${this.string.toLowerSnakeCase(name)}`)
      .replaceAll(enumSnippetName.upperSnakeCase, `${this.string.toUpperSnakeCase(name)}`)
      .replaceAll(enumSnippetName.lowerKebabCase, `${this.string.toLowerKebabCase(name)}`)
      .replaceAll(enumSnippetName.upperKebabCase, `${this.string.toUpperKebabCase(name)}`)
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
