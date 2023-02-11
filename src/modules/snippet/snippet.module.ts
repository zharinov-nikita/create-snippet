import fs from 'fs'
import nodePath from 'path'
import { prompt, PromptObject } from 'prompts'
import recursiveReadDir from 'recursive-readdir'
import { CONSTANTS } from '../../constants'
import { TypeConfig } from '../../types'

interface TypeOptionsSnippetGeneration {
  snippetName: string
  name: string
  path: string
  isFlat: boolean
}

export class ModuleSnippet {
  private readonly rootDirConfig: string
  private options: TypeOptionsSnippetGeneration

  constructor() {
    this.rootDirConfig = CONSTANTS.ROOT_DIR_CONFIG
    this.options = {
      snippetName: '',
      name: '',
      path: '',
      isFlat: false,
    }
  }

  private async addOptions() {
    const data: PromptObject[] = [
      {
        type: 'select',
        name: 'snippet',
        message: 'Pick a snippet',
        choices: fs.readdirSync(this.rootDirConfig).map((path) => ({ title: path, value: path })),
        initial: 0,
      },
      { type: 'text', name: 'name', message: 'Pick a name' },
      { type: 'text', name: 'path', message: 'Pick a path' },
      {
        type: 'toggle',
        name: 'isFlat',
        message: 'Create a flat file structure?',
        initial: false,
        active: 'yes',
        inactive: 'no',
      },
    ]
    const options = await prompt(data)

    this.options = { ...this.options, ...options }
  }

  private createPathDirectoryCreatedSnippet(pathToSnippet: string): string {
    return nodePath.join(
      ...[
        this.options.path,
        nodePath
          .dirname(pathToSnippet)
          .replaceAll(this.rootDirConfig, '')
          .replaceAll(this.options.snippetName, this.options.name),
      ]
    )
  }

  private createFileDirectoryCreatedSnippet(pathToSnippet: string): string {
    return nodePath.join(
      ...[
        this.options.path,
        pathToSnippet
          .replaceAll(this.rootDirConfig, '')
          .replaceAll(this.options.snippetName, this.options.name)
          .replaceAll('snippet-name', this.options.name),
      ]
    )
  }

  private isSnippet(pathDirectoryCreatedSnippet: string): boolean {
    return fs.existsSync(pathDirectoryCreatedSnippet)
  }

  private getConfig(): TypeConfig[] {
    const snippets = fs.readdirSync(this.rootDirConfig)
    return snippets.map((snippetName) => ({
      snippetName,
      pathToSnippet: nodePath.join(...[this.rootDirConfig, snippetName]),
    }))
  }

  public async generate() {
    await this.addOptions()
    const config = this.getConfig().find((item) => item.snippetName === this.options.snippetName)

    if (!config) throw new Error('config')

    recursiveReadDir(config.pathToSnippet, (error, paths) => {
      if (error) throw new Error(error.message)

      paths.forEach((pathToSnippet) => {
        const notReadySnippet = JSON.stringify(fs.readFileSync(nodePath.join(pathToSnippet), 'utf-8'))
        const pathDirectoryCreatedSnippet = this.createPathDirectoryCreatedSnippet(pathToSnippet)
        const pathFileCreatedSnippet = this.createFileDirectoryCreatedSnippet(pathToSnippet)
        if (this.isSnippet(pathDirectoryCreatedSnippet)) throw new Error('isSnippet')
        fs.mkdirSync(pathDirectoryCreatedSnippet, { recursive: true })
        fs.writeFileSync(pathFileCreatedSnippet, JSON.parse(notReadySnippet))
      })
    })
  }
}
