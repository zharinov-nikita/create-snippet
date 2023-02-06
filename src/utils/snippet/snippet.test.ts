import { describe, expect, test } from '@jest/globals'
import { UtilSnippet } from './snippet.util'

describe('util/snippet', () => {
  const util = new UtilSnippet()

  test('snapshot', () => {
    expect(util).toMatchSnapshot('util')
  })
})
