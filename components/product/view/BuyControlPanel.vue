<template>
  <div buy-control-panel>
    <div class="product-info">
      <h1 class="name">
        {{ item.title }}
      </h1>
      <p class="description">
        {{ item.simple_intro }}
      </p>
      <div class="price-info">
        <em>{{ minimumPrice }} 원~</em>
        <span>VAT 포함 가격</span>
      </div>
    </div>
    <div class="detail-product-info">
      <accordion-view v-for="option in options" :key="`detail-prd-${option.id}`" v-model="openProductIndex" name="detail-prd">
        <template #title>
          <b class="name">{{ option.name }}</b>
          <span class="price">1,000,000원</span>
        </template>
        <div>
          <h6 class="title">
            공동구매를 도와드립니다.
            <button>계정 관리</button>
          </h6>
          <ul class="sub-info">
            <li><img src="~/assets/imgs/icon/ico-as.svg" alt="as">AS 보증기간 30일</li>
            <li><img src="~/assets/imgs/icon/ico-calendar.svg" alt="calender">작업일 30일</li>
            <li><img src="~/assets/imgs/icon/ico-setting.svg" alt="setting">수정 횟수 1회</li>
          </ul>
          <cl-button type="purple" class="buy-btn">
            구매하기
          </cl-button>
        </div>
      </accordion-view>
    </div>
    <div class="safe-receipt">
      <p>
        THE CELEBRITY를 통해 결제하면 거래 완료시까지
        결제 대금을 안전하게 보호 받을 수 있습니다.
      </p>
    </div>
  </div>
</template>

<script>
import AccordionView from '@/components/common/AccordionView'
import ClButton from '@/components/common/ClButton'
import { numberFormat } from '~/utils/numberUtils'

export default {
  name: 'BuyControlPanel',
  components: { AccordionView, ClButton },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      openProductIndex: 0
    }
  },
  computed: {
    minimumPrice () { return numberFormat(this.item.minimum_price || 0) },
    options () {
      if (this.item.options) {
        return Object.keys(this.item.options).map(option => ({ ...this.item.options[option], id: option }))
      }
      return []
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[buy-control-panel] {
  .product-info { .mb(51);
    .name { .fs(24, 29); .c(@title-black); .medium; }
    .description { .h(46); .m(15, 0); .fs(18, 23); .c(@gray); .ellipsis(2); }
    .price-info {
      > em { .block; .mb(9); .p(0, 15); .fs(38); .c(black); .bold; }
      > span { .fs(18, 21); .c(#888888); }
    }
  }
  .detail-product-info { .crop; .mb(24); .-a(#D9D9D9); .br(7);
    [accordion-view] { .-b(#D9D9D9);
      &:last-child { .-b; }
      &.open {
        .view-wrapper {
          > label { .bgc(#F9F9F9); }
        }
      }
      .view-wrapper {
        > label { .crop; .p(22, 32); .bgc(#FFFFFF); .-b; .no-drag;
          > .name { .fl; .fs(18, 21); .c(@title-black); .bold; }
          > .price { .fr; .fs(18, 21); .c(@purple); .bold; }
        }
        .context {
          .context-box { .p(30, 32, 41); .bgc(#FFFFFF); .-b;
            .title { .mb(15); .fs(20, 24); .c(@gray);
              > button { .ml(6); .fs(16, 24); .c(#888888); vertical-align: top; }
            }
            .sub-info { .crop; .mb(38);
              > li { .fl; width: calc(100% / 3); .fs(15); .c(#888888); .tc;
                &:first-child {
                  > img { .mt(-4); }
                }
                > img { .vam; .mt(-2); .mr(8); }
              }
            }

            [cl-button] {
              &.buy-btn { .w(100%);
                > button { .wh(100%, 60); .fs(20); .medium; }
              }
            }
          }
        }
      }
    }
  }
  .safe-receipt { .m(24, 0); .p(25, 37); .bgc(#F9F9F9); .-a(#D9D9D9); .br(5);
    > p { .pl(62); .fs(16, 22.5); .c(@gray); .contain('~assets/imgs/icon/ico-defecse.svg'); .bg-x(0); .bg-y(50%); }
  }
}

</style>
