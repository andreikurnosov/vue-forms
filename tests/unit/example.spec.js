import {
  required,
  isBetween,
  validateMeasurement,
  constraints
} from '../../src/validations.js'

describe('validateMeasurement', () => {
  it.only('return valid is true', () => {
    const actual = validateMeasurement(100, constraints.kg)

    expect(actual).toEqual({ valid: true })
  })

  it.only('return valid is true', () => {
    const actual = validateMeasurement(500, constraints.kg)

    expect(actual).toEqual({
      valid: false,
      message: `Must be between 30 and 200`
    })
  })
})

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

describe('isBetween', () => {
  it('is greater than upper limit', () => {
    const actual = isBetween(11, { min: 1, max: 10 })

    expect(actual).toEqual({
      valid: false,
      message: 'Must be between 1 and 10'
    })
  })

  it('is less than lower limit', () => {
    const actual = isBetween(0, { min: 1, max: 10 })

    expect(actual).toEqual({
      valid: false,
      message: 'Must be between 1 and 10'
    })
  })

  it('is same as lower limit', () => {
    const actual = isBetween(1, { min: 1, max: 10 })
    expect(actual).toEqual({ valid: true })
  })

  it('is same as upper limit', () => {
    const actual = isBetween(10, { min: 1, max: 10 })
    expect(actual).toEqual({ valid: true })
  })

  it('is not valid number', () => {
    const actual = isBetween('asdfasdf', { min: 1, max: 10 })
    expect(actual).toEqual({ valid: false, message: `Must be a number` })
  })
})
