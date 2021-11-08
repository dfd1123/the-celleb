<template>
  <div skeleton-product-card>
    <div class="card-holder">
      <div class="prod-img-box" />
      <div class="prod-info-box">
        <h2 class="name" />
        <div class="description" />
      </div>
      <div class="prod-price-box">
        <em class="price" />
        <div class="about-reason">
          <span class="score" />
          <span class="review-cnt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonProductCard'
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[skeleton-product-card] {
  .card-holder { .w(276); }
  .prod-img-box { .h(244); .bgc(#F9F9F9); }
  .prod-info-box { .pt(21); .pb(16);
    .name { .h(25); .mb(7); .fs(20, 24); .c(@black); .medium; .ellipsis; .bgc(#F9F9F9); }
    .description { .h(30); .fs(16, 23); .c(@gray); .ellipsis(2); .bgc(#F9F9F9); }
  }
}
</style>
