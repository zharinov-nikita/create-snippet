import path from 'path'
import { enumSnippetName } from '../../enums'
import { TypeConfigItem, TypeGeneratePath } from '../../types'

interface TypeGenerateOptions {
  pathToSnippet: string
  config: TypeConfigItem
  name: string
  path: string
}

export class UtilPath {
  private generateFlat(options: TypeGenerateOptions) {
    const pathFlatSnippetFile = path.join(...[options.path])
    const pathFlatWriteSnippetFile = path.join(
      ...[
        pathFlatSnippetFile,
        path.basename(options.pathToSnippet).replaceAll(enumSnippetName.lowerKebabCase, options.name),
      ]
    )

    return { pathFlatSnippetFile, pathFlatWriteSnippetFile }
  }

  private generateDefault(options: TypeGenerateOptions) {
    const pathSnippetFile = path.join(
      ...[
        path
          .dirname(options.pathToSnippet)
          .replaceAll(path.join(options.config.files), path.join(...[options.path, options.name])),
      ]
    )

    const pathWriteSnippetFile = path.join(
      ...[
        pathSnippetFile,
        path.basename(options.pathToSnippet).replaceAll(enumSnippetName.lowerKebabCase, options.name),
      ]
    )

    return { pathSnippetFile, pathWriteSnippetFile }
  }

  public generate(options: TypeGenerateOptions): TypeGeneratePath {
    const snippetFileName = path
      .basename(options.pathToSnippet)
      .replaceAll(enumSnippetName.lowerKebabCase, options.name)

    const defaultPath = this.generateDefault(options)
    const flatPath = this.generateFlat(options)

    return {
      snippetFileName,
      pathSnippetFile: defaultPath.pathSnippetFile,
      pathFlatSnippetFile: flatPath.pathFlatSnippetFile,
      pathWriteSnippetFile: defaultPath.pathWriteSnippetFile,
      pathFlatWriteSnippetFile: flatPath.pathFlatWriteSnippetFile,
    }
  }
}
