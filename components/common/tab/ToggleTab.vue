<template>
  <div toggle-tab :class="['tab', {disabled}]">
    <button v-for="(tab, index) in tabs" :key="'tab-' + index" :class="{'on': value === index}" :disabled="disabled" @click="changeTab(index)">
      {{ tab }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ToggleTab',
  props: {
    tabs: { type: Array, default: () => [] },
    value: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    changeTab (index) {
      this.$emit('input', index)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[toggle-tab]{

}
</style>
