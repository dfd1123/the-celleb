<template>
  <ul validation-errors :class="{error}">
    <li v-for="(msg, index) in errorMsgs" :key="`error-${index}`">
      {{ msg }}
    </li>
    <li v-if="placeholder && !error">
      {{ placeholder }}
    </li>
  </ul>
</template>

<script>
import validateErrors from '../validateErrors'

export default {
  name: 'ValidationErrors',
  props: {
    errors: { type: Array },
    placeholder: { type: String }
  },
  computed: {
    error () {
      return this.errors.length > 0
    },
    errorMsgs () {
      return this.errors.map((err) => {
        const name = validateErrors.names[err._field_] ?? err._field_
        return validateErrors.rules[err._rule_].replace('{_field_}', name)
      })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[validation-errors]{ .min-h(17); .mt(5); .mb(10); .fs(14,17); .c(#fd3d63);

}
</style>
