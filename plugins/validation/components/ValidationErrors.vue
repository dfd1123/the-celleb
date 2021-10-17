<template>
  <ul validation-errors :class="{error}">
    <li v-for="err in errors" :key="err._rule_">
      {{ err }}
    </li>
    <li v-if="placeholder && !error">
      {{ placeholder }}
    </li>
  </ul>
</template>

<script>

export default {
  name: 'ValidationErrors',
  props: {
    errors: { type: Array },
    placeholder: { type: String }
  },
  computed: {
    error () {
      return this.errors.length > 0
    }
  }
}
</script>
