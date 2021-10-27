<template>
  <div ad-card>
    <span :class="['status', status]">{{ status === 'complete' ? '광고완료':'광고중' }}</span>
    <div class="ad-info">
      <span class="date">광고 기간 20/07/28 ~ 20/08/04</span>
      <h6 class="name">
        플러스 광고 1주
      </h6>
      <div class="description-holder">
        <p class="description">
          공동구매를 빠르고 효율적으로 도와드립니다.
        </p>
        <a href="#" class="re-purchase">재구매하기</a>
      </div>
      <div class="price-info">
        <div class="payment">
          <span>
            결제금액 : 99,000원
          </span>
          <span>
            결제방식 : 카드
            <a href="#">전표출력</a>
          </span>
        </div>
        <b class="price">50,000<i>원</i></b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdCard',
  props: {
    status: { type: String, default: 'complete' }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[ad-card]{ .rel; .p(40); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
  .status { .abs; .lt(40, 40); .z(1); .ib; .min-w(72); .h(31); .fs(16,31); .c(#fff); .tc; .br(5); .bgc(#aaa);
    &.ing{ .bgc(#8c55ff); }
  }
  .ad-info{ .pl(102);
    .date{ .block; .fs(15,19); .c(#999); }
    .name { .mt(7); .mb(25); .fs(24,29); .c(@title-black); .medium; }
    .description-holder{ .rel; .pb(20); .pr(80); .mb(25); .-b(#ebebeb);
      .description { .ellipsis(1); .fs(18); .c(@gray); }
      .re-purchase{ .abs; .rt(0,0); .z(1); .fs(16,19); .c(#c4c4c4); text-decoration: underline; }
    }
    .price-info{ .crop;
      .payment { .fl; .ib; .p(7,15); .bgc(#f1f1f1); .br(5);
        >span{ .fs(16); .c(#888);
          >a { .ml(4); .c(#5d12fa); text-decoration: underline;}
          &::after{ .cnt; .ib; .wh(1,10); .m(0, 8); .bgc(#888); }
          &:last-child {
            &::after{ .hide; }
          }
        }
      }
      .price { .fr; .fs(28); .c(@gray); .semi-bold;
        >i{ .ml(3); .fs(24); }
      }
    }
  }
}
</style>
