import { TypeConfig, TypeGeneratePath } from '../../types'

export interface TypeGenerateOptions {
  pathToSnippet: string
  config: TypeConfig
  name: string
  path: string
}

export type TypeGenerateSnippetFileNameOptions = Pick<TypeGenerateOptions, 'pathToSnippet' | 'name'>

export type TypeGenerateDefaultPath = Pick<TypeGeneratePath, 'pathSnippetFile' | 'pathWriteSnippetFile'>
export type TypeGenerateFlatPath = Pick<TypeGeneratePath, 'pathFlatSnippetFile' | 'pathFlatWriteSnippetFile'>
