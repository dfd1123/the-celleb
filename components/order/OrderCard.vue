<template>
  <div order-card @click="$emit('click')">
    <div class="main-info">
      <div class="product-img">
        <img src="~/assets/imgs/sample/product-order-sample.jpg" alt="product-image">
      </div>
      <div class="product-info">
        <div class="order-info">
          <em :class="['status', status]">{{ statusTag }}</em>
          <span class="order-no">주문번호 200709522</span>
        </div>
        <h6 class="name">
          더 셀럽
        </h6>
        <p class="description">
          공동구매를 빠르고 효울적으로 도와드립니다.
        </p>
        <div class="detail-info">
          <span class="receipt-price-date">결제일 21.10.10 12:03</span>
          <span v-if="payMethod" class="paymethod">결제방법 : 신용카드</span>
        </div>
        <div class="sub-info">
          <span v-if="tradingStatement" class="trading-state">거래명세서</span>
          <span v-if="slipOut" class="trading-state">전표출력</span>
          <!--          <span class="option-name">네이버쇼핑라이브 30일 <small>(1개)</small></span>-->
          <b class="price">989,500 원</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderCard',
  props: {
    tradingStatement: { type: Boolean, default: false },
    slipOut: { type: Boolean, default: false },
    payMethod: { type: Boolean, default: false },
    status: { type: String, default: '' }
  },
  computed: {
    statusTag () {
      if (this.status === 'refund-complete') {
        return '환불완료'
      }

      return '주문완료'
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[order-card]{ .mb(29); .p(38, 40, 28); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
  .main-info{ .rel; .pl(229);
    .product-img { .abs; .lt(0,0); .z(1); .wh(191,131);
      >img { .wh(100%); object-position: center; object-fit: cover; }
    }
    .product-info { .min-h(157.3);
      .order-info {
        .status{ .ib; .p(0,10); .fs(15,31); .c(@purple); .vam; .-a(@purple); .br(5);
          &.refund-complete{ .c(#e94c6f); .-a(#e94c6f); }
        }
        .order-no { .ib; .ml(16); .fs(15,31); .c(#999); .vam; }
      }
      .name{ .mt(17); .mb(10); .fs(24,29); .c(@title-black); .medium; }
      .description { .min-h(44); .fs(18,22); .c(@gray); .regular; .ellipsis(2); }
      .detail-info{ .crop;
        .receipt-price-date { .fl; .block; .mt(10); .fs(15,19); .c(#aaa); }
        .paymethod{ .fr; .fs(18,21); .c(@gray); }
      }
      .sub-info { .crop; .mt(23.3); .p(22, 0); .-t(#ebebeb);
        .trading-state{ .ib; .p(0,10); .fs(15, 31); .c(#888); .br(5); .bgc(#f1f1f1); }
        .option-name { .fl; .mr(10); .fs(18, 24); .c(@gray);
          small { .fs(18,31); .c(#999); }
        }
        .price { .fr; .fs(22,31); .c(@gray); .semi-bold; }
      }
    }
  }
}
</style>
