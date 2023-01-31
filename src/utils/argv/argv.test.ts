import { describe, expect, test } from '@jest/globals'
import { UtilArgv } from './argv.util'

describe('util/argv', () => {
  const argv: string[] = ['--make=ford', '--mode=mustang', '--year=1879']
  process.argv.push(...argv)
  const util = new UtilArgv()
  test('find', () => {
    expect(util.find('make')).toBe('ford')
    expect(util.find('mode')).toBe('mustang')
    expect(util.find('year')).toBe('1879')
    expect(util.find('color')).toBe('')
  })
  test('snapshot', () => {
    expect(util.find('make')).toMatchSnapshot('ford')
    expect(util.find('mode')).toMatchSnapshot('mustang')
    expect(util.find('year')).toMatchSnapshot('1879')
    expect(util.find('color')).toMatchSnapshot('')
  })
})
