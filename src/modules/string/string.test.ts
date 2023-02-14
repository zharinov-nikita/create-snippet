import { describe, expect, test } from '@jest/globals'
import { enumSnippetName } from '../../enums'
import { ModuleString } from './string.module'

describe('module/string', () => {
  const module = new ModuleString()

  const { camelCase, lowerKebabCase, lowerSnakeCase, pascalCase, upperKebabCase, upperSnakeCase } =
    enumSnippetName

  test('toCase', () => {
    expect(module.toCamelCase(lowerKebabCase)).toBe(camelCase)
    expect(module.toLowerKebabCase(lowerKebabCase)).toBe(lowerKebabCase)
    expect(module.toLowerSnakeCase(lowerKebabCase)).toBe(lowerSnakeCase)
    expect(module.toPascalCase(lowerKebabCase)).toBe(pascalCase)
    expect(module.toUpperKebabCase(lowerKebabCase)).toBe(upperKebabCase)
    expect(module.toUpperSnakeCase(lowerKebabCase)).toBe(upperSnakeCase)
  })

  test('isCamelCase', () => {
    expect(module.isCamelCase(camelCase)).toBe(true)
    expect(module.isCamelCase(lowerKebabCase)).toBe(false)
    expect(module.isCamelCase(lowerSnakeCase)).toBe(false)
    expect(module.isCamelCase(pascalCase)).toBe(false)
    expect(module.isCamelCase(upperKebabCase)).toBe(false)
    expect(module.isCamelCase(upperSnakeCase)).toBe(false)
  })

  test('isLowerKebabCase', () => {
    expect(module.isLowerKebabCase(camelCase)).toBe(false)
    expect(module.isLowerKebabCase(lowerKebabCase)).toBe(true)
    expect(module.isLowerKebabCase(lowerSnakeCase)).toBe(false)
    expect(module.isLowerKebabCase(pascalCase)).toBe(false)
    expect(module.isLowerKebabCase(upperKebabCase)).toBe(false)
    expect(module.isLowerKebabCase(upperSnakeCase)).toBe(false)
  })

  test('isLowerSnakeCase', () => {
    expect(module.isLowerSnakeCase(camelCase)).toBe(false)
    expect(module.isLowerSnakeCase(lowerKebabCase)).toBe(false)
    expect(module.isLowerSnakeCase(lowerSnakeCase)).toBe(true)
    expect(module.isLowerSnakeCase(pascalCase)).toBe(false)
    expect(module.isLowerSnakeCase(upperKebabCase)).toBe(false)
    expect(module.isLowerSnakeCase(upperSnakeCase)).toBe(false)
  })

  test('isPascalCase', () => {
    expect(module.isPascalCase(camelCase)).toBe(false)
    expect(module.isPascalCase(lowerKebabCase)).toBe(false)
    expect(module.isPascalCase(lowerSnakeCase)).toBe(false)
    expect(module.isPascalCase(pascalCase)).toBe(true)
    expect(module.isPascalCase(upperKebabCase)).toBe(false)
    expect(module.isPascalCase(upperSnakeCase)).toBe(false)
  })

  test('isUpperKebabCase', () => {
    expect(module.isUpperKebabCase(camelCase)).toBe(false)
    expect(module.isUpperKebabCase(lowerKebabCase)).toBe(false)
    expect(module.isUpperKebabCase(lowerSnakeCase)).toBe(false)
    expect(module.isUpperKebabCase(pascalCase)).toBe(false)
    expect(module.isUpperKebabCase(upperKebabCase)).toBe(true)
    expect(module.isUpperKebabCase(upperSnakeCase)).toBe(false)
  })

  test('isUpperSnakeCase', () => {
    expect(module.isUpperSnakeCase(camelCase)).toBe(false)
    expect(module.isUpperSnakeCase(lowerKebabCase)).toBe(false)
    expect(module.isUpperSnakeCase(lowerSnakeCase)).toBe(false)
    expect(module.isUpperSnakeCase(pascalCase)).toBe(false)
    expect(module.isUpperSnakeCase(upperKebabCase)).toBe(false)
    expect(module.isUpperSnakeCase(upperSnakeCase)).toBe(true)
  })
})
