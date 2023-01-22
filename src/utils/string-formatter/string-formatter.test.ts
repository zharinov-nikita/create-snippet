import { describe, expect, test } from '@jest/globals'
import { UtilStringFormatter } from './string-formatter.util'

describe('util/string-formatter', () => {
  const stringFormatter = new UtilStringFormatter('hello-world')

  test('toCase', () => {
    expect(stringFormatter.toCamelCase()).toBe('helloWorld')
    expect(stringFormatter.toLowerKebabCase()).toBe('hello-world')
    expect(stringFormatter.toLowerSnakeCase()).toBe('hello_world')
    expect(stringFormatter.toPascalCase()).toBe('HelloWorld')
    expect(stringFormatter.toUpperKebabCase()).toBe('HELLO-WORLD')
    expect(stringFormatter.toUpperSnakeCase()).toBe('HELLO_WORLD')
  })

  test('snapshot', () => {
    expect(stringFormatter.toCamelCase()).toMatchSnapshot('helloWorld')
    expect(stringFormatter.toLowerKebabCase()).toMatchSnapshot('hello-world')
    expect(stringFormatter.toLowerSnakeCase()).toMatchSnapshot('hello_world')
    expect(stringFormatter.toPascalCase()).toMatchSnapshot('HelloWorld')
    expect(stringFormatter.toUpperKebabCase()).toMatchSnapshot('HELLO-WORLD')
    expect(stringFormatter.toUpperSnakeCase()).toMatchSnapshot('HELLO_WORLD')
  })
})
