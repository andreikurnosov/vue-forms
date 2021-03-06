export const constraints = {
  kg: {
    min: 30,
    max: 200
  },
  lb: {
    min: 66,
    max: 440
  }
}

export function isFormValid(form) {
  return form.name.valid && form.weight.valid
}

export function validatePatient(patient) {
  return {
    name: required(patient.name),
    weight: validateMeasurement(
      patient.weight.value,
      constraints[patient.weight.units]
    )
  }
}

export function patientForm(patient) {
  return validatePatient(patient)
}

export function validateMeasurement(value, { min, max }) {
  const isNotNull = required(value)

  if (!isNotNull.valid) {
    return isNotNull
  }

  const fallsBetween = isBetween(value, { min, max })

  if (!fallsBetween.valid) {
    return fallsBetween
  }

  return {
    valid: true
  }
}

export function isBetween(value, { min, max }) {
  if (isNaN(parseInt(value))) {
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
