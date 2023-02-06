import chalk from 'chalk'
import fs from 'fs'
import recursiveReaddir from 'recursive-readdir'
import { UtilConfig, UtilPath, UtilPrompt, UtilSnippet } from '..'
import type { TypeArgs, TypeConfig } from '../../types'

export class UtilCli {
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

  public async start(): Promise<void> {
    try {
      const args = await this.prompt.getArgs()
      this.args = { ...this.args, ...args }
      const { snippet, name, path, isFlat } = this.args

      const config = this.config.find((item) => item.snippet === snippet)
      if (!config) throw new Error('config')

      if (snippet === '') throw new Error(`specify the required argument snippet=example`)
      if (name === '') throw new Error(`specify the required argument name=example`)
      if (path === '') throw new Error(`specify the required argument path=example`)

      recursiveReaddir(config.files, (error, paths) => {
        if (error) throw new Error(error.message)

        paths.forEach((pathToSnippet) => {
          const formattedSnippet = this.snippet.format({ pathToSnippet, name })
          const generatePath = this.path.generate({
            pathToSnippet,
            config,
            name,
            path,
          })
          if (fs.existsSync(generatePath.pathWriteSnippetFile)) throw new Error(name)
          this.snippet.create({ ...generatePath, formattedSnippet, isFlat })
        })
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(chalk.red(e))
    }
  }
}
