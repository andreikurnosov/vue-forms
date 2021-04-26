<template>
  <form>
    <div class="field">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="patient.name" />
    </div>

    <div class="field">
      <label for="weight">Weight</label>
      <input type="text" id="weight" v-model.number="patient.weight.value" />
    </div>
  </form>

  <pre>
  {{ patient }}
</pre
  >

  <pre>
    {{ validationStatus }}
  </pre>
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
