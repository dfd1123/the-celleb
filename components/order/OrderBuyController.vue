<template>
  <div order-buy-controller>
    <h4 class="tit">
      결제 금액
    </h4>
    <div class="price-list-holder">
      <div class="price-li">
        <span class="label">총 서비스 금액</span>
        <span class="value"><b>{{ commaTotalPrice }}원</b></span>
      </div>
      <div class="price-li">
        <span class="label">쿠폰</span>
        <span class="value">{{ commaCouponPrice }}원</span>
      </div>
      <div class="price-li">
        <span class="label">캐시</span>
        <span class="value">{{ commaCashPrice }}원</span>
      </div>
    </div>
    <div class="total-price">
      <span class="label">
        총 결제금액
        <small>(VAT 포함)</small>
      </span>
      <span class="value"><b>{{ commaReceiptPrice }}원</b></span>
    </div>
    <cl-button type="purple" class="buy-btn" @click="buyClickHandler">
      구매하기
    </cl-button>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'
import { numberFormat } from '@/utils/numberUtils'

export default {
  name: 'OrderBuyController',
  components: { ClButton },
  props: {
    totalPrice: {
      type: Number,
      default: 0
    },
    couponPrice: {
      type: Number,
      default: 0
    },
    cash: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    productId () {
      return this.$route.params.productId || ''
    },
    receiptPrice () {
      return this.totalPrice - this.couponPrice - this.cash
    },
    commaTotalPrice () {
      return numberFormat(this.totalPrice)
    },
    commaCouponPrice () {
      return numberFormat(this.couponPrice)
    },
    commaCashPrice () {
      return numberFormat(this.cash)
    },
    commaReceiptPrice () {
      return numberFormat(this.receiptPrice)
    }
  },
  methods: {
    buyClickHandler () {
      this.$emit('buy', this.receiptPrice)
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
