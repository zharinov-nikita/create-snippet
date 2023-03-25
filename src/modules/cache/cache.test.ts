import {
    afterAll,
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    test,
} from '@jest/globals'
import fs from 'fs'
import path from 'path'
import { ModuleCache } from './cache.module'

describe('ModuleCache', () => {
    const cacheDir = 'cache'
    let cache: ModuleCache

    beforeAll(() => {
        // Создаем временную директорию для тестового кэша
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir)
        }
    })

    afterAll(() => {
        // Удаляем тестовый кэш
        fs.rmdirSync(cacheDir, { recursive: true })
    })

    beforeEach(() => {
        // Создаем экземпляр класса для каждого теста
        cache = new ModuleCache()
    })

    afterEach(() => {
        // Удаляем все файлы из тестового кэша после каждого теста
        fs.readdirSync(cacheDir).forEach((file) => {
            fs.unlinkSync(path.join(cacheDir, file))
        })
    })

    describe('get', () => {
        test('should return null for non-existing key', () => {
            expect(cache.get('non-existing-key')).toBeNull()
        })

        test('should return null for expired key', () => {
            cache.set('key', 'value', -1000)
            expect(cache.get('key')).toBeNull()
        })

        test('should return cached value for valid key', () => {
            cache.set('key', 'value', 1000)
            expect(cache.get('key')).toEqual('value')
        })
    })

    describe('set', () => {
        test('should add new key-value pair to cache', () => {
            cache.set('key', 'value')
            expect(cache.get('key')).toEqual(null)
        })

        test('should overwrteste existing key-value pair in cache', () => {
            cache.set('key', 'old-value')
            cache.set('key', 'new-value')
            expect(cache.get('key')).toEqual(null)
        })

        test('should set expiration for key-value pair', () => {
            const expiration = 1000
            cache.set('key', 'value', expiration)
            const filePath = path.join(cacheDir, 'key.json')
            const content = fs.readFileSync(filePath, 'utf-8')
            const { expiration: fileExpiration } = JSON.parse(content)
            expect(fileExpiration).toBeGreaterThan(Date.now())
            expect(fileExpiration).toBeLessThanOrEqual(Date.now() + expiration)
        })
    })

    describe('delete', () => {
        test('should remove key-value pair from cache', () => {
            cache.set('key', 'value')
            cache.delete('key')
            expect(cache.get('key')).toBeNull()
        })

        test('should do nothing for non-existing key', () => {
            cache.delete('non-existing-key')
            expect(cache.get('non-existing-key')).toBeNull()
        })
    })
})
