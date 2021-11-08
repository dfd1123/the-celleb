<template>
  <div message-box>
    <SelectBox v-model="selectedCategory" :list="messageCategoryList" variant="message-cate" />
    <ul class="message-list-wrap">
      <MessageItem v-for="i in 1" :key="`chat-${i}`" :active="String(i) === value" @click="chattingItemSelect(String(i))" />
    </ul>
  </div>
</template>

<script>
import SelectBox from '@/components/common/input/SelectBox'
import MessageItem from '@/components/chatting/MessageItem'

export default {
  name: 'MessageBox',
  components: { SelectBox, MessageItem },
  props: {
    value: { type: [String, Number], default: '' }
  },
  data () {
    return {
      messageCategoryList: [
        {
          label: '전체메세지',
          value: 'all'
        },
        {
          label: '안 읽은 메세지',
          value: 'unread'
        },
        {
          label: '즐겨찾기',
          value: 'favorites'
        },
        {
          label: '거래중 메세지',
          value: 'dealing'
        }
      ],
      selectedCategory: ''
    }
  },
  methods: {
    chattingItemSelect (chattingId) {
      this.$emit('input', chattingId)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';
[drop-list] {
  &.message-cate {
    .list-box { .max-h(168); .m(8); .-a !important; .br(7); box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.16);
      li { .p(8.5, 19); .fs(16, 19); .c(@gray); .light;
        &.active { .c(#333333); .semi-bold; text-decoration: underline; }
      }
    }
  }
}

[message-box]{ .bgc(#FFFFFF);
  [select-box] { .min-w(168); .h; .m(20, 15); .-a !important;
    .show-value { flex-wrap:nowrap; .w; .fs(22, 27); .c(@title-black); }
    > .angle { .t(5);
      svg path { fill: @title-black; }
    }
  }
  .message-list-wrap { overflow-y: scroll;

  }
}
</style>
