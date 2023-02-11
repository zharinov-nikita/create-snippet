#!/usr/bin/env node
const arg = process.argv.slice(2)[0]
const scripts = ['init']
if (!scripts.includes(arg)) throw new Error('No script')
require(`../scripts/${arg}.script`)
