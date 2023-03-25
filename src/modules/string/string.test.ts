import { describe, expect, test } from '@jest/globals'
import { enumSnippetName } from '../../enums'
import { ModuleString } from './string.module'

describe('module/string', () => {
    const module = new ModuleString()

    const {
        camelCase,
        lowerKebabCase,
        lowerSnakeCase,
        pascalCase,
        upperKebabCase,
        upperSnakeCase,
    } = enumSnippetName

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

    test('snapshot', () => {
        expect(module.toCamelCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.toLowerKebabCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.toLowerSnakeCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.toPascalCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.toUpperKebabCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.toUpperSnakeCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.isCamelCase(camelCase)).toMatchSnapshot()
        expect(module.isCamelCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.isCamelCase(lowerSnakeCase)).toMatchSnapshot()
        expect(module.isCamelCase(pascalCase)).toMatchSnapshot()
        expect(module.isCamelCase(upperKebabCase)).toMatchSnapshot()
        expect(module.isCamelCase(upperSnakeCase)).toMatchSnapshot()
        expect(module.isLowerKebabCase(camelCase)).toMatchSnapshot()
        expect(module.isLowerKebabCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.isLowerKebabCase(lowerSnakeCase)).toMatchSnapshot()
        expect(module.isLowerKebabCase(pascalCase)).toMatchSnapshot()
        expect(module.isLowerKebabCase(upperKebabCase)).toMatchSnapshot()
        expect(module.isLowerKebabCase(upperSnakeCase)).toMatchSnapshot()
        expect(module.isLowerSnakeCase(camelCase)).toMatchSnapshot()
        expect(module.isLowerSnakeCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.isLowerSnakeCase(lowerSnakeCase)).toMatchSnapshot()
        expect(module.isLowerSnakeCase(pascalCase)).toMatchSnapshot()
        expect(module.isLowerSnakeCase(upperKebabCase)).toMatchSnapshot()
        expect(module.isLowerSnakeCase(upperSnakeCase)).toMatchSnapshot()
        expect(module.isPascalCase(camelCase)).toMatchSnapshot()
        expect(module.isPascalCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.isPascalCase(lowerSnakeCase)).toMatchSnapshot()
        expect(module.isPascalCase(pascalCase)).toMatchSnapshot()
        expect(module.isPascalCase(upperKebabCase)).toMatchSnapshot()
        expect(module.isPascalCase(upperSnakeCase)).toMatchSnapshot()
        expect(module.isUpperKebabCase(camelCase)).toMatchSnapshot()
        expect(module.isUpperKebabCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.isUpperKebabCase(lowerSnakeCase)).toMatchSnapshot()
        expect(module.isUpperKebabCase(pascalCase)).toMatchSnapshot()
        expect(module.isUpperKebabCase(upperKebabCase)).toMatchSnapshot()
        expect(module.isUpperKebabCase(upperSnakeCase)).toMatchSnapshot()
        expect(module.isUpperSnakeCase(camelCase)).toMatchSnapshot()
        expect(module.isUpperSnakeCase(lowerKebabCase)).toMatchSnapshot()
        expect(module.isUpperSnakeCase(lowerSnakeCase)).toMatchSnapshot()
        expect(module.isUpperSnakeCase(pascalCase)).toMatchSnapshot()
        expect(module.isUpperSnakeCase(upperKebabCase)).toMatchSnapshot()
        expect(module.isUpperSnakeCase(upperSnakeCase)).toMatchSnapshot()
    })
})
