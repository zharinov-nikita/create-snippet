import { describe, expect, test } from '@jest/globals'
import { UtilCli } from './cli.util'

describe('util/cli', () => {
  const util = new UtilCli()

  test('snapshot', () => {
    expect(util).toMatchSnapshot('util')
  })
})
