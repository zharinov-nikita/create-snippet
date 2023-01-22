import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import recursive from 'recursive-readdir'
import { config } from './config'
import { enumTemplateName } from './enums'
import type { TypeConfig } from './types'
import { UtilStringFormatter } from './utils'

class App {
  private readonly argTemplate: string
  private readonly argName: string
  private readonly argPath: string
  private readonly argIsPreview: string
  private readonly stringFormatter: UtilStringFormatter

  constructor() {
    this.argTemplate = this.findArg('template')
    this.argName = this.findArg('name')
    this.argPath = this.findArg('path')
    this.argIsPreview = this.findArg('isPreview')
    this.stringFormatter = new UtilStringFormatter()
  }

  private findArg(name: string): string {
    const args = [...process.argv.slice(2)]
    const regexp = new RegExp(`--${name}`)
    const argName = args.find((item) => (regexp.test(item) ? item : undefined))
    return argName ? argName.split('=')[1] : ''
  }

  private replaceAll(template: string): string {
    return template
      .replaceAll(enumTemplateName.camelCase, `${this.stringFormatter.toCamelCase(this.argName)}`)
      .replaceAll(enumTemplateName.pascalCase, `${this.stringFormatter.toPascalCase(this.argName)}`)
      .replaceAll(enumTemplateName.lowerSnakeCase, `${this.stringFormatter.toLowerSnakeCase(this.argName)}`)
      .replaceAll(enumTemplateName.upperSnakeCase, `${this.stringFormatter.toUpperSnakeCase(this.argName)}`)
      .replaceAll(enumTemplateName.lowerKebabCase, `${this.stringFormatter.toLowerKebabCase(this.argName)}`)
      .replaceAll(enumTemplateName.upperKebabCase, `${this.stringFormatter.toUpperKebabCase(this.argName)}`)
  }

  start(setting: TypeConfig): void {
    try {
      const config = setting.find((item) => item.template === this.argTemplate)
      if (!config) throw new Error('config')

      if (this.argName === '') throw new Error(`specify the required argument --name=example`)
      if (this.argPath === '') throw new Error(`specify the required argument --path=example`)
      if (this.argTemplate === '') throw new Error(`specify the required argument --template=example`)

      recursive(config.files, (error, files) => {
        if (error) throw new Error(error.message)

        files.forEach((file) => {
          const template = JSON.stringify(fs.readFileSync(file, 'utf-8'))
          const data = this.replaceAll(template)

          const fileName = path.basename(file)
          const mkdirPath = path.dirname(file).replace(path.join(config.files), path.join(this.argPath))
          const writeFilePath = path.join(file).replace(path.join(config.files), path.join(this.argPath))

          if (fs.existsSync(writeFilePath)) throw new Error(this.argName)

          if (this.argIsPreview === 'true') {
            // eslint-disable-next-line no-console
            console.log(
              `👀 ${chalk.blue(
                `Preview: ${chalk.bold(fileName)} will be created by the path ${chalk.bold(mkdirPath)}`
              )}`
            )
            return
          }

          fs.mkdirSync(mkdirPath, { recursive: true })
          fs.writeFileSync(writeFilePath, JSON.parse(data))
          // eslint-disable-next-line no-console
          console.log(
            `✅ ${chalk.green(
              `Success: ${chalk.bold(fileName)} created by the path ${chalk.bold(mkdirPath)}`
            )}`
          )
        })
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(chalk.red(e))
    }
  }
}

const app = new App()
app.start(config)
