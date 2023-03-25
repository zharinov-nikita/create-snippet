import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { enumSymbol } from '../../enums'

export class ModuleCache {
    private cacheDir: string

    constructor() {
        this.cacheDir = path.join(__dirname, '..', '..', '__cache__')
        if (!fs.existsSync(this.cacheDir)) {
            fs.mkdirSync(this.cacheDir)
        }
    }

    public get(key: string): any {
        const filePath = this.getFilePath(key)
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8')
            const { data, expiration } = JSON.parse(content)
            // проверяем, не истекло ли время жизни кэша
            if (expiration === null || Date.now() < expiration) {
                return data
            }
            this.delete(key)
        }
        return null
    }

    public set(key: string, value: any, expiration: number = 0): void {
        const filePath = this.getFilePath(key)
        const content = JSON.stringify({
            data: value,
            expiration: Date.now() + expiration,
        })
        fs.writeFileSync(filePath, content, 'utf-8')
    }

    public delete(key: string): void {
        const filePath = this.getFilePath(key)
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
    }

    private getFilePath(key: string): string {
        const fileName = `${key}.json`
        return path.join(this.cacheDir, fileName)
    }

    public clear(): void {
        fs.readdirSync(this.cacheDir).forEach((file) => {
            fs.unlinkSync(path.join(this.cacheDir, file))
        })
        // eslint-disable-next-line no-console
        console.log(
            `${chalk.green(enumSymbol.check)} ${chalk.gray(
                `Cache cleared successfully!`
            )}`
        )
    }
}
