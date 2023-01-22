import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { UtilStringFormatter } from './utils'
import { enumTemplateName, enumSuffixName, enumPrefixName } from './enums'
import { TypeConfig } from './types'
import { config } from './config'
import recursive from 'recursive-readdir'

class App {
  private readonly argTemplate: string
  private readonly argName: string
  private readonly argPrefix: string
  private readonly argSuffix: string
  private readonly argPath: string

  constructor() {
    this.argTemplate = this.findArg('template')
    this.argName = this.findArg('name')
    this.argPrefix = this.findArg('prefix')
    this.argSuffix = this.findArg('suffix')
    this.argPath = this.findArg('path')
  }

  private findArg(name: string): string {
    const args = [...process.argv.slice(2)]
    const regexp = new RegExp(`--${name}`)
    const argName = args.find((item) => (regexp.test(item) ? item : undefined))
    if (argName) return argName.split('=')[1]
    throw new Error(name)
  }

  private replaceAll(template: string): string {
    const name = new UtilStringFormatter(this.argName)
    const prefix = new UtilStringFormatter(this.argPrefix)
    const suffix = new UtilStringFormatter(this.argSuffix)
    return template
      .replaceAll(enumTemplateName.camelCase, `${name.toCamelCase()}`)
      .replaceAll(enumTemplateName.pascalCase, `${name.toPascalCase()}`)
      .replaceAll(enumTemplateName.lowerSnakeCase, `${name.toLowerSnakeCase()}`)
      .replaceAll(enumTemplateName.upperSnakeCase, `${name.toUpperSnakeCase()}`)
      .replaceAll(enumTemplateName.lowerKebabCase, `${name.toLowerKebabCase()}`)
      .replaceAll(enumTemplateName.upperKebabCase, `${name.toUpperKebabCase()}`)
      .replaceAll(enumPrefixName.camelCase, `${prefix.toCamelCase()}`)
      .replaceAll(enumPrefixName.pascalCase, `${prefix.toPascalCase()}`)
      .replaceAll(enumPrefixName.lowerSnakeCase, `${prefix.toLowerSnakeCase()}`)
      .replaceAll(enumPrefixName.upperSnakeCase, `${prefix.toUpperSnakeCase()}`)
      .replaceAll(enumPrefixName.lowerKebabCase, `${prefix.toLowerKebabCase()}`)
      .replaceAll(enumPrefixName.upperKebabCase, `${prefix.toUpperKebabCase()}`)
      .replaceAll(enumSuffixName.camelCase, `${suffix.toCamelCase()}`)
      .replaceAll(enumSuffixName.pascalCase, `${suffix.toPascalCase()}`)
      .replaceAll(enumSuffixName.lowerSnakeCase, `${suffix.toLowerSnakeCase()}`)
      .replaceAll(enumSuffixName.upperSnakeCase, `${suffix.toUpperSnakeCase()}`)
      .replaceAll(enumSuffixName.lowerKebabCase, `${suffix.toLowerKebabCase()}`)
      .replaceAll(enumSuffixName.upperKebabCase, `${suffix.toUpperKebabCase()}`)
  }

  create(setting: TypeConfig): void {
    try {
      const config = setting.find((item) => item.template === this.argTemplate)

      if (!config) throw new Error('config')

      recursive(config.files, (error, files) => {
        if (error) throw new Error(error.message)

        files.forEach((file) => {
          const template = JSON.stringify(fs.readFileSync(file, 'utf-8'))
          const data = this.replaceAll(template)

          const mkdirPath = path.dirname(file).replace(path.join(config.files), path.join(this.argPath))
          const writeFilePath = path.join(file).replace(path.join(config.files), path.join(this.argPath))

          fs.mkdirSync(mkdirPath, { recursive: true })
          fs.writeFileSync(writeFilePath, JSON.parse(data))
        })
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(chalk.red(e))
    }
  }
}

const app = new App()
app.create(config)
