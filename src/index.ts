#!/usr/bin/env node
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import recursive from 'recursive-readdir'
import { enumSnippetName } from './enums'
import type { TypeArgs, TypeConfig } from './types'
import { UtilConfig, UtilPrompt, UtilSnippet } from './utils'

export class CodeSnippet {
  private readonly snippet: UtilSnippet
  private readonly config: TypeConfig
  private readonly prompt: UtilPrompt
  private args: TypeArgs

  constructor() {
    this.snippet = new UtilSnippet()
    this.prompt = new UtilPrompt()
    this.config = new UtilConfig().generate()
    this.args = {
      snippet: '',
      name: '',
      path: '',
    }
  }

  public async start(): Promise<void> {
    try {
      const args = await this.prompt.getArgs()
      this.args = { ...this.args, ...args }

      const config = this.config.find(({ snippet }) => snippet === this.args.snippet)
      if (!config) throw new Error('config')

      if (this.args.snippet === '') throw new Error(`specify the required argument --snippet=example`)
      if (this.args.name === '') throw new Error(`specify the required argument --name=example`)
      if (this.args.path === '') throw new Error(`specify the required argument --path=example`)

      recursive(config.files, (error, files) => {
        if (error) throw new Error(error.message)

        files.forEach((file) => {
          const snippet = JSON.stringify(fs.readFileSync(file, 'utf-8'))
          const data = this.snippet.replace(snippet, this.args.name)

          const fileName = path.basename(file).replaceAll(enumSnippetName.lowerKebabCase, this.args.name)
          const mkdirPath = path.join(
            ...[
              path
                .dirname(file)
                .replaceAll(path.join(config.files), path.join(...[this.args.path, this.args.name])),
            ]
          )
          const writeFilePath = path.join(
            ...[mkdirPath, path.basename(file).replaceAll(enumSnippetName.lowerKebabCase, this.args.name)]
          )

          if (fs.existsSync(writeFilePath)) throw new Error(this.args.name)

          fs.mkdirSync(mkdirPath, { recursive: true })
          fs.writeFileSync(writeFilePath, JSON.parse(data))
          // eslint-disable-next-line no-console
          console.log(`${chalk.green(`√`)} ${chalk.gray(`${fileName}`)}`)
        })
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(chalk.red(e))
    }
  }
}

const codeSnippet = new CodeSnippet()
codeSnippet.start()
