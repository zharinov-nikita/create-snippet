import { describe, expect, test } from '@jest/globals'
import { enumSnippetName } from '../../enums'
import { UtilStringFormatter } from '../string-formatter'
import { UtilSnippet } from './snippet.util'

describe('util/snippet', () => {
  const utilSnippet = new UtilSnippet()
  const utilStringFormatter = new UtilStringFormatter()
  const name = 'hello-world'

  const snippet = `
    [${enumSnippetName.camelCase}]
    [${enumSnippetName.lowerKebabCase}]
    [${enumSnippetName.lowerSnakeCase}]
    [${enumSnippetName.pascalCase}]
    [${enumSnippetName.upperKebabCase}]
    [${enumSnippetName.upperSnakeCase}]
    `
  const formattedSnippet = `
    [${utilStringFormatter.toCamelCase(name)}]
    [${utilStringFormatter.toLowerKebabCase(name)}]
    [${utilStringFormatter.toLowerSnakeCase(name)}]
    [${utilStringFormatter.toPascalCase(name)}]
    [${utilStringFormatter.toUpperKebabCase(name)}]
    [${utilStringFormatter.toUpperSnakeCase(name)}]
    `

  test('toCase', () => {
    expect(utilSnippet.replace(snippet, name)).toBe(formattedSnippet)
  })

  test('snapshot', () => {
    expect(utilSnippet).toMatchSnapshot('util')
    expect(utilSnippet.replace(snippet, name)).toMatchSnapshot('replace')
  })
})
