<template>
  <div cl-button :class="[type, {disable}]" @click="onClickHandler">
    <button v-wave="rippleOption" type="button">
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
    disable: { type: Boolean, default: false },
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

      return params
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
    &:hover{ box-shadow: 0 0 0 black; }
  }
  &.line-purple {
    button { .c(@purple); .-a(@purple); .bgc(#FFFFFF);
    }
  }
  &.line {
    button { .c(@gray); .-a(#d9d9d9); .bgc(#FFFFFF); }
  }
  &.purple {
    button { .c(#fff); .bgc(@strong-purple);  }
  }
}
</style>
