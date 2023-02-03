import { enumSnippetName } from '../../enums'
import { UtilStringFormatter } from '../string-formatter'

export class UtilSnippet {
  private stringFormatter: UtilStringFormatter

  constructor() {
    this.stringFormatter = new UtilStringFormatter()
  }

  public replace(snippet: string, name: string): string {
    return snippet
      .replaceAll(enumSnippetName.camelCase, `${this.stringFormatter.toCamelCase(name)}`)
      .replaceAll(enumSnippetName.pascalCase, `${this.stringFormatter.toPascalCase(name)}`)
      .replaceAll(enumSnippetName.lowerSnakeCase, `${this.stringFormatter.toLowerSnakeCase(name)}`)
      .replaceAll(enumSnippetName.upperSnakeCase, `${this.stringFormatter.toUpperSnakeCase(name)}`)
      .replaceAll(enumSnippetName.lowerKebabCase, `${this.stringFormatter.toLowerKebabCase(name)}`)
      .replaceAll(enumSnippetName.upperKebabCase, `${this.stringFormatter.toUpperKebabCase(name)}`)
  }
}
