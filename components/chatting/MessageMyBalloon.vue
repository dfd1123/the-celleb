<template>
  <div message-my-balloon class="message-card my-card">
    <div class="speech-bubble">
      {{ message }}
      <BalloonInProduct v-if="Boolean(product)" :product="product" />
    </div>
  </div>
</template>

<script>
import BalloonInProduct from '@/components/chatting/BalloonInProduct'

export default {
  name: 'MessageMyBalloon',
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

[message-my-balloon] { .mb(14);.tr;
  + .target-card { .mt(37); }
  .speech-bubble { .ib; .max-w(356); .p(13.5, 20); .fs(16, 19); .br(20); .tl; .c(#FFFFFF); .bgc(#8C55FF); border-top-right-radius: 0; }
}
</style>
