<template>
  <pre>
  {{ patient }}
</pre
  >
  <pre>
  {{ validationStatus }}
</pre
  >
</template>

<script>
import { patientForm, validatePatient } from './validations.js'
import { reactive, computed } from 'vue'

export default {
  name: 'App',

  setup() {
    const patient = reactive({
      name: '',
      weight: {
        value: 100,
        units: 'kg'
      }
    })

    const validationStatus = computed(() => {
      return validatePatient(patient)
    })

    return { patient, validationStatus }
  }
}
</script>
