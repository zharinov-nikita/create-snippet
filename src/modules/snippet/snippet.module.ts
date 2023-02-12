import fs from 'fs'
import nodePath from 'path'
import { prompt, PromptObject } from 'prompts'
import recursiveReadDir from 'recursive-readdir'
import { CONSTANTS } from '../../constants'
import { enumPrefixName, enumSnippetName, enumSuffixName } from '../../enums'
import type { TypeConfig } from '../../types'
import { ModuleString } from '../string'

interface TypeOptionsSnippetGeneration {
  snippetName: string
  name: string
  path: string
  isFlat: boolean
  suffix: string
  prefix: string
}

export class ModuleSnippet {
  private readonly moduleString: ModuleString
  private readonly rootDirConfig: string
  private options: TypeOptionsSnippetGeneration

  constructor() {
    this.moduleString = new ModuleString()
    this.rootDirConfig = CONSTANTS.ROOT_DIR_CONFIG
    this.options = {
      snippetName: '',
      name: '',
      path: '',
      isFlat: false,
      suffix: '',
      prefix: '',
    }
  }

  private async addOptions() {
    const data = async (): Promise<PromptObject[]> => {
      return [
        {
          type: 'select',
          name: 'snippetName',
          message: 'Pick a snippet',
          choices: fs.readdirSync(this.rootDirConfig).map((path) => {
            return { title: path, value: path }
          }),
          initial: 0,
        },
        { type: 'text', name: 'name', message: 'Pick a name' },
        { type: 'text', name: 'path', message: 'Pick a path' },
        {
          type: 'toggle',
          name: 'isFlat',
          message: 'Create a flat file structure?',
          initial: false,
          active: 'yes',
          inactive: 'no',
        },
        {
          type: (_, values) => 'text',
          name: 'prefix',
          message: 'Pick a prefix',
        },
        {
          type: (_, values) => 'text',
          name: 'suffix',
          message: 'Pick a suffix',
        },
      ]
    }
    const options = await prompt(data)
    this.options = { ...this.options, ...options }
  }

  private createPathDirectoryCreatedSnippet(pathToSnippet: string): string {
    return nodePath.join(
      ...[
        this.options.path,
        nodePath
          .dirname(pathToSnippet)
          .replaceAll(this.rootDirConfig, '')
          .replaceAll(this.options.snippetName, this.options.name),
      ]
    )
  }

  private createFileDirectoryCreatedSnippet(pathToSnippet: string): string {
    return nodePath.join(
      ...[
        this.options.path,
        pathToSnippet
          .replaceAll(this.rootDirConfig, '')
          .replaceAll(this.options.snippetName, this.options.name)
          .replaceAll(enumSnippetName.camelCase, `${this.moduleString.toCamelCase(this.options.name)}`)
          .replaceAll(enumSnippetName.pascalCase, `${this.moduleString.toPascalCase(this.options.name)}`)
          .replaceAll(
            enumSnippetName.lowerSnakeCase,
            `${this.moduleString.toLowerSnakeCase(this.options.name)}`
          )
          .replaceAll(
            enumSnippetName.upperSnakeCase,
            `${this.moduleString.toUpperSnakeCase(this.options.name)}`
          )
          .replaceAll(
            enumSnippetName.lowerKebabCase,
            `${this.moduleString.toLowerKebabCase(this.options.name)}`
          )
          .replaceAll(
            enumSnippetName.upperKebabCase,
            `${this.moduleString.toUpperKebabCase(this.options.name)}`
          ),
      ]
    )
  }

  private isSnippet(pathDirectoryCreatedSnippet: string): boolean {
    return fs.existsSync(pathDirectoryCreatedSnippet)
  }

  private getConfig(): TypeConfig[] {
    const snippets = fs.readdirSync(this.rootDirConfig)
    return snippets.map((snippetName) => ({
      snippetName,
      pathToSnippet: nodePath.join(...[this.rootDirConfig, snippetName]),
    }))
  }

  private formatSnippet(pathToSnippet: string) {
    const unformattedSnippet = JSON.stringify(fs.readFileSync(nodePath.join(pathToSnippet), 'utf-8'))
    const formattedSnippet = unformattedSnippet
      .replaceAll(enumSnippetName.camelCase, `${this.moduleString.toCamelCase(this.options.name)}`)
      .replaceAll(enumSnippetName.pascalCase, `${this.moduleString.toPascalCase(this.options.name)}`)
      .replaceAll(enumSnippetName.lowerSnakeCase, `${this.moduleString.toLowerSnakeCase(this.options.name)}`)
      .replaceAll(enumSnippetName.upperSnakeCase, `${this.moduleString.toUpperSnakeCase(this.options.name)}`)
      .replaceAll(enumSnippetName.lowerKebabCase, `${this.moduleString.toLowerKebabCase(this.options.name)}`)
      .replaceAll(enumSnippetName.upperKebabCase, `${this.moduleString.toUpperKebabCase(this.options.name)}`)

      .replaceAll(enumPrefixName.camelCase, `${this.moduleString.toCamelCase(this.options.prefix)}`)
      .replaceAll(enumPrefixName.pascalCase, `${this.moduleString.toPascalCase(this.options.prefix)}`)
      .replaceAll(enumPrefixName.lowerSnakeCase, `${this.moduleString.toLowerSnakeCase(this.options.prefix)}`)
      .replaceAll(enumPrefixName.upperSnakeCase, `${this.moduleString.toUpperSnakeCase(this.options.prefix)}`)
      .replaceAll(enumPrefixName.lowerKebabCase, `${this.moduleString.toLowerKebabCase(this.options.prefix)}`)
      .replaceAll(enumPrefixName.upperKebabCase, `${this.moduleString.toUpperKebabCase(this.options.prefix)}`)

      .replaceAll(enumSuffixName.camelCase, `${this.moduleString.toCamelCase(this.options.suffix)}`)
      .replaceAll(enumSuffixName.pascalCase, `${this.moduleString.toPascalCase(this.options.suffix)}`)
      .replaceAll(enumSuffixName.lowerSnakeCase, `${this.moduleString.toLowerSnakeCase(this.options.suffix)}`)
      .replaceAll(enumSuffixName.upperSnakeCase, `${this.moduleString.toUpperSnakeCase(this.options.suffix)}`)
      .replaceAll(enumSuffixName.lowerKebabCase, `${this.moduleString.toLowerKebabCase(this.options.suffix)}`)
      .replaceAll(enumSuffixName.upperKebabCase, `${this.moduleString.toUpperKebabCase(this.options.suffix)}`)

    return JSON.parse(formattedSnippet)
  }

  private async check(pathToSnippet: string) {
    let prefix = 0
    let suffix = 0

    const myPaths = await recursiveReadDir(pathToSnippet)

    myPaths.forEach((item) => {
      const data = JSON.stringify(fs.readFileSync(item, 'utf-8'))
      const prefixName = new RegExp('prefixName')
      const suffixName = new RegExp('suffixName')
      if (prefixName.test(data)) prefix += 1
      if (suffixName.test(data)) suffix += 1
    })

    return { isPrefix: prefix > 0, isSuffix: suffix > 0 }
  }

  public async generate() {
    // await this.addOptions()
    // const { snippetName } = this.options
    // const config = this.getConfig().find((item) => item.snippetName === snippetName)
    // if (!config) throw new Error('config')
    // recursiveReadDir(config.pathToSnippet, (error, paths) => {
    //   if (error) throw new Error(error.message)
    //   paths.forEach((pathToSnippet) => {
    //     const data = this.formatSnippet(pathToSnippet)
    //     const pathDirectoryCreatedSnippet = this.createPathDirectoryCreatedSnippet(pathToSnippet)
    //     const pathFileCreatedSnippet = this.createFileDirectoryCreatedSnippet(pathToSnippet)
    //     if (this.isSnippet(pathDirectoryCreatedSnippet)) throw new Error('isSnippet')
    //     fs.mkdirSync(pathDirectoryCreatedSnippet, { recursive: true })
    //     fs.writeFileSync(pathFileCreatedSnippet, data)
    //   })
    // })
  }
}
