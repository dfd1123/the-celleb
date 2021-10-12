<template>
  <div product-review-wrap>
    <h2 class="sec-tit">
      서비스 평가
    </h2>
    <div class="review-list-holder">
      <div class="total-review-score">
        <b>5.0</b>
        <span>
          <RatingStar :value="5.0" active-color="#f87676" :star-size="16" readonly />
          215개의 후기
        </span>
      </div>
      <ul class="review-list-wrap">
        <ProductReviewItem />
      </ul>
      <cl-button type="line">
        더 많은 평가보기
      </cl-button>
    </div>
  </div>
</template>

<script>
import ProductReviewItem from '@/components/product/view/ProductReviewItem'
import RatingStar from '@/components/common/RatingStar'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'ReviewWrap',
  components: { ProductReviewItem, RatingStar, ClButton }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-review-wrap] {.p(46, 0);
  .review-list-holder {
    .total-review-score { .mb(24); .p(39, 0); .tc; .bgc(#F9F9F9); .-a(#D9D9D9); .br(7);
      > b { .ib; .fs(56); .bold; .vam; }
      > span { .ib; .ml(42); .fs(18); .c(@gray); .vam; }
      [rating-star] { .mb(8); cursor: default;
        .score { .hide; }
        .rating-star-holder > div { .m(0, 1); .p(0, 1); cursor: default; }
      }
    }
    .review-list-wrap { .mt(24); }
    [cl-button] { .w(100%); .mt(38);
      > button { .wh(100%, 64); .fs(18); .c(@gray); }
    }
  }
}

</style>
