<template>
  <div
    ref="dropSelect"
    select-box
    :class="[`no-drag ${direction}`, { focus, error: error && !Boolean(dropListBox), readonly, disabled, open: Boolean(dropListBox), yet: !value }]"
  >
    <label @click="toggleOpen">
      <input
        type="text"
        :class="['no-drag', variant && `btn-${variant}`]"
        :value="selected && ( selected.label || selected )"
        :placeholder="placeholder"
        readonly="readonly"
        disabled
      >
      <span
        v-if="selected && ( selected.label || selected )"
        class="show-value"
        v-html="selected && ( selected.label || selected )"
      />
      <span v-else-if="placeholder" class="show-value placeholder">{{ placeholder }}</span>
    </label>
    <input :name="name" type="hidden" :value="value">
    <p class="angle">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7.4" viewBox="0 0 12 7.4">
        <path id="_Color" data-name=" ↳Color" d="M10.59,0,6,4.574,1.41,0,0,1.408,6,7.4l6-5.992Z" fill="#8e2ae4" />
      </svg>
    </p>
  </div>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import DropListBox from '@/components/common/input/DropListBox'

export default {
  name: 'SelectBox',
  props: {
    value: { default: null },
    list: { type: Array, default: null },
    split: { type: String, default: null },
    obj: { default: null },
    placeholder: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    useBlank: { type: Boolean, default: false },
    variant: { type: String, default: null },
    artificial: { type: Boolean, default: true },
    direction: { type: String, default: 'down' },
    name: { type: String },
    error: { type: Boolean, default: false },
    theme: { type: String, default: 'white' }
  },
  data () {
    return {
      dropListBox: null,
      selected: null,
      focus: false
    }
  },
  computed: {
    listCreated () {
      let list

      if (this.obj) {
        list = Object.entries(this.obj).map(([key, value]) => ({ label: value, value: key }))
      } else {
        list = this.split ? this.split.split(/[ ]*,[ ]*/) : this.list
      }

      if (this.useBlank && list) {
        list = [...[{ value: null, label: this.placeholder || '-' }], ...list]
      }

      return list
    }
  },
  watch: {
    list: 'update',
    obj: 'update',
    value: 'update'
  },
  mounted () {
    this.eventListenerHandler()
    this.update(true)
  },
  destroyed () {
    this.removeDropList()
    this.eventListenerHandler(true)
  },
  methods: {
    toggleOpen () {
      if (this.disabled) { return }

      if (this.dropListBox) { this.removeDropList() } else { this.createDropList() }
    },
    createDropList () {
      if (this.readonly) { return }
      this.removeDropList()
      this.dropListBox = new (Vue.extend(DropListBox))({
        parent: this.$root,
        propsData: {
          callComponent: this,
          className: this.variant,
          list: this.listCreated,
          value: this.value,
          direction: this.direction,
          theme: this.theme
        }
      }
      ).$mount()

      this.focus = true
    },
    removeDropList () {
      if (!this.dropListBox) { return }

      this.dropListBox.$destroy()
      this.dropListBox = null
      this.focus = false
    },
    clickOutSideHandler (e) {
      const target = e.target

      if (!(this.$el === target || this.$el.contains(target))) {
        this.removeDropList()
      }
    },
    eventListenerHandler (destroy = false) {
      if (destroy) {
        document.body.removeEventListener('click', this.clickOutSideHandler)
        window.removeEventListener('resize', this.removeDropList)
      } else {
        document.body.addEventListener('click', this.clickOutSideHandler)
        window.addEventListener('resize', this.removeDropList)
      }
    },
    change (val) {
      this.removeDropList()
      const v = !val || val.value === undefined ? val : val.value
      if (this.artificial) { this.$emit('select', v) }
      if (this.selected === val || (this.selected && this.selected?.value !== undefined && this.selected?.value === val?.value)) { return }
      this.selected = val
      this.$emit('input', v)
      if (this.artificial) { this.$emit('change', v) }
    },
    update () {
      let val = ''
      const list = this.listCreated

      if (list) {
        val = _.find(list, item => (item.value || item) === this.value)
        if (!val && !this.placeholder) { [val] = list }
      }

      this.change(val)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj.less';

.input-group > .input-group-prepend > [select-box] > .btn { border-top-right-radius: 0; border-bottom-right-radius: 0;}

.input-group > .input-group-append > [select-box] > .btn { border-top-left-radius: 0; border-bottom-left-radius: 0;}

[select-box] { .crop; .ib; .h(50); .-box; cursor: pointer; .rel; .bgc(white); .-a(white); .pointer;
  > .angle { .abs; .rt(10, 13); .z(1);
    svg { .ib; .wh(12); .vam; transition: transform 0.3s;
      path { fill: #8E2AE4; }
    }
  }
  &.focus { .-a(#EBEBF0); }
  &.open {
    &.down { }
    &.up { }
  }
  &.error {
    &::before { .cnt; .abs; .lb(0, 0); .z(2); .w(100%); .-b(#FF9900); }
  }
  // &:hover { background: #666; color: #FFF; .-a(#666); }

  input[type='text'] { .hide !important; .rel; .z(2); .wh(100%); .pl(10); .pr(31); .tl; .fs(14, 50px); .regular; .c(#787781); .ellipsis(1); .bgc(transparent); .pointer;
    &::placeholder { .c(@light-gray); .regular; }
  }

  .show-value { .rel; .z(2); .wh(100%); width:calc(100% - 31px); .pl(10); .pr(31); .tl; .fs(14); .regular; .c(#787781); .ellipsis(1); .bgc(transparent); .pointer; display: flex; .flex-ai;
    &.placeholder { .c(@light-gray); .regular; }
  }

  &.open {
    input[type='text'] { }
    > .angle svg { .t-r(180deg); }
  }
  &.readonly { .bgc(#EEEEEE);
    input[type='text'] { pointer-events: none;cursor: default;}
  }
  &.product {
    input[type='text'] { .fs(14, 34); background: #2A2A2A; color: #FFFFFF; }
  }
}

.requested [select-box].error {
  .-a(#FF0000) !important;
}

</style>
