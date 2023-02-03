#!/usr/bin/env node
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import recursive from 'recursive-readdir'
import { enumTemplateName } from './enums'
import type { TypeConfig } from './types'
import { UtilArgv, UtilPrompt, UtilStringFormatter } from './utils'

export class Cli {
  private argTemplate: string
  private argName: string
  private argPath: string
  private argIsPreview: boolean
  private readonly stringFormatter: UtilStringFormatter
  private readonly argv: UtilArgv
  private readonly config: TypeConfig
  private readonly prompt: UtilPrompt

  constructor() {
    this.stringFormatter = new UtilStringFormatter()
    this.argv = new UtilArgv()
    this.prompt = new UtilPrompt()
    this.argTemplate = this.argv.find('template')
    this.argName = this.argv.find('name')
    this.argPath = this.argv.find('path')
    this.argIsPreview = false
    this.config = JSON.parse(fs.readFileSync(path.join('cli.json'), 'utf8')) as TypeConfig
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

  public async start(): Promise<void> {
    try {
      const data = await this.prompt.getConfig()
      this.argName = data.name
      this.argPath = data.path
      this.argTemplate = data.template
      this.argIsPreview = data.isPreview
      const config = this.config.find((item) => item.template === this.argTemplate)
      if (!config) throw new Error('config')

      if (this.argName === '') throw new Error(`specify the required argument --name=example`)
      if (this.argPath === '') throw new Error(`specify the required argument --path=example`)
      if (this.argTemplate === '') throw new Error(`specify the required argument --template=example`)

      recursive(config.files, (error, files) => {
        if (error) throw new Error(error.message)

        files.forEach((file) => {
          const template = JSON.stringify(fs.readFileSync(file, 'utf-8'))
          const data = this.replaceAll(template)

          const fileName = path.basename(file).replaceAll(enumTemplateName.lowerKebabCase, this.argName)
          const mkdirPath = path.join(
            ...[
              path
                .dirname(file)
                .replaceAll(path.join(config.files), path.join(...[this.argPath, this.argName])),
            ]
          )
          const writeFilePath = path.join(
            ...[mkdirPath, path.basename(file).replaceAll(enumTemplateName.lowerKebabCase, this.argName)]
          )

          if (fs.existsSync(writeFilePath)) throw new Error(this.argName)

          if (this.argIsPreview) {
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

const app = new Cli()
app.start()
