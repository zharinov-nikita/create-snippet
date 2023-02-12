export interface InterfacePath<Options, Path> {
  generate: (options: Options) => Path
}
