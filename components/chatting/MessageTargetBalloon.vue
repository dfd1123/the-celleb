<template>
  <div message-target-balloon class="message-card target-card">
    <div class="speech-bubble">
      {{ message }}
      <BalloonInProduct v-if="Boolean(product)" :product="product" />
    </div>
  </div>
</template>

<script>
import BalloonInProduct from '@/components/chatting/BalloonInProduct'

export default {
  name: 'MessageTargetBalloon',
  components: { BalloonInProduct },
  props: {
    message: {
      type: String,
      default: ''
    },
    product: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[message-target-balloon] { .mb(14);
  + .my-card { .mt(37); }
  .speech-bubble { .ib; .max-w(356); .p(13.5, 20); .fs(16, 19); .br(20); .tr; .c(@title-black); .bgc(#F5F5F5); border-top-left-radius: 0; }
}
</style>
