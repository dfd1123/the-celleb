<template>
  <div order-producr-card>
    <div class="main-info">
      <div class="product-img">
        <img src="~/assets/imgs/sample/product-order-sample.jpg" alt="product-image">
      </div>
      <div class="product-info">
        <div class="order-info">
          <em class="status">주문완료</em>
          <span class="order-no">주문번호 200709522</span>
        </div>
        <h6 class="name">
          더 셀럽
        </h6>
        <p class="description">
          공동구매를 빠르고 효울적으로 도와드립니다.
        </p>
        <span class="receipt-price-date">결제일 21.10.10 12:03</span>
        <div class="sub-info">
          <span class="option-name">네이버쇼핑라이브 30일 <small>(1개)</small></span>
          <b class="price">989,500원</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderProductCard'
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[order-producr-card]{ .mb(29); .p(38, 40, 28); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
  .main-info{ .rel; .pl(229);
    .product-img { .abs; .lt(0,0); .z(1); .wh(191,131);
      >img { .wh(100%); object-position: center; object-fit: cover; }
    }
    .product-info { .min-h(157.3);
      .order-info {
        .status{ .ib; .p(0,10); .fs(15,31); .c(@purple); .vam; .-a(@purple); .br(5); }
        .order-no { .ib; .ml(16); .fs(15,31); .c(#999); .vam; }
      }
      .name{ .mt(17); .mb(10); .fs(24,29); .c(@title-black); .medium; }
      .description { .min-h(44); .fs(18,22); .c(@gray); .regular; .ellipsis(2); }
      .receipt-price-date { .block; .mt(10); .fs(15,19); .c(#aaa); }
      .sub-info { .crop; .mt(23.3); .p(29, 0); .-t(#ebebeb);
        .option-name { .fl; .fs(18, 24); .c(@gray);
          small { .fs(18,24); .c(#999); }
        }
        .price { .fr; .fs(24,24); .c(@purple); .semi-bold; }
      }
    }
  }
}
</style>
