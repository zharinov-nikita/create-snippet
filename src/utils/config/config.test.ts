import { describe, expect, test } from '@jest/globals'
import { UtilConfig } from './config.util'

describe('util/config', () => {
  const util = new UtilConfig()

  test('snapshot', () => {
    expect(util).toMatchSnapshot('util')
  })
})
