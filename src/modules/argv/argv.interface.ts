export interface InterfaceArgv<TypeArgv> {
  format: (name: string) => TypeArgv
  find: (name: string) => TypeArgv
  getNotFormatted: () => string[]
  getFormatted: () => TypeArgv[]
}
