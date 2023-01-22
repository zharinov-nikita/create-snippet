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

  constructor() {
    this.argTemplate = this.findArg('template')
    this.argName = this.findArg('name')
    this.argPath = this.findArg('path')
    this.argIsPreview = this.findArg('isPreview')
  }

  private findArg(name: string): string {
    const args = [...process.argv.slice(2)]
    const regexp = new RegExp(`--${name}`)
    const argName = args.find((item) => (regexp.test(item) ? item : undefined))
    return argName ? argName.split('=')[1] : ''
  }

  private replaceAll(template: string): string {
    const name = new UtilStringFormatter(this.argName)

    return template
      .replaceAll(enumTemplateName.camelCase, `${name.toCamelCase()}`)
      .replaceAll(enumTemplateName.pascalCase, `${name.toPascalCase()}`)
      .replaceAll(enumTemplateName.lowerSnakeCase, `${name.toLowerSnakeCase()}`)
      .replaceAll(enumTemplateName.upperSnakeCase, `${name.toUpperSnakeCase()}`)
      .replaceAll(enumTemplateName.lowerKebabCase, `${name.toLowerKebabCase()}`)
      .replaceAll(enumTemplateName.upperKebabCase, `${name.toUpperKebabCase()}`)
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

          const fileName = path.basename(file)
          const mkdirPath = path.dirname(file).replace(path.join(config.files), path.join(this.argPath))
          const writeFilePath = path.join(file).replace(path.join(config.files), path.join(this.argPath))

          if (fs.existsSync(writeFilePath)) throw new Error(this.argName)

          if (this.argIsPreview === 'true') {
            // eslint-disable-next-line no-console
            console.log(
              `👀 ${chalk.blue(`Preview: file ${chalk.bold(fileName)} will be created ${mkdirPath}`)}`
            )
            return
          }

          fs.mkdirSync(mkdirPath, { recursive: true })
          fs.writeFileSync(writeFilePath, JSON.parse(data))
          // eslint-disable-next-line no-console
          console.log(`✅ ${chalk.green(`Success: file ${chalk.bold(fileName)} created ${mkdirPath}`)}`)
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
