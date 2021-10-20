<template>
  <div success-toast>
    <img src="~/assets/imgs/icon/ico-toast-success.svg" alt="ico-toast-success">
    <span v-html="toast.message" />
  </div>
</template>

<script>
export default {
  name: 'Success',
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

[success-toast]{ .ib; .m(15,0); .mh-c; .p(15,15); .fs(15); .c(#fff); .bold; .tc; .bgc(#12d5a3); .br(50);
  >img { .ib; .vam; .wh(20); .mr(5); }
  span { .ib; .vam; }
}
</style>
