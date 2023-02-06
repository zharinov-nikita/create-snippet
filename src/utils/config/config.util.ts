import fs from 'fs'
import path from 'path'
import { TypeConfig } from '../../types'

export class UtilConfig {
  private initialize(): void {
    const args = [...process.argv.slice(2)]

    const mkdir = [
      '.create-snippet/my-snippet-1',
      '.create-snippet/my-snippet-2',
      '.create-snippet/my-snippet-3',
    ]

    const isInit = fs.existsSync('.create-snippet')
    const argInit = args.find((arg) => arg === 'init')

    if (!isInit && argInit === 'init') {
      return mkdir.forEach((item, index) => {
        fs.mkdirSync(path.join(item), { recursive: true })
        fs.writeFileSync(
          path.join(...[item, 'snippet-name.ts']),
          `export const SnippetName = "SnippetName ${index + 1}"`
        )
      })
    }

    throw new Error('create-snippet already initialized')
  }

  public generate(): TypeConfig {
    this.initialize()
    const snippetsPath = '.create-snippet'
    const snippets = fs.readdirSync(snippetsPath)
    return snippets.map((snippet) => ({ snippet, files: path.join(...[snippetsPath, snippet]) }))
  }
}
