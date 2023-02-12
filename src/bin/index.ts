#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { ModuleArgv } from '../modules'
const moduleArgv = new ModuleArgv()
const args = moduleArgv.getNotFormatted()
const paths = fs.readdirSync(path.join(...['src', 'scripts']))
const scripts = [...paths.map((script) => `--${script.split('.script')[0]}`)]
const arg = args.filter((arg) => scripts.includes(arg))[0]
if (typeof arg !== 'string') throw new Error('No script')
require(`../scripts/${arg.replace('--', '')}.script`)
