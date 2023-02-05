import { describe, expect, test } from '@jest/globals'
import { UtilPrompt } from './prompt.util'

describe('util/prompt', () => {
  const util = new UtilPrompt()

  test('snapshot', () => {
    expect(util).toMatchSnapshot('util')
  })
})
