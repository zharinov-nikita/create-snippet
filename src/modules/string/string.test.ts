import { describe, expect, test } from '@jest/globals'
import { ModuleString } from './string.module'

describe('module/string', () => {
  const module = new ModuleString()
  const stringInKebabCase = 'hello-world'

  test('toCase', () => {
    expect(module.toCamelCase(stringInKebabCase)).toBe('helloWorld')
    expect(module.toLowerKebabCase(stringInKebabCase)).toBe('hello-world')
    expect(module.toLowerSnakeCase(stringInKebabCase)).toBe('hello_world')
    expect(module.toPascalCase(stringInKebabCase)).toBe('HelloWorld')
    expect(module.toUpperKebabCase(stringInKebabCase)).toBe('HELLO-WORLD')
    expect(module.toUpperSnakeCase(stringInKebabCase)).toBe('HELLO_WORLD')
  })

  test('snapshot', () => {
    expect(module.toCamelCase(stringInKebabCase)).toMatchSnapshot('helloWorld')
    expect(module.toLowerKebabCase(stringInKebabCase)).toMatchSnapshot('hello-world')
    expect(module.toLowerSnakeCase(stringInKebabCase)).toMatchSnapshot('hello_world')
    expect(module.toPascalCase(stringInKebabCase)).toMatchSnapshot('HelloWorld')
    expect(module.toUpperKebabCase(stringInKebabCase)).toMatchSnapshot('HELLO-WORLD')
    expect(module.toUpperSnakeCase(stringInKebabCase)).toMatchSnapshot('HELLO_WORLD')
  })
})
