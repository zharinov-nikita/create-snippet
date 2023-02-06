import type { TypeArgs, TypeGeneratePath } from '../../types'

export interface TypeFormatOptions extends Pick<TypeArgs, 'name' | 'suffix' | 'prefix'> {
  pathToSnippet: string
}

export interface TypeCreateOptions extends TypeGeneratePath {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formattedSnippet: any
  isFlat: boolean
}
