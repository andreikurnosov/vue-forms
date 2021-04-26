import {required} from '../../src/validations.js'

describe('required', () => {
  it('is valid', () => {
    const actual = required('andrei')

    expect(actual).toEqual({ valid: true })
  })
})