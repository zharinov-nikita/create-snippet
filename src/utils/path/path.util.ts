import path from 'path'
import { enumSnippetName } from '../../enums'
import { TypeGeneratePath } from '../../types'
import { UtilStringFormatter } from '../string-formatter'
import type {
  TypeGenerateDefaultPath,
  TypeGenerateFlatPath,
  TypeGenerateOptions,
  TypeGenerateSnippetFileNameOptions,
} from './path.type'

export class UtilPath {
  private stringFormatter: UtilStringFormatter

  constructor() {
    this.stringFormatter = new UtilStringFormatter()
  }

  private generateSnippetFileName(options: TypeGenerateSnippetFileNameOptions): string {
    return path
      .basename(options.pathToSnippet)
      .replaceAll(enumSnippetName.camelCase, this.stringFormatter.toCamelCase(options.name))
      .replaceAll(enumSnippetName.lowerKebabCase, this.stringFormatter.toLowerKebabCase(options.name))
      .replaceAll(enumSnippetName.lowerSnakeCase, this.stringFormatter.toLowerSnakeCase(options.name))
      .replaceAll(enumSnippetName.pascalCase, this.stringFormatter.toPascalCase(options.name))
      .replaceAll(enumSnippetName.upperKebabCase, this.stringFormatter.toUpperKebabCase(options.name))
      .replaceAll(enumSnippetName.upperSnakeCase, this.stringFormatter.toUpperSnakeCase(options.name))
  }

  private generateDefaultPath(options: TypeGenerateOptions): TypeGenerateDefaultPath {
    const snippetFileName = this.generateSnippetFileName(options)
    const unformattedPath = path.join(options.config.files)
    const formattedPath = path.join(...[options.path, options.name])
    const dirname = path.dirname(options.pathToSnippet)
    const pathSnippetFile = path.join(...[dirname.replaceAll(unformattedPath, formattedPath)])
    const pathWriteSnippetFile = path.join(...[pathSnippetFile, snippetFileName])
    return { pathSnippetFile, pathWriteSnippetFile }
  }

  private generateFlatPath(options: TypeGenerateOptions): TypeGenerateFlatPath {
    const snippetFileName = this.generateSnippetFileName(options)
    const pathFlatSnippetFile = path.join(...[options.path])
    const pathFlatWriteSnippetFile = path.join(...[pathFlatSnippetFile, snippetFileName])
    return { pathFlatSnippetFile, pathFlatWriteSnippetFile }
  }

  public generate(options: TypeGenerateOptions): TypeGeneratePath {
    const snippetFileName = this.generateSnippetFileName(options)
    const { pathSnippetFile, pathWriteSnippetFile } = this.generateDefaultPath(options)
    const { pathFlatSnippetFile, pathFlatWriteSnippetFile } = this.generateFlatPath(options)
    return {
      snippetFileName,
      pathSnippetFile,
      pathFlatSnippetFile,
      pathWriteSnippetFile,
      pathFlatWriteSnippetFile,
    }
  }
}
