import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'

import {
  required,
  isBetween,
  validateMeasurement,
  constraints,
  isFormValid
} from '../../src/validations.js'

describe('validateMeasurement', () => {
  it('return valid is true', () => {
    const actual = validateMeasurement(100, constraints.kg)

    expect(actual).toEqual({ valid: true })
  })

  it('return valid is true', () => {
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

describe('isFormValid', () => {
  it('is valid', () => {
    const validatedForm = {
      name: { valid: true },
      weight: { valid: true }
    }
    const actual = isFormValid(validatedForm)

    expect(actual).toBe(true)
  })

  it('is not valid', () => {
    const validatedForm = {
      name: { valid: true },
      weight: { valid: false }
    }
    const actual = isFormValid(validatedForm)

    expect(actual).toBe(false)
  })
})

test('follows the entire user story', async () => {
  const wrapper = mount(App)

  await wrapper.find('#name').setValue('')
  await wrapper.find('#weight').setValue('')
  expect(wrapper.findAll('.error').length).toBe(2)

  await wrapper.find('#name').setValue('Andrei')
  await wrapper.find('#weight').setValue('100')
  expect(wrapper.findAll('.error').length).toBe(0)

  expect(wrapper.find('button').element.disabled).toBe(false)
})
