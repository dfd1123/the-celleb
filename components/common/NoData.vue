<template>
  <div no-data>
    <img :src="image" alt="no-data">
    <p class="main-msg" v-html="mainMsg" />
    <p class="sub-msg" v-html="subMsg" />
  </div>
</template>

<script>
import nodataDefaultImg from '@/assets/imgs/icon/ico-no-data-default.svg'

export default {
  name: 'NoData',
  props: {
    image: { type: String, default: nodataDefaultImg },
    mainMsg: { type: String, default: '' },
    subMsg: { type: String, default: '' }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[no-data]{ .p(150, 0); .tc;
  p{
    &.main-msg { .mt(19.5); .mb(19); .fs(18, 21); .c(#555); }
    &.sub-msg { .fs(14, 20); .c(#999); .light; }
  }
}
</style>
