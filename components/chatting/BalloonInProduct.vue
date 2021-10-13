<template>
  <div balloon-in-product class="product-card">
    <em class="subject">문의서비스</em>
    <div class="info-box">
      <div class="image">
        <img src="~/assets/imgs/sample/product3.jpg" alt="sample">
      </div>
      <div class="info">
        <span>공동 구매를 빠르고 효율적으로 도와드립니다.</span>
        <b>1,000,000원</b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BalloonInProduct',
  props: {
    product: { type: Object, default: null }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[balloon-in-product] { .pb(11);
  .subject { .block; .mb(14.3); .fs(18, 21); .tl; }
  .info-box { .rel; .min-h(78);
    .image { .abs; .lt(0, 0); .z(1); .wh(113, 78);
      > img { .wh(100%); .vam; object-position: center; object-fit: cover; }
    }
    .info { .pl(123);
      > span { .block; .h(45); .fs(15, 22.5); .ellipsis(2); }
      > b { .block; .mt(13); .fs(18, 18); .bold; }
    }
  }
}
</style>
