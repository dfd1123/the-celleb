<template>
  <div fail-toast>
    <img src="~/assets/imgs/icon/ico-toast-fail.svg" alt="ico-toast-fail">
    <span v-html="toast.message" />
  </div>
</template>

<script>
export default {
  name: 'Fail',
  props: {
    toast: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[fail-toast]{ .ib; .m(15,0); .mh-c; .p(15,15); .fs(15); .c(#fff); .bold; .tc; .bgc(#e9b718); .br(50);
  >img { .ib; .vam; .wh(20); .mr(5); }
  span { .ib; .vam; }
}
</style>
