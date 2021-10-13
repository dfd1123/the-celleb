<template>
  <MessageMyBalloon v-if="isMy" :message="message.message" :product="message.product" />
  <MessageTargetBalloon v-else :message="message.message" :product="message.product" />
</template>

<script>
import MessageMyBalloon from '@/components/chatting/MessageMyBalloon'
import MessageTargetBalloon from '@/components/chatting/MessageTargetBalloon'

export default {
  name: 'SpeechBalloon',
  components: { MessageMyBalloon, MessageTargetBalloon },
  props: {
    message: { type: Object, required: true }
  },
  computed: {
    myUserId () {
      return '1'
    },
    isMy () {
      return this.myUserId === this.message.userId
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

</style>
