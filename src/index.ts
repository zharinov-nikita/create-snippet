#!/usr/bin/env node
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import recursiveReaddir from 'recursive-readdir'
import { enumSnippetName } from './enums'
import type { TypeArgs, TypeConfig, TypeConfigItem } from './types'
import { UtilConfig, UtilPrompt, UtilSnippet } from './utils'

interface TypeGeneratePathOptions {
  pathToSnippet: string
  config: TypeConfigItem
}

interface TypeGeneratePath {
  fileName: string
  mkdirPath: string
  writeFilePath: string
}

interface TypeCreateSnippetOptions extends TypeGeneratePath {
  formattedSnippet: any
}

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

  private generatePath(options: TypeGeneratePathOptions): TypeGeneratePath {
    const fileName = path
      .basename(options.pathToSnippet)
      .replaceAll(enumSnippetName.lowerKebabCase, this.args.name)
    const mkdirPath = path.join(
      ...[
        path
          .dirname(options.pathToSnippet)
          .replaceAll(path.join(options.config.files), path.join(...[this.args.path, this.args.name])),
      ]
    )
    const writeFilePath = path.join(
      ...[
        mkdirPath,
        path.basename(options.pathToSnippet).replaceAll(enumSnippetName.lowerKebabCase, this.args.name),
      ]
    )

    return { fileName, mkdirPath, writeFilePath }
  }

  private generateUnformattedSnippet(pathToSnippet: string): string {
    return JSON.stringify(fs.readFileSync(pathToSnippet, 'utf-8'))
  }

  private generateFormattedSnippet(unformattedSnippet: string) {
    const formattedSnippet = this.snippet.replace(unformattedSnippet, this.args.name)
    return JSON.parse(formattedSnippet)
  }

  private createSnippet(options: TypeCreateSnippetOptions): void {
    fs.mkdirSync(options.mkdirPath, { recursive: true })
    fs.writeFileSync(options.writeFilePath, options.formattedSnippet)
    // eslint-disable-next-line no-console
    console.log(`${chalk.green(`√`)} ${chalk.gray(`${options.fileName}`)}`)
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

      recursiveReaddir(config.files, (error, paths) => {
        if (error) throw new Error(error.message)

        paths.forEach((pathToSnippet) => {
          const unformattedSnippet = this.generateUnformattedSnippet(pathToSnippet)
          const formattedSnippet = this.generateFormattedSnippet(unformattedSnippet)
          const { fileName, mkdirPath, writeFilePath } = this.generatePath({ pathToSnippet, config })
          if (fs.existsSync(writeFilePath)) throw new Error(this.args.name)
          this.createSnippet({ fileName, formattedSnippet, mkdirPath, writeFilePath })
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
