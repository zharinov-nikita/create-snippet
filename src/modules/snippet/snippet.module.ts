import fs from 'fs'
import nodePath from 'path'
import { prompt } from 'prompts'
import recursiveReadDir from 'recursive-readdir'
import { CONSTANTS } from '../../constants'
import { enumPrefixName, enumSnippetName, enumSuffixName } from '../../enums'
import { ModuleConfig } from '../config'
import { ModulePath } from '../path'
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
  private readonly moduleConfig: ModuleConfig
  private readonly moduleString: ModuleString
  private readonly rootDirConfig: string
  private options: TypeOptionsSnippetGeneration
  private readonly modulePath: ModulePath

  constructor() {
    this.moduleConfig = new ModuleConfig()
    this.moduleString = new ModuleString()
    this.modulePath = new ModulePath()
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
    const data = async () => [
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
        type: async (_: any, values: TypeOptionsSnippetGeneration) => {
          return (await this.check(values.snippetName)).isPrefix ? 'text' : null
        },
        name: 'prefix',
        message: 'Pick a prefix',
      },

      {
        type: async (_: any, values: TypeOptionsSnippetGeneration) => {
          return (await this.check(values.snippetName)).isSuffix ? 'text' : null
        },
        name: 'suffix',
        message: 'Pick a suffix',
      },
    ]

    const questions = await data()
    const options = await prompt(questions)
    this.options = { ...this.options, ...options }
  }

  private isSnippet(pathDirectoryCreatedSnippet: string): boolean {
    return fs.existsSync(pathDirectoryCreatedSnippet)
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

    const myPaths = await recursiveReadDir(nodePath.join(...[this.rootDirConfig, pathToSnippet]))

    myPaths.forEach((item) => {
      const data = JSON.stringify(fs.readFileSync(item, 'utf-8'))
      if (new RegExp(enumPrefixName.camelCase).test(data)) prefix += 1
      if (new RegExp(enumPrefixName.lowerKebabCase).test(data)) prefix += 1
      if (new RegExp(enumPrefixName.lowerSnakeCase).test(data)) prefix += 1
      if (new RegExp(enumPrefixName.pascalCase).test(data)) prefix += 1
      if (new RegExp(enumPrefixName.upperKebabCase).test(data)) prefix += 1
      if (new RegExp(enumPrefixName.upperSnakeCase).test(data)) prefix += 1
      if (new RegExp(enumSuffixName.camelCase).test(data)) suffix += 1
      if (new RegExp(enumSuffixName.lowerKebabCase).test(data)) suffix += 1
      if (new RegExp(enumSuffixName.lowerSnakeCase).test(data)) suffix += 1
      if (new RegExp(enumSuffixName.pascalCase).test(data)) suffix += 1
      if (new RegExp(enumSuffixName.upperKebabCase).test(data)) suffix += 1
      if (new RegExp(enumSuffixName.upperSnakeCase).test(data)) suffix += 1
    })

    return { isPrefix: prefix > 0, isSuffix: suffix > 0 }
  }

  public async generate() {
    if (!fs.existsSync(nodePath.join(...[this.rootDirConfig]))) throw new Error('npx create-snippet --init')

    await this.addOptions()
    const { snippetName, name, path } = this.options

    if (snippetName === '') throw new Error(`specify the required argument snippet=example`)
    if (name === '') throw new Error(`specify the required argument name=example`)
    if (path === '') throw new Error(`specify the required argument path=example`)

    const config = this.moduleConfig.get().find((item) => item.snippetName === snippetName)
    if (!config) throw new Error('config')
    recursiveReadDir(config.pathToSnippet, (error, paths) => {
      if (error) throw new Error(error.message)
      paths.forEach((pathToSnippet) => {
        const data = this.formatSnippet(pathToSnippet)
        const myPath = this.modulePath.generate({ config, name, path, pathToSnippet })
        if (this.isSnippet(myPath.pathWriteSnippetFile)) throw new Error('isSnippet')
        if (this.isSnippet(myPath.pathFlatWriteSnippetFile)) throw new Error('isSnippet')
        fs.mkdirSync(this.options.isFlat ? myPath.pathFlatSnippetFile : myPath.pathSnippetFile, {
          recursive: true,
        })
        fs.writeFileSync(
          this.options.isFlat ? myPath.pathFlatWriteSnippetFile : myPath.pathWriteSnippetFile,
          data
        )
      })
    })
  }
}
