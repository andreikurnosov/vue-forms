<template>
  <form>
    <div class="field">
      <div class="error" v-if="!validationStatus.name.valid">
        {{ validationStatus.name.message }}
      </div>

      <label for="name">Name</label>
      <input type="text" id="name" v-model="patient.name" />
    </div>

    <div class="field">
      <div class="error" v-if="!validationStatus.weight.valid">
        {{ validationStatus.weight.message }}
      </div>
      <label for="weight">Weight</label>
      <input type="text" id="weight" v-model.number="patient.weight.value" />

      <select v-model="patient.weight.units">
        <option value="kg">kg</option>
        <option value="lb">lb</option>
      </select>
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

<style scoped>
.field > label {
  display: inline-block;
  width: 50px;
  margin: 0 0 20px 0;
}
.field > input {
  display: inline-block;
  margin: 2px;
}
.error {
  color: red;
}
</style>
