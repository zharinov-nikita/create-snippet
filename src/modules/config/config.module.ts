import fs from 'fs'
import path from 'path'
import { CONSTANTS } from '../../constants'

export class ModuleConfig {
  public readonly rootDirConfig: string
  public readonly isRootDirConfig: boolean

  constructor() {
    this.rootDirConfig = CONSTANTS.ROOT_DIR_CONFIG
    this.isRootDirConfig = fs.existsSync(CONSTANTS.ROOT_DIR_CONFIG)
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
}
