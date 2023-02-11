import fs from 'fs'
import path from 'path'
import { TypeConfig } from '../../types'

export class ModuleConfig {
  public readonly rootDirConfig: string
  public readonly isRootDirConfig: boolean

  constructor(rootDirConfig: string) {
    this.rootDirConfig = rootDirConfig
    this.isRootDirConfig = fs.existsSync(rootDirConfig)
  }

  public initialize(): void {
    const array: number[] = Array.from(Array(3).keys())
    const examplePaths: string[] = array.map((_, index) => `${this.rootDirConfig}/my-snippet-${index + 1}`)

    examplePaths.forEach((pathExample, index) => {
      fs.mkdirSync(path.join(pathExample), { recursive: true })
      fs.writeFileSync(
        path.join(...[pathExample, 'snippet-name.ts']),
        `export const SnippetName = "SnippetName ${index + 1}"`
      )
    })
  }

  public getConfig(): TypeConfig[] {
    const snippets = fs.readdirSync(this.rootDirConfig)
    if (!this.isRootDirConfig) throw new Error('create-snippet has not been initialized yet')
    return snippets.map((snippetName) => ({
      snippetName,
      pathToSnippet: path.join(...[this.rootDirConfig, snippetName]),
    }))
  }
}
