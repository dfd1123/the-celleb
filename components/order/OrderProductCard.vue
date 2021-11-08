<template>
  <div order-producr-card>
    <div class="main-info">
      <div class="product-img">
        <img :src="order.image" alt="product-image">
      </div>
      <div class="product-info">
        <div class="order-info">
          <em class="status">주문완료</em>
          <span class="order-no">주문번호 {{ order.order_no }}</span>
        </div>
        <h6 class="name">
          {{ order.title }}
        </h6>
        <p class="description">
          {{ order.simple_intro }}
        </p>
        <span class="receipt-price-date">결제일 {{ receiptDate }}</span>
        <div class="sub-info">
          <span class="option-name">{{ order.option }} 30일 <small>({{ order.amount }}개)</small></span>
          <b class="price">{{ commaTotalPrice }}원</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { numberFormat } from '@/utils/numberUtils'
export default {
  name: 'OrderProductCard',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    receiptDate () {
      return moment().format('YY.MM.DD HH:mm')
    },
    commaTotalPrice () {
      return numberFormat(this.order.totalPrice)
    }
  }
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
