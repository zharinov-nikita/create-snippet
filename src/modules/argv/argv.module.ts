import { TypeArgvGet } from './argv.type'

export class ModuleArgv {
  private args: string[]

  constructor() {
    this.args = [...process.argv.slice(2)]
  }

  private formatArg(arg: string): TypeArgvGet {
    return {
      key: arg.split('=')[0].replaceAll('--', '') || null,
      value: arg.split('=')[1] || null,
    }
  }

  public findArg(name: string): TypeArgvGet {
    const regexp = new RegExp(`${name}`)
    const arg = this.args.find((item) => (regexp.test(item) ? item : undefined))

    if (typeof arg === 'string') {
      return { ...this.formatArg(arg) }
    }

    return {
      key: null,
      value: null,
    }
  }

  public getNotFormattedArgs(): string[] {
    return this.args
  }

  public getFormattedArgs(): TypeArgvGet[] {
    return this.args.map((arg) => ({
      ...this.formatArg(arg),
    }))
  }
}
