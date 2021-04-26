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
