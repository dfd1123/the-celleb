<template>
  <li message-item :class="{active}" @click="$emit('click')">
    <div class="contents">
      <StoreAvatar />
      <div class="info">
        <span class="date">12분 전</span>
        <b class="name">더셀럽</b>
        <p class="message">
          안녕하세요. 작업기간은 2주정도 걸릴거 같구요.
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import StoreAvatar from '@/components/common/StoreAvatar'

export default {
  name: 'MessageItem',
  components: { StoreAvatar },
  props: {
    active: { type: Boolean, default: false }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[message-item] { .p(20.7, 20, 24); .bgc(#FFFFFF); .-b(#EBEBEB, 2); .pointer; transition: background-color 0.2s;
  &:hover { .bgc(#FBFBFB); }
  &.active { .bgc(#EBEBEB); }
  .contents { .rel; .pl(67);
    [store-avatar] { .abs; .lt(0, 0); .z(1); .wh(53); }
    .info { .rel; .p(5, 0);
      .name { .block; .mb(5); .pr(20); .fs(16, 19); .c(@title-black); .medium; .ellipsis(1); }
      .message { .fs(15, 19); .ellipsis(1); }
      .date { .abs; .rt(0, 0); .z(1); .fs(12, 19); .c(#CCCCCC); }
    }
  }
}
</style>
