<template>
  <div order-buy-controller>
    <h4 class="tit">
      결제 금액
    </h4>
    <div class="price-list-holder">
      <div class="price-li">
        <span class="label">총 서비스 금액</span>
        <span class="value"><b>1,000,000원</b></span>
      </div>
      <div class="price-li">
        <span class="label">쿠폰</span>
        <span class="value">0원</span>
      </div>
      <div class="price-li">
        <span class="label">캐시</span>
        <span class="value">0원</span>
      </div>
    </div>
    <div class="total-price">
      <span class="label">
        총 결제금액
        <small>(VAT 포함)</small>
      </span>
      <span class="value"><b>1,000,000원</b></span>
    </div>
    <cl-button type="purple" class="buy-btn" @click="buyClickHandler">
      구매하기
    </cl-button>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'

export default {
  name: 'OrderBuyController',
  components: { ClButton },
  methods: {
    async buyClickHandler () {
      const result = await this.$confirm({ title: '결제하시겠습니까?', message: '네이버쇼핑라이브 -989,500원' })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[order-buy-controller] { .ib; .sticky; .rt(0, 161); .z(1); .w(348); .mt(24); .ml(30); .p(31, 21, 38); .br(7); .bgc(#FFFFFF); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
  .tit { .mb(15.8); .fs(26, 31); .c(@gray); .medium; }
  .price-list-holder { .p(3, 0); .-t(#EBEBEB); .-b(#EBEBEB);
    .price-li { .crop; .m(23, 0);
      > span { .fs(15, 19);
        &.label { .fl; .c(#AAAAAA); }
        &.value { .fr; .c(@gray);
          > b { .c(@title-black); }
        }
      }
    }
  }
  .total-price { .crop; .mt(29);
    > span { .fs(24); .c(@purple);
      &.label { .fl;
        > small { .block; .mt(5); .fs(13, 16); .c(#AAAAAA); .light; }
      }
      &.value { .fr; }
    }
  }
  .buy-btn {
    > button { .wh(309, 60); .mt(57); .fs(20); }
  }
}

</style>
