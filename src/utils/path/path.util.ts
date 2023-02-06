import path from 'path'
import { enumSnippetName } from '../../enums'
import { TypeGeneratePath } from '../../types'
import { UtilString } from '../string'
import type {
  TypeGenerateDefaultPath,
  TypeGenerateFlatPath,
  TypeGenerateOptions,
  TypeGenerateSnippetFileNameOptions,
} from './path.type'

export class UtilPath {
  private string: UtilString

  constructor() {
    this.string = new UtilString()
  }

  private generateSnippetFileName(options: TypeGenerateSnippetFileNameOptions): string {
    return path
      .basename(options.pathToSnippet)
      .replaceAll(enumSnippetName.camelCase, this.string.toCamelCase(options.name))
      .replaceAll(enumSnippetName.lowerKebabCase, this.string.toLowerKebabCase(options.name))
      .replaceAll(enumSnippetName.lowerSnakeCase, this.string.toLowerSnakeCase(options.name))
      .replaceAll(enumSnippetName.pascalCase, this.string.toPascalCase(options.name))
      .replaceAll(enumSnippetName.upperKebabCase, this.string.toUpperKebabCase(options.name))
      .replaceAll(enumSnippetName.upperSnakeCase, this.string.toUpperSnakeCase(options.name))
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
