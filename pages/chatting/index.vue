<template>
  <div chatting-page>
    <div class="inner-holder">
      <div class="message-box-wrap">
        <MessageBox v-model="chattingId" />
      </div>
      <div class="chatting-box-wrap">
        <ChattingBox v-if="chattingId" :chatting-id="chattingId" />
        <NoData v-else main-msg="대화 상대를 선택하세요." :image="speechBallonIcon" />
      </div>
    </div>
  </div>
</template>

<script>
import speechBallonIcon from '@/assets/imgs/icon/ico-speech-balloon.svg'
import MessageBox from '@/components/chatting/MessageBox'
import ChattingBox from '@/components/chatting/ChattingBox'
import NoData from '@/components/common/NoData'

export default {
  name: 'ChattingPage',
  components: {
    MessageBox,
    ChattingBox,
    NoData
  },
  data () {
    return {
      speechBallonIcon,
      chattingId: ''
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[chatting-page] { .bgc(#FAFBFF);
  .inner-holder { .clear; .p(56, 0, 94);
    .message-box-wrap { .crop; .fl; .wh(338, 802); .bgc(#FFFFFF); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04); }
    .chatting-box-wrap { .crop; .fr; .wh(826, 802); .ml(30); .bgc(#FFFFFF); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      [no-data] { .h(100%);
        p.main-msg{ .c(@gray); }
      }
    }
  }
}
</style>
