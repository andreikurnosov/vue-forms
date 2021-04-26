import { required } from '../../src/validations.js'

describe('required', () => {
  it('is valid', () => {
    const actual = required('andrei')

    expect(actual).toEqual({ valid: true })
  })

  const result = { valid: false, message: 'Required' }

  const cases = [
    ['', result],
    [null, result],
    [undefined, result]
  ]

  test.each(cases)('returns invalid', (input, output) => {
    expect(required(input)).toEqual(output)
  })
})
