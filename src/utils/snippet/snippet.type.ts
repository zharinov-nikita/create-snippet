import type { TypeGeneratePath } from '../../types'

export interface TypeFormatOptions {
  pathToSnippet: string
  name: string
}

export interface TypeCreateOptions extends TypeGeneratePath {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formattedSnippet: any
  isFlat: boolean
}
