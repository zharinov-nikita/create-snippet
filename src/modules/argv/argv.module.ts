import { TypeArgvGet } from './argv.type'

export class ModuleArgv {
  public get(name: string): TypeArgvGet {
    const args = [...process.argv.slice(2)]
    const regexp = new RegExp(`--${name}`)
    const argName = args.find((item) => (regexp.test(item) ? item : undefined))

    if (typeof argName === 'string') {
      const key = argName.split('=')[0].replaceAll('--', '') || null
      const value = argName.split('=')[1] || null
      return { key, value }
    }

    return {
      key: null,
      value: null,
    }
  }
}
