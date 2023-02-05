import { describe, expect, test } from '@jest/globals'
import { UtilPath } from './path.util'

describe('util/path', () => {
  const util = new UtilPath()

  test('snapshot', () => {
    expect(util).toMatchSnapshot('util')
  })
})
