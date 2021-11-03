<template>
  <div text-area-box :class="{disabled}">
    <textarea v-model="model" :placeholder="placeholder" :disabled="disabled" :maxlength="max" />
    <span v-if="max" class="char-length">{{ charLength }}/{{ max }}</span>
  </div>
</template>

<script>
export default {
  name: 'TextAreaBox',
  props: {
    value: { type: String, default: '' },
    max: { type: Number, default: undefined },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      model: ''
    }
  },
  computed: {
    charLength () {
      return this.model.length
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
  &.error{
    textarea{ .-a(#fd3d63); }
  }
  textarea{ .wh(100%); .p(24); .fs(16,24); .c(@title-black); .-a(#d9d9d9); .br(5); resize: none; transition: border 0.2s;
    &:focus{ .-a(@strong-purple); }
    &::placeholder{ .c(#ccc); }
  }
}
</style>
