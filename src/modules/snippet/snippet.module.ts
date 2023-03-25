import chalk from 'chalk'
import fs from 'fs'
import nodePath from 'path'
import { prompt } from 'prompts'
import recursiveReadDir from 'recursive-readdir'
import { CONSTANTS } from '../../constants'
import {
    enumPrefixName,
    enumSnippetName,
    enumSnippetVariable,
    enumSuffixName,
    enumSymbol,
} from '../../enums'
import type { TypeCase, TypeStringConversionMethod } from '../../types'
import { ModuleCache } from '../cache'
import { ModuleConfig } from '../config'
import { ModulePath } from '../path'
import { ModuleString } from '../string'

interface TypeOptionsSnippetGeneration {
    snippetName: string
    name: string
    path: string
    isFlat: boolean
    suffix: string
    prefix: string
}

export class ModuleSnippet {
    private readonly moduleConfig: ModuleConfig
    private readonly moduleString: ModuleString
    private readonly rootDirConfig: string
    private options: TypeOptionsSnippetGeneration
    private readonly modulePath: ModulePath
    private readonly moduleCache: ModuleCache

    constructor() {
        this.moduleConfig = new ModuleConfig()
        this.moduleString = new ModuleString()
        this.modulePath = new ModulePath()
        this.moduleCache = new ModuleCache()
        this.rootDirConfig = CONSTANTS.ROOT_DIR_CONFIG
        this.options = {
            snippetName: '',
            name: '',
            path: '',
            isFlat: false,
            suffix: '',
            prefix: '',
        }
    }

    private async addOptions() {
        const createQuestions = () => [
            {
                type: 'select',
                name: 'snippetName',
                message: 'Pick a snippet',
                choices: fs.readdirSync(this.rootDirConfig).map((path) => {
                    return { title: path, value: path }
                }),
                initial: 0,
            },
            {
                type: 'text',
                name: 'name',
                message: `Pick a name`,
            },
            {
                type: 'text',
                name: 'path',
                message: `Pick a path`,
                initial: (_: any, values: TypeOptionsSnippetGeneration) =>
                    this.moduleCache.get(`${values.snippetName}-path`),
            },
            {
                type: 'toggle',
                name: 'isFlat',
                message: 'Create a flat file structure?',
                initial: false,
                active: 'yes',
                inactive: 'no',
            },
            {
                type: async (_: any, values: TypeOptionsSnippetGeneration) =>
                    (await this.check(values.snippetName)).isPrefix
                        ? 'text'
                        : null,
                name: 'prefix',
                message: 'Pick a prefix',
                initial: (_: any, values: TypeOptionsSnippetGeneration) =>
                    this.moduleCache.get(`${values.snippetName}-prefix`),
            },
            {
                type: async (_: any, values: TypeOptionsSnippetGeneration) =>
                    (await this.check(values.snippetName)).isSuffix
                        ? 'text'
                        : null,
                name: 'suffix',
                message: 'Pick a suffix',
                initial: (_: any, values: TypeOptionsSnippetGeneration) =>
                    this.moduleCache.get(`${values.snippetName}-prefix`),
            },
        ]

        const questions = createQuestions()
        const options = await prompt(questions)
        this.options = { ...this.options, ...options }
    }

    private isSnippet(pathDirectoryCreatedSnippet: string): boolean {
        return fs.existsSync(pathDirectoryCreatedSnippet)
    }

    private createMatches(object: TypeCase, replace: string): any {
        type Key = keyof typeof object

        let matches: any = {}

        Object.keys(object).map((item) => {
            const stringConversionMethod = `to${
                item.charAt(0).toUpperCase() + item.slice(1)
            }` as TypeStringConversionMethod
            const myKey = `${object[item as Key]}`
            const myValue: string =
                this.moduleString[stringConversionMethod](replace)
            matches = { ...matches, [myKey]: myValue }
        })

        return matches
    }

    private getNumberMatchesString(arraySearchStrings: string[], data: string) {
        let counter = 0
        arraySearchStrings.forEach((searchString) => {
            if (new RegExp(searchString).test(data)) counter += 1
        })
        return counter
    }

    private formatSnippet(pathToSnippet: string) {
        const matches = {
            ...this.createMatches(enumPrefixName, this.options.prefix),
            ...this.createMatches(enumSnippetName, this.options.name),
            ...this.createMatches(enumSuffixName, this.options.suffix),
        }

        const unformattedSnippet = JSON.stringify(
            fs.readFileSync(nodePath.join(pathToSnippet), 'utf-8')
        )
        const regexp = new RegExp(Object.keys(matches).join('|'), 'g')
        const formattedSnippet = unformattedSnippet.replace(
            regexp,
            (match: any) => matches[match]
        )
        return JSON.parse(formattedSnippet)
    }

    private async check(pathToSnippet: string) {
        const myPaths = await recursiveReadDir(
            nodePath.join(...[this.rootDirConfig, pathToSnippet])
        )

        let isPrefix = false
        let isSuffix = false

        myPaths.forEach((item) => {
            const data = JSON.stringify(fs.readFileSync(item, 'utf-8'))

            const arrayPrefixes = Object.values(enumPrefixName)
            const arraySuffixes = Object.values(enumSuffixName)

            isPrefix = this.getNumberMatchesString(arrayPrefixes, data) > 0
            isSuffix = this.getNumberMatchesString(arraySuffixes, data) > 0
        })

        return { isPrefix, isSuffix }
    }

    public async getSnippetVariables(pathToSnippet: string): Promise<string[]> {
        function createRegExp(): RegExp[] {
            return Object.values(enumSnippetVariable).map(
                (item) => new RegExp(`${item}\\d+`, 'g')
            )
        }

        const myPaths = await recursiveReadDir(
            nodePath.join(...[this.rootDirConfig, pathToSnippet])
        )

        let snippetVariables: string[] = []

        myPaths.forEach((item) => {
            const data = JSON.stringify(fs.readFileSync(item, 'utf-8'))

            snippetVariables = [
                ...(createRegExp()
                    .map((item) => data.match(item))
                    .flat(Infinity)
                    .filter((item) => typeof item === 'string') as []),
            ]
        })

        return snippetVariables
    }

    private addOptionsCache() {
        const { snippetName, path, prefix, suffix } = this.options
        const expiration = 30 * 24 * 60 * 60 * 1000

        for (const [key, value] of Object.entries({ path, prefix, suffix })) {
            this.moduleCache.set(`${snippetName}-${key}`, value, expiration)
        }
    }

    public async generate() {
        if (!fs.existsSync(nodePath.join(...[this.rootDirConfig])))
            throw new Error('npx create-snippet --init')

        await this.addOptions()
        const { snippetName, name, path } = this.options

        if (snippetName === '')
            throw new Error(`specify the required argument snippet=example`)
        if (name === '')
            throw new Error(`specify the required argument name=example`)
        if (path === '')
            throw new Error(`specify the required argument path=example`)

        const config = this.moduleConfig
            .get()
            .find((item) => item.snippetName === snippetName)
        if (!config) throw new Error('config')
        recursiveReadDir(config.pathToSnippet, (error, paths) => {
            if (error) throw new Error(error.message)
            paths.forEach((pathToSnippet) => {
                const data = this.formatSnippet(pathToSnippet)
                const myPath = this.modulePath.generate({
                    config,
                    name,
                    path,
                    pathToSnippet,
                })
                const pathSnippetFile = this.options.isFlat
                    ? myPath.pathFlatSnippetFile
                    : myPath.pathSnippetFile
                const pathWriteSnippetFile = this.options.isFlat
                    ? myPath.pathFlatWriteSnippetFile
                    : myPath.pathWriteSnippetFile
                if (this.isSnippet(pathWriteSnippetFile)) {
                    // eslint-disable-next-line no-console
                    console.log(
                        `${chalk.red(enumSymbol.cross)} ${chalk.gray(
                            `The files ${myPath.snippetFileName} on the path ${pathWriteSnippetFile} already exist`
                        )}`
                    )
                } else {
                    fs.mkdirSync(pathSnippetFile, {
                        recursive: true,
                    })
                    fs.writeFileSync(pathWriteSnippetFile, data)
                    this.addOptionsCache()
                    // eslint-disable-next-line no-console
                    console.log(
                        `${chalk.green(enumSymbol.check)} ${chalk.gray(
                            myPath.snippetFileName
                        )}`
                    )
                }
            })
        })
    }
}
