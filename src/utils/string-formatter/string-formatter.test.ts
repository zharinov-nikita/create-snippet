import { describe, expect, test } from '@jest/globals'
import { UtilStringFormatter } from './string-formatter.util'

describe('util/string-formatter', () => {
  const stringInKebabCase = 'hello-world'
  const util = new UtilStringFormatter()

  test('toCase', () => {
    expect(util.toCamelCase(stringInKebabCase)).toBe('helloWorld')
    expect(util.toLowerKebabCase(stringInKebabCase)).toBe('hello-world')
    expect(util.toLowerSnakeCase(stringInKebabCase)).toBe('hello_world')
    expect(util.toPascalCase(stringInKebabCase)).toBe('HelloWorld')
    expect(util.toUpperKebabCase(stringInKebabCase)).toBe('HELLO-WORLD')
    expect(util.toUpperSnakeCase(stringInKebabCase)).toBe('HELLO_WORLD')
  })

  test('snapshot', () => {
    expect(util.toCamelCase(stringInKebabCase)).toMatchSnapshot('helloWorld')
    expect(util.toLowerKebabCase(stringInKebabCase)).toMatchSnapshot('hello-world')
    expect(util.toLowerSnakeCase(stringInKebabCase)).toMatchSnapshot('hello_world')
    expect(util.toPascalCase(stringInKebabCase)).toMatchSnapshot('HelloWorld')
    expect(util.toUpperKebabCase(stringInKebabCase)).toMatchSnapshot('HELLO-WORLD')
    expect(util.toUpperSnakeCase(stringInKebabCase)).toMatchSnapshot('HELLO_WORLD')
  })
})
