import fs from 'fs'
import path from 'path'
import { UtilStringFormatter } from './utils'
import { enumTemplateName } from './enums'
import chalk from 'chalk'

const config = {
  path: 'src/test',
  read: [
    '.cli/ui/template-name.component.ts',
    '.cli/ui/template-name.test.ts',
    '.cli/ui/template-name.type.ts',
  ],
}

class App {
  create() {
    const args = [...process.argv.slice(2)]
    const name = new UtilStringFormatter(`${args[0].split('=')[1]}`)
    const template = JSON.stringify(fs.readFileSync(path.join(__dirname, 'template-name.ts'), 'utf-8'))
    const file = `${name.toLowerKebabCase()}.ts`
    const data = template
      .replaceAll(enumTemplateName.camelCase, `${name.toCamelCase()}`)
      .replaceAll(enumTemplateName.pascalCase, `${name.toPascalCase()}`)
      .replaceAll(enumTemplateName.lowerSnakeCase, `${name.toLowerSnakeCase()}`)
      .replaceAll(enumTemplateName.upperSnakeCase, `${name.toUpperSnakeCase()}`)
      .replaceAll(enumTemplateName.lowerKebabCase, `${name.toLowerKebabCase()}`)
      .replaceAll(enumTemplateName.upperKebabCase, `${name.toUpperKebabCase()}`)
    fs.writeFileSync(file, JSON.parse(data))
    console.log(`✅ ${chalk.green(`the ${file} was created successfully`)}`)
  }

  test() {
    config.read.forEach((file) => {
      const args = [...process.argv.slice(2)]
      const name = new UtilStringFormatter(`${args[0].split('=')[1]}`)
      const data = fs.readFileSync(path.join(file), 'utf-8')
      const myPath = path.basename(file).replace(enumTemplateName.camelCase, name.toLowerKebabCase())
      fs.writeFileSync(myPath, data)
    })
  }
}

const app = new App()

app.test()
