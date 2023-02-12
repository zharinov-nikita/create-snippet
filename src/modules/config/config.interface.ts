export interface InterfaceConfig<TypeConfig> {
  init: () => void
  get: () => TypeConfig[]
}
