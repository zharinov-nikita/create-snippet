#!/usr/bin/env node
import chalk from 'chalk'
import fs from 'fs'
import recursiveReaddir from 'recursive-readdir'
import type { TypeArgs, TypeConfig, TypeGeneratePath } from './types'
import { UtilConfig, UtilPath, UtilPrompt, UtilSnippet } from './utils'

interface TypeCreateSnippetOptions extends TypeGeneratePath {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formattedSnippet: any
}

export class CodeSnippet {
  private readonly snippet: UtilSnippet
  private readonly config: TypeConfig
  private readonly prompt: UtilPrompt
  private readonly path: UtilPath
  private args: TypeArgs

  constructor() {
    this.snippet = new UtilSnippet()
    this.prompt = new UtilPrompt()
    this.config = new UtilConfig().generate()
    this.path = new UtilPath()
    this.args = {
      snippet: '',
      name: '',
      path: '',
      isFlat: false,
    }
  }

  private generateUnformattedSnippet(pathToSnippet: string): string {
    const unformattedSnippet = fs.readFileSync(pathToSnippet, 'utf-8')
    return JSON.stringify(unformattedSnippet)
  }

  private generateFormattedSnippet(unformattedSnippet: string) {
    const formattedSnippet = this.snippet.replace(unformattedSnippet, this.args.name)
    return JSON.parse(formattedSnippet)
  }

  private createSnippet(options: TypeCreateSnippetOptions): void {
    const mkdir = this.args.isFlat ? options.pathFlatSnippetFile : options.pathSnippetFile
    const writeFile = this.args.isFlat ? options.pathFlatWriteSnippetFile : options.pathWriteSnippetFile
    fs.mkdirSync(mkdir, { recursive: true })
    fs.writeFileSync(writeFile, options.formattedSnippet)
    // eslint-disable-next-line no-console
    console.log(`${chalk.green(`√`)} ${chalk.gray(`${options.pathSnippetFile}`)}`)
  }

  public async start(): Promise<void> {
    try {
      const args = await this.prompt.getArgs()
      this.args = { ...this.args, ...args }

      const config = this.config.find(({ snippet }) => snippet === this.args.snippet)
      if (!config) throw new Error('config')

      if (this.args.snippet === '') throw new Error(`specify the required argument snippet=example`)
      if (this.args.name === '') throw new Error(`specify the required argument name=example`)
      if (this.args.path === '') throw new Error(`specify the required argument path=example`)

      recursiveReaddir(config.files, (error, paths) => {
        if (error) throw new Error(error.message)

        paths.forEach((pathToSnippet) => {
          const unformattedSnippet = this.generateUnformattedSnippet(pathToSnippet)
          const formattedSnippet = this.generateFormattedSnippet(unformattedSnippet)
          const path = this.path.generate({
            pathToSnippet,
            config,
            name: this.args.name,
            path: this.args.path,
          })
          if (fs.existsSync(path.pathWriteSnippetFile)) throw new Error(this.args.name)
          this.createSnippet({ ...path, formattedSnippet })
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
