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
  public generate(options: TypeGenerateOptions): TypeGeneratePath {
    const snippetFileName = path
      .basename(options.pathToSnippet)
      .replaceAll(enumSnippetName.lowerKebabCase, options.name)
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

    return { snippetFileName, pathSnippetFile, pathWriteSnippetFile }
  }
}
