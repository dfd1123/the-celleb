<template>
  <div integer-select :class="[theme, {disabled, error, 'hide-controller': !controller}]">
    <button
      class="minus-btn"
      :disabled="min === number || disabled"
      @click="decrease"
      @mousedown.left="longPress(false)"
      @mouseup="longPressCancel"
    >
      <img :src="minusIcon" alt="minus">
    </button>
    <input v-model="number" :type="write ? 'text' : 'number'" class="no-drag" :readonly="!write" :disabled="disabled">
    <button
      class="plus-btn"
      :disabled="max === number || disabled"
      @click="increase"
      @mousedown.left="longPress(true)"
      @mouseup="longPressCancel"
    >
      <img :src="plusIcon" alt="plus">
    </button>
  </div>
</template>

<script>
import minusIcon from '@/assets/imgs/icon/ico-sm-minus.svg'
import plusIcon from '@/assets/imgs/icon/ico-sm-plus.svg'

export default {
  name: 'IntegerSelect',
  props: {
    value: { type: [Number, String], default: null },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100000000000 },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    theme: { type: String, default: 'white' },
    delay: { type: Number, default: 0 },
    write: { type: Boolean, default: true },
    controller: { type: Boolean, default: true }
  },
  data () {
    return {
      minusIcon,
      plusIcon,
      intervalId: -1,
      intervalTime: 300,
      number: 1
    }
  },
  watch: {
    value: 'updateNumber',
    min: 'updateNumber',
    max: 'updateNumber',
    number: 'update'
  },
  mounted () {
    this.updateNumber()
  },
  methods: {
    async increase () {
      // by eddie
      if (this.delay) { await this.timeoutShield() }
      if (this.number < this.max) { this.number++ }
    },
    async decrease () {
      // by eddie
      if (this.delay) { await this.timeoutShield() }
      if (this.number > this.min) { this.number-- }
    },
    longPress (plus = true) {
      this.intervalId = setInterval(() => {
        plus ? this.increase() : this.decrease()
        clearInterval(this.intervalId)
        if (this.intervalTime > 50) { this.intervalTime -= 25 }
        this.longPress(plus)
      }, this.intervalTime)
    },
    longPressCancel () {
      this.interverTime = 300
      clearInterval(this.intervalId)
    },
    async updateNumber () {
      if (this.delay) { await this.timeoutShield(1000) }
      this.number = Number(String(this.value || 0).replace(/[^-0-9]/gi, ''))
      if (this.number > this.max) { this.number = this.max }
      if (this.number < this.min) { this.number = this.min }
    },
    update () {
      this.number = Number(String(this.number).replace(/[^-0-9]/gi, ''))
      this.$emit('input', this.number)
    }
  }

}
</script>

<style lang="less">
@import '~@/assets/less/proj.less';

[integer-select] { .rel; .crop; .wh(119,24); .br(0);
  &.hide-controller{ .wh(100%,40); .-a(#d9d9d9); .br(5);
    >button { .hide !important; }
    >input { .p(0, 10); .fs(15); .tl; }
  }
  > button { .abs; .z(1); .wh(24); .fs(10); .c(#CCC); .-a(#dbdbdb);
    &.minus-btn { .block; .lt(0, 0); }
    &.plus-btn { .block; .rt(0, 0); }

    &:not(disabled){
      &:hover { .c(#CCC); .bgc(transparent); }
      &:active { .c(#FFF); .bgc(#777); }
    }
    &:disabled { cursor: not-allowed; }
  }

  >input { .wh(100%); .p(0, 24); .fs(20, 24); .c(#333); .tc; .mh-c;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button { .m(0); -webkit-appearance: none; }
  }

  @media (min-width: 1024px) {
    > button {
      &:hover { .c(#FFF); .bgc(#555); }
    }
  }

}

</style>
