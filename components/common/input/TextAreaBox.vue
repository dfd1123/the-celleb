<template>
  <div text-area-box :class="{disabled}">
    <textarea v-model="model" :placeholder="placeholder" :disabled="disabled" />
  </div>
</template>

<script>
export default {
  name: 'TextAreaBox',
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      model: ''
    }
  },
  watch: {
    value: 'update',
    model: 'updateModel'
  },
  methods: {
    update () {
      this.model = this.value
    },
    updateModel () {
      this.$emit('input', this.model)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[text-area-box]{
  textarea{ .wh(100%); .p(24); .fs(16,24); .c(@title-black); .-a(#d9d9d9); .br(5); resize: none;
    &::placeholder{ .c(#ccc); }
  }
}
</style>
