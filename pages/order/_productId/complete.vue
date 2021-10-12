<template>
  <div order-complete-page>
    <div class="complete-holder">
      <div class="tit">
        <img src="~/assets/imgs/icon/ico-success-check.svg" alt="success check">
        <h5>결제가 완료되었습니다!</h5>
      </div>
      <div class="product-card-holder">
        <OrderProductCard />
      </div>
      <div class="btn-holder">
        <cl-button type="purple">
          주문내역 보기
        </cl-button>
      </div>
    </div>
  </div>
</template>

<script>
import OrderProductCard from '@/components/order/OrderProductCard'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'Complete',
  components: { OrderProductCard, ClButton }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[order-complete-page] { .bgc(#fafbff);
  .complete-holder{ .w(843); .mh-c; .pt(132.4); .pb(220);
    .tit{ .tc;
      h5{ .mt(18.6); .mb(34); .fs(30,36); .c(@title-black); .medium; }
    }
    .product-card-holder{ .m(34,0); }
    .btn-holder{ .mt(98);  .mh-c; .tc;
      [cl-button] { .wh(309,60);
        >button { .wh(100%); .fs(20); .c(#fff); }
      }
    }
  }
}
</style>
