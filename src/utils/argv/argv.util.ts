export class UtilArgv {
  public find(name: string): string {
    const args = [...process.argv.slice(2)]
    const regexp = new RegExp(`--${name}`)
    const argName = args.find((item) => (regexp.test(item) ? item : undefined))
    return argName ? argName.split('=')[1] : ''
  }
}
