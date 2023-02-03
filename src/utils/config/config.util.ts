import fs from 'fs'
import path from 'path'
import { TypeConfig } from '../../types'

export class UtilConfig {
  public generate(): TypeConfig {
    const snippetsPath = '.create-snippet'
    const snippets = fs.readdirSync(snippetsPath)
    return snippets.map((snippet) => ({ snippet, files: path.join(...[snippetsPath, snippet]) }))
  }
}
