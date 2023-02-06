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
    const keysEnumSnippetName = Object.keys(enumSnippetName)
    const valuesEnumSnippetName = Object.values(enumSnippetName)
    const keysEnumPrefixName = Object.keys(enumPrefixName)
    const valuesEnumPrefixName = Object.values(enumPrefixName)
    const keysEnumSuffixName = Object.keys(enumSuffixName)
    const valuesEnumSuffixName = Object.values(enumSuffixName)

    const keys = [...keysEnumSnippetName, ...keysEnumPrefixName, ...keysEnumSuffixName]

    let unformattedSnippet = JSON.stringify(fs.readFileSync(pathToSnippet, 'utf-8'))

    const replace = (replaceValue: string, values: string[]) => {
      values.forEach((value, index) => {
        const mainCase = keys[index].charAt(0).toUpperCase() + keys[index].slice(1)
        // TODO: fix as 'toCamelCase'
        const method = `to${mainCase}` as 'toCamelCase'
        const string = replaceValue.length > 0 ? this.string[method](replaceValue) : ''
        unformattedSnippet = unformattedSnippet.replaceAll(value, string)
      })
    }

    replace(name, valuesEnumSnippetName)
    replace(prefix, valuesEnumPrefixName)
    replace(suffix, valuesEnumSuffixName)

    return JSON.parse(unformattedSnippet)
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
