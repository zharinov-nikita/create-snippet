import { describe, expect, test } from '@jest/globals'
import { ModuleArgv } from './argv.module'

describe('module/argv', () => {
  process.argv.push('--make=ford')
  const moduleArgv = new ModuleArgv()
  test('get', () => {
    //make
    expect(moduleArgv.get('make')).toStrictEqual({ key: 'make', value: 'ford' })
    expect(moduleArgv.get('make').value).toBe('ford')
    expect(moduleArgv.get('make').key).toBe('make')
    //mode
    expect(moduleArgv.get('mode')).toStrictEqual({ key: null, value: null })
    expect(moduleArgv.get('mode').value).toBeNull()
    expect(moduleArgv.get('mode').key).toBeNull()
  })
  test('snapshot', () => {
    //make
    expect(moduleArgv.get('make')).toMatchSnapshot()
    expect(moduleArgv.get('make').value).toMatchSnapshot()
    expect(moduleArgv.get('make').key).toMatchSnapshot()
    //mode
    expect(moduleArgv.get('mode')).toMatchSnapshot()
    expect(moduleArgv.get('mode').value).toMatchSnapshot()
    expect(moduleArgv.get('mode').key).toMatchSnapshot()
  })
})
