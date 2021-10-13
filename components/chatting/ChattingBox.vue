<template>
  <div chatting-box>
    <div class="target-profile">
      <div class="main-info">
        <StoreAvatar />
        <div class="name-rating">
          <b class="name">더 셀럽</b>
          <RatingStar :value="5.0" active-color="#f87676" :star-size="14" readonly />
        </div>
      </div>
      <div class="cs-info">
        <ul>
          <li>
            <span>만족도</span>
            <em>100%</em>
          </li>
          <li>
            <span>평균응답시간</span>
            <em>30분 이내</em>
          </li>
          <li>
            <span>회원 구분</span>
            <em>법인 사업자</em>
          </li>
          <li>
            <span>연락가능시간</span>
            <em>10시 ~ 16시</em>
          </li>
        </ul>
      </div>
    </div>
    <div ref="dialogArea" class="dialog-area">
      <p class="caution">
        5초 마케팅을 통해 결제하셔야 거래 완료시까지 대금을 안전하게 보호받을 수 있습니다.
      </p>
      <component
        :is="message.userId === '1' ? MessageMyBalloon : MessageTargetBalloon"
        v-for="(message, index) in messageList"
        :key="`msg-${index}`"
        :message="message.message"
        :product="message.product"
      />
    </div>
    <div class="dialog-input-area">
      <MessageInput @enter="submitMessage" />
    </div>
  </div>
</template>

<script>
import MessageInput from '@/components/chatting/MessageInput'
import StoreAvatar from '@/components/common/StoreAvatar'
import RatingStar from '@/components/common/RatingStar'

export default {
  name: 'ChattingBox',
  components: {
    StoreAvatar,
    RatingStar,
    MessageInput
  },
  props: {
    chattingId: { type: [Number, String], required: true }
  },
  data () {
    return {
      messageList: [
        {
          userId: '1',
          product: {},
          message: ''
        },
        {
          userId: '1',
          product: null,
          message: '일정 조율 최대한 빠르게 가능하신가요?'
        },
        {
          userId: '2',
          product: null,
          message: '일정 조율 최대한 빠르게 가능하신가요?'
        },
        {
          userId: '2',
          product: {},
          message: ''
        }
      ]
    }
  },
  computed: {
    MessageMyBalloon: () => () => import('@/components/chatting/MessageMyBalloon'),
    MessageTargetBalloon: () => () => import('@/components/chatting/MessageTargetBalloon')
  },
  watch: {
    chattingId () {
      this.messageList = [{
        userId: '1',
        product: {},
        message: ''
      },
      {
        userId: '1',
        product: null,
        message: '일정 조율 최대한 빠르게 가능하신가요?'
      },
      {
        userId: '2',
        product: null,
        message: '일정 조율 최대한 빠르게 가능하신가요?'
      },
      {
        userId: '2',
        product: {},
        message: ''
      }]

      this.dialogScrollToBottom()
    }
  },
  mounted () {
    this.dialogScrollToBottom()
  },
  methods: {
    submitMessage (messageText) {
      this.messageList.push({
        userId: '1',
        product: null,
        message: messageText
      })
      this.dialogScrollToBottom()
    },
    dialogScrollToBottom () {
      this.$nextTick(() => {
        this.$refs.dialogArea.scrollTop = this.$refs.dialogArea.scrollHeight
      })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[chatting-box] { .h(100%); .bgc(#FFFFFF);
  .target-profile { .crop; .p(27.3, 34, 19.3); .-b(#EBEBEB, 2);
    .main-info { .rel; .fl; .h(53); .p(2, 0);
      [store-avatar] { .abs; .lt(0, 0); .z(1); .wh(53); }
      .name-rating { .pl(67);
        .name { .block; .mb(5); .fs(20, 24); .c(@title-black); .medium; }
        [rating-star] { .mb(0); .ml(-2); .vam; cursor: default;
          .score { .hide; }
          .rating-star-holder { .vam;
            > div { .m(0, 1); .p(0, 1); cursor: default; }
          }
        }
      }
    }
    .cs-info { .fr; .w(330);
      > ul { .crop;
        > li { .fl; .w(165); .p(3, 0); .fs(14, 17);
          &:nth-of-type(even) {
            > span { .w(77); }
          }
          > span { .ib; .vam; .w(52); .mr(8); .c(#AAAAAA); }
          > em { .ib; .vam; .c(#555555); }
        }
      }
    }
  }
  .dialog-area { overflow-y: auto; height: calc(100% - 198px); .p(26.3, 40, 20);
    .caution { .mb(75); .fs(15, 19); .c(#999999); .light; .tc; }
  }
  .dialog-input-area { .rel; .m(0, 40); }
}
</style>
