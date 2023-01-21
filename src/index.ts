import fs from 'fs'
import path from 'path'
import { UtilStringFormatter } from './utils'
import { enumTemplateName, enumSuffixName, enumPrefixName } from './enums'
import chalk from 'chalk'
import { TypeConfig } from './types'

const config: TypeConfig = [
  {
    template: 'ui',
    files: [
      '.cli/ui/template-name.component.ts',
      '.cli/ui/template-name.test.ts',
      '.cli/ui/template-name.type.ts',
    ],
  },
  {
    template: 'page',
    files: [
      '.cli/page/template-name.component.ts',
      '.cli/page/template-name.test.ts',
      '.cli/page/template-name.type.ts',
    ],
  },
]

class App {
  findArg(name: string) {
    const args = [...process.argv.slice(2)]
    const regexp = new RegExp(`--${name}`)
    const argName = args.find((item) => (regexp.test(item) ? item : undefined))
    if (argName) return argName.split('=')[1]
  }

  create(setting: TypeConfig) {
    try {
      const argTemplate = this.findArg('template')
      const argName = this.findArg('name')
      const argPrefix = this.findArg('prefix')
      const argSuffix = this.findArg('suffix')
      const argPath = this.findArg('path')

      if (!argTemplate) throw new Error('argTemplate')
      if (!argName) throw new Error('argName')
      if (!argPath) throw new Error('argPath')
      if (!argPrefix) throw new Error('argPrefix')
      if (!argSuffix) throw new Error('argSuffix')

      const config = setting.find((item) => item.template === argTemplate)

      if (!config) throw new Error('config')

      config.files.forEach((file) => {
        const name = new UtilStringFormatter(argName)
        const prefix = new UtilStringFormatter(argPrefix)
        const suffix = new UtilStringFormatter(argSuffix)
        const template = JSON.stringify(fs.readFileSync(file, 'utf-8'))
        
        const data = template
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

        const createdName = path
          .basename(file)
          .replace(enumTemplateName.lowerKebabCase, name.toLowerKebabCase())
        const createdPath = `${argPath}/${name.toLowerKebabCase()}`

        fs.mkdirSync(createdPath, { recursive: true })
        fs.writeFileSync(`${createdPath}/${createdName}`, JSON.parse(data))
        console.log(`✅ ${chalk.green(`Success: ${createdName} file created`)}`)
      })
    } catch (e) {
      console.log(chalk.red(e))
    }
  }
}

const app = new App()
app.create(config)
