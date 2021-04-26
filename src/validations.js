export function isBetween(value, { min, max }) {
  if(isNaN(parseInt(value))) {
    return {
      valid: false,
      message: 'Must be a number'
    }
  }

  if (value < min || value > max) {
    return {
      valid: false,
      message: `Must be between ${min} and ${max}`
    }
  }

  return {
    valid: true
  }
}

export function required(value) {
  if (!value) {
    return {
      valid: false,
      message: 'Required'
    }
  }

  return {
    valid: true
  }
}
