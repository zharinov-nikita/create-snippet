import { InterfaceArgv } from './argv.interface'
import { TypeArgv } from './argv.type'

export class ModuleArgv implements InterfaceArgv<TypeArgv> {
    private args: string[]

    constructor() {
        this.args = [...process.argv.slice(2)]
    }

    public format(name: string) {
        return {
            key: name.split('=')[0].replaceAll('--', '') || null,
            value: name.split('=')[1] || null,
        }
    }

    public find(name: string) {
        const regexp = new RegExp(`${name}`)
        const arg = this.args.find((item) =>
            regexp.test(item) ? item : undefined
        )

        if (typeof arg === 'string') {
            return { ...this.format(arg) }
        }

        return {
            key: null,
            value: null,
        }
    }

    public getNotFormatted() {
        return this.args
    }

    public getFormatted() {
        return this.args.map((arg) => ({
            ...this.format(arg),
        }))
    }
}
