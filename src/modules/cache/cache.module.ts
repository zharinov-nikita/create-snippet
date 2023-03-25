import fs from 'fs'
import path from 'path'

export class ModuleCache {
    private cacheDir: string

    constructor() {
        this.cacheDir = 'cache'
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
}
