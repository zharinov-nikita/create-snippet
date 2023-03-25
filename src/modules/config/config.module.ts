import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { CONSTANTS } from '../../constants'
import {
    enumPrefixName,
    enumSnippetName,
    enumSuffixName,
    enumSymbol,
} from '../../enums'
import { TypeCase, TypeConfig } from '../../types'
import { InterfaceConfig } from './config.interface'

export class ModuleConfig implements InterfaceConfig<TypeConfig> {
    public readonly rootDirConfig: string
    public readonly isRootDirConfig: boolean

    constructor() {
        this.rootDirConfig = CONSTANTS.ROOT_DIR_CONFIG
        this.isRootDirConfig = fs.existsSync(CONSTANTS.ROOT_DIR_CONFIG)
    }

    private example(index: number): string {
        function objectToString(object: TypeCase): string {
            const values = Object.values(object)
            const indexLastValue = values.length - 1
            return values
                .map(
                    (item: string, i) =>
                        `'${item.replace(',', '')}'[x]${
                            i !== indexLastValue ? '\n' : ''
                        }`
                )
                .toString()
                .replaceAll(',', '')
                .replaceAll('[x]', ',')
        }

        if (index === 0)
            return `export const SnippetName = [
${objectToString(enumSnippetName)}
]
    `

        if (index === 1)
            return `export const PrefixNameSnippetName = [
${objectToString(enumPrefixName)}
      
${objectToString(enumSnippetName)}
]`

        if (index === 2)
            return `export const SnippetNameSuffixName = [
${objectToString(enumSnippetName)}
    
${objectToString(enumSuffixName)}
]`

        if (index === 3)
            return `export const PrefixNameSnippetNameSuffixName = [
${objectToString(enumPrefixName)}
    
${objectToString(enumSnippetName)}

${objectToString(enumSuffixName)}
]`

        return `export const SnippetName = [
${objectToString(enumSnippetName)}
]
    `
    }

    public init(): void {
        const array: number[] = Array.from(Array(4).keys())
        const examplePaths: string[] = array.map(
            (_, index) => `${this.rootDirConfig}/my-snippet-${index + 1}`
        )

        examplePaths.forEach((pathExample, index) => {
            fs.mkdirSync(path.join(pathExample), { recursive: true })
            fs.writeFileSync(
                path.join(...[pathExample, 'snippet-name.ts']),
                this.example(index)
            )
        })

        // eslint-disable-next-line no-console
        console.log(
            `${chalk.green(enumSymbol.check)} ${chalk.gray(
                `the project has been successfully initialized`
            )}`
        )
    }

    public get() {
        const snippets = fs.readdirSync(this.rootDirConfig)
        return snippets.map((snippetName) => ({
            snippetName,
            pathToSnippet: path.join(...[this.rootDirConfig, snippetName]),
        }))
    }

    public help(): void {
        // eslint-disable-next-line no-console
        console.log(
            `
Documentation

npx create-snippet --help will show hints
npx create-snippet --init initializes the project
npx create-snippet --generate generates a new snippet

New snippet

When creating a new snippet, create a directory inside the 
directory .create-snippet with an arbitrary name,
create the required number of files and directories inside this directory.
    
SnippetName
    
The strings [snippetName] specified inside the file or in the file name 
will be converted to a custom string when generating a new snippet.
    
PrefixName
    
The strings [prefixName] specified inside the file when generating a new
snippet will be converted to custom strings.
    
SuffixName
    
The strings [suffixName] specified inside the file when generating a new
snippet will be converted to custom strings.

Supported cases for strings

1) camelCase
2) PascalCase
3) lower_snake_case
4) UPPER_SNAKE_CASE
5) lower-kebab-case
6) UPPER-KEBAB-CASE

Specifying parameters via the console

1) snippet - any string
2) name - any string in the format lower-kebab-case
3) path - any string
4) prefix - any string in the format lower-kebab-case
4) suffix - any string in the format lower-kebab-case
`
        )
    }
}
