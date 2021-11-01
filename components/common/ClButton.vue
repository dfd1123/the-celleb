<template>
  <div cl-button :class="[type, {disabled}]" @click="onClickHandler">
    <button v-wave="rippleOption" type="button" :disabled="disabled">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: 'ClButton',
  props: {
    type: { type: String, default: 'primary' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    rippleColor: { type: String, default: '' },
    rippleOpacity: { type: Number, default: 0.5 },
    rippleDuration: { type: Number, default: 0.4 }
  },
  computed: {
    rippleOption () {
      const params = {}
      if (this.rippleColor) { params.color = this.rippleColor }
      if (this.rippleOpacity) { params.initialOpacity = this.rippleOpacity }
      if (this.rippleDuration) { params.duration = this.rippleDuration }

      return this.disabled ? false : params
    }
  },
  methods: {
    onClickHandler () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[cl-button]{ .ib; .vam;
  button { .min-h(40); .p(0, 10); .tc; .br(5);
    >img{ .vam; }
    &:hover{ box-shadow: 0 0 0 black; }
  }
  &.line-purple {
    button { .c(@purple); .-a(@purple); .bgc(#FFFFFF);
    }
  }
  &.line-gray {
    button { .c(#cccccc); .-a(#aaaaaa); .bgc(#f9f9f9);
    }
  }
  &.line {
    button { .c(@gray); .-a(#d9d9d9); .bgc(#FFFFFF); }
  }
  &.purple {
    button { .c(#fff); .bgc(@strong-purple);
      &:disabled{ .c(#fff); .bgc(#999999); cursor:not-allowed;  }
    }
  }
  &.white{
    button{ .c(#999999); .bgc(#fff); .-a; }
  }
  &.light-gray{
    button{ .c(#fff); .bgc(#ccc); }
  }
  &.gray{
    button{ .c(#888); .bgc(#f1f1f1); }
  }
}
</style>
