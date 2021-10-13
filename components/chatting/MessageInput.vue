<template>
  <div message-input>
    <div class="input-box">
      <TextInput v-model="text" placeholder="메세지를 입력하세요." @blur="isFocus = false" @focus="isFocus = true" @enter="submit" />
    </div>
    <cl-button type="purple" class="submit-btn" :disabled="!isFocus" @click="submit">
      전송
    </cl-button>
  </div>
</template>

<script>
import TextInput from '@/components/common/input/TextInput'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'MessageInput',
  components: { TextInput, ClButton },
  data () {
    return {
      text: '',
      isFocus: false
    }
  },
  methods: {
    async submit () {
      if (!this.text || !this.isFocus) { return }
      await this.timeoutShield()
      this.$emit('enter', this.text)
      setTimeout(() => {
        this.text = ''
      }, 10)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[message-input] {
  .input-box { .pr(114);
    [text-input] { .h(56); .br(8);
      > input { .p(0, 16); .fs(16); }
    }
  }
  [cl-button] {
    &.submit-btn { .abs; .rt(0, 0); .z(1); .w(104);
      > button { .wh(100%, 56); .fs(20); .br(8); }
    }
  }
}
</style>
