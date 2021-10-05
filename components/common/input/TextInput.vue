<template>
  <span text-input :class="[{'focus':focusOn, disabled, error}]">
    <input
      ref="input"
      :class="{ password: type === 'password' }"
      :type="type === 'password' ? '' : type"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :value="t0"
      @input="change"
      @keydown.enter="$emit('enter')"
      @blur="blur"
      @focus="focus"
    >
  </span>
</template>
<script>
export default {
  name: 'TextInput',
  props: {
    value: { default: '' },
    placeholder: { type: String, default: '' },
    number: { type: Boolean, default: false },
    digit: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    maxLength: { type: Number, default: 999 }
  },
  data () {
    return {
      t0: '',
      focusOn: false
    }
  },
  watch: {
    value: 'update'
  },
  mounted () {
    this.update()
  },
  methods: {
    update () {
      this.t0 = this.value
    },
    change (e) {
      if (this.disabled) { return }
      const { value } = e.target
      this.t0 = (() => {
        switch (true) {
          case +this.maxLength > 0:
            return value.slice(0, +this.maxLength)
          case this.digit:
            return value.replace(/[^\d]/gi, '')
          default:
            return value
        }
      })()
      if (this.number) { this.$emit('input', parseInt(this.t0, 10)) } else { this.$emit('input', this.t0) }
    },
    blur () {
      this.focusOn = false
      if (this.number) { this.$emit('blur', parseInt(this.t0, 10)) } else { this.$emit('blur', this.t0) }
    },
    focus () {
      this.focusOn = true
      if (this.number) { this.$emit('focus', parseInt(this.t0, 10)) } else { this.$emit('focus', this.t0) }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj.less';

[text-input] { .block; .-box; .c(@placeholder); .h(48); .br(5); .medium; .crop; .rel; .lh(0); .-a(#d9d9d9);
  .password { -webkit-text-security: disc; }
  input {.fs(16, 48px); .wh(100%); .-a; .bgc(#fff); .p(0, 11); .-box; .c(@title-black); .br(0);
    &::placeholder {.c(@placeholder); .medium;}
  }
  > * {.ib;}
  em {.fs(16, 48px); .h(48); .pl(12);}
  .msg {.fs(9); .c(@placeholder); .tr; .hide; .mt(2); .block;}

  &.error {
    &:after { .bgc(#f90); .t-s(1); }
  }
}
</style>
