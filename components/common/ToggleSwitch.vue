<template>
  <label toggle-switch :class="{'active': model}">
    <input v-model="model" type="checkbox" @change="update">
    <span class="slide" />
  </label>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      model: false
    }
  },
  watch: {
    value: 'updateModel'
  },
  mounted () {
    this.updateModel()
  },
  methods: {
    updateModel () {
      this.model = this.value
    },
    update () {
      this.$emit('input', this.model)
      this.$emit('change', this.model)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[toggle-switch]{ .rel; .ib; .vam; .wh(46,27); .bgc(#e5e5e5); .br(36); .pointer; transition: all 0.2s;
  &.active{ .bgc(@strong-purple); }
  .slide{ .cnt; .abs; .lt(0,0); .z(1); .wh(25); .m(1); .br(50%); .bgc(#fff); box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2); transform:translateX(0%); transition: transform 0.2s; }
  >input[type=checkbox]{ .hide;
    &:checked{
      ~ .slide { transform:translateX(75%); }
    }
  }
}
</style>
