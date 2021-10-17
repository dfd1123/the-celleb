<template>
  <div coupon-card>
    <div class="top">
      <b class="name">{{ coupon.name }}</b>
      <span class="remain-date">{{ coupon.remainDate }}</span>
    </div>
    <div class="bottom">
      <span class="limit">
        <em>전체 카테고리 사용 가능</em>10,000원 이상 구매시
      </span>
      <span class="end-date">
        {{ coupon.endDate }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponCard',
  props: {
    coupon: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[coupon-card] { .mb(24); .p(67, 40, 64); .bgc(#FFFFFF); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
  .top { .crop; .mb(11);
    .name { .fl; .ib; .vam; .fs(24, 29); .c(@strong-purple); .medium; }
    .remain-date { .fr; .ib; .vam; .fs(18.29); .c(@gray); .medium; }
  }
  .bottom { .crop;
    .limit { .fl; .ib; .vam; .fs(15, 19); .c(#AAAAAA);
      > em { .mr(11); .c(@gray); .medium; }
    }
    .end-date { .fr; .ib; .vam; .fs(15, 19); .c(#AAAAAA); }
  }
}
</style>
