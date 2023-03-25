#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { ModuleArgv } from '../modules'
const moduleArgv = new ModuleArgv()
const arg = moduleArgv.getNotFormatted()[0]
const paths = fs.readdirSync(path.join(__dirname, '..', 'scripts'))

function createTeamNamesFromFile(str: string) {
    const [filename] = str.split('.')
    const firstLetters = filename
        .split('-')
        .map((word) => word[0])
        .join('')
    const hyphenated = `--${filename}`
    const short = `-${firstLetters}`
    return { [hyphenated]: str, [short]: str }
}

const arrayCommands = paths.map((path) => ({
    ...createTeamNamesFromFile(path),
}))

const commands = arrayCommands.reduce((flat, command) => {
    return { ...flat, ...command }
}, {})

const command = commands[arg]

if (typeof command === 'undefined') throw new Error('No script')
require(`../scripts/${commands[arg]}`)
