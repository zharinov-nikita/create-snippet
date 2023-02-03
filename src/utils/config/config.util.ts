import fs from 'fs'
import path from 'path'
import { TypeConfig } from '../../types'

export class UtilConfig {
  public generate(): TypeConfig {
    const templatePath = path.join('.cli')
    const templates = fs.readdirSync(templatePath)
    return templates.map((template) => ({ template, files: path.join(...['.cli', template]) }))
  }
}
