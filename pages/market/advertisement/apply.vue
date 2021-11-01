<template>
  <div market-advertisement-apply-page>
    <h2 class="tit">
      광고 신청
    </h2>
    <div class="ad-info-holder">
      <div class="intro">
        <h2 class="name">
          {{ product.name }}
        </h2>
        <span class="sub">{{ product.sub }}</span>
        <p class="description" v-html="product.description" />
        <cl-button type="purple" class="ad-apply-btn" @click="adverPurchaseModal">
          {{ product.name }} 광고 신청하기
        </cl-button>
      </div>
      <div class="price">
        <ul>
          <li>
            <span class="label">1주일 광고 비용</span>
            <span class="value">{{ product.commaPrice }}<i>원</i></span>
          </li>
          <li>
            <span class="label">내 마일리지</span>
            <span class="value">0<i>원</i></span>
          </li>
          <li>
            <span class="label">예상 광고비용</span>
            <span class="value">{{ product.commaPrice }}<i>원</i></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="caution-list">
      <p>
        <img src="~/assets/imgs/icon/ico-caution.svg" alt="caution">
        결제 전 안내사항
      </p>
      <ul>
        <li>광고는 인기순, 추천순 정렬 조건에만 적용되며, 그 외 조건에는 적용되지 않습니다.</li>
        <li>광고는 구매 즉시 사용되기 때문에 일시중지 또는 환불이 절대 불가 합니다.</li>
        <li>광고 구매 후 페널티가 부여되어 5초마케팅의 사용이 정지 된 경우, 사이트 내 규정을 위반하여 페널티가 부과된 것이기 때문에 일시중지 또는 환불이 절대 불가합니다.</li>
        <li>이미 광고가 진행 중인 서비스는 다른 서비스로 변경하실 수 없습니다.</li>
        <li>휴가모드 사용 시 또는 서비스 판매중단 시에도 광고를 중단할 수 없으며 기간이 연장되지 않습니다.</li>
        <li>세금계산서는 자동 발행되지 않으며, 매입세액공제가 필요한 경우 카드영수증/현금영수증을 신청해주시기 바랍니다.</li>
        <li>무통장입금 또는 가상계좌로 결제 시, 12시간 내에 결제하지 않으면 자동으로 광고신청이 취소됩니다.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'
import { numberFormat } from '@/utils/numberUtils'
import AdverPurchaseModal from '@/components/market/modal/AdverPurchaseModal'

export default {
  name: 'MarketAdvertisementApplyPage',
  components: { ClButton },
  data () {
    return {
      adProducts: {
        master: {
          name: '마스터',
          sub: '매칭 결과 상단 노출형',
          description: '매칭결과 제일 상단에 노출되는 광고입니다.<br> 확실한 광고 효과를 원하시는 분들께 추천합니다.',
          price: 999000
        },
        premium: {
          name: '프리미엄',
          sub: '매칭 결과 상단 노출형',
          description: '메인페이지 하단에 노출되는 광고입니다. <br>합리적인 비용으로 좋은 효과를 볼 수 있습니다.',
          price: 499000
        },
        plus: {
          name: '플러스',
          sub: '1페이지 상단 고정형',
          description: '업체검색 카테고리 리스트 첫 줄에 노출되는 <br>광고입니다. 가성비 높은 광고상품입니다.',
          price: 299000
        }
      }
    }
  },
  computed: {
    type () {
      return this.$route.query.type || 'master'
    },
    product () {
      const product = this.adProducts[this.type] ?? this.adProducts.master
      product.commaPrice = numberFormat(product.price)

      return product
    }
  },
  methods: {
    adverPurchaseModal () {
      this.$modal(AdverPurchaseModal, { product: this.product })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[market-advertisement-apply-page]{
  .tit{ .mb(29); .fs(28,33); .c(@title-black); .semi-bold; }
  .ad-info-holder{ .clear;
    .intro { .fl; .w(438); .p(40); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      .name{ .fs(32); .c(@title-black); .medium; }
      .sub { .block; .m(7,0); .fs(15, 19); .c(#999); }
      .description { .m(23,0,40); .fs(18,28); .c(@gray); .light; }
      .ad-apply-btn{ .max-w(309); .wh(100%, 60);
        > button { .wh(100%, 60); .fs(20); }
      }
    }
    .price { .fl; .w(348); .ml(30); .p(22,40); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      >ul{
        >li{ .crop; .p(22, 0); .-b(#ebebeb);
          &:last-child { .-b;
            >span{
              &:last-child { .c(@strong-purple); }
            }
          }
          >span{ .c(@gray);
            &:first-child { .fl; .fs(18,24); }
            &:last-child { .fr; .fs(24,24); .semi-bold;
              >i{ .ml(4); .fs(22,24); }
            }
          }
        }
      }
    }
  }
  .caution-list{ .mt(80); .p(40); .br(7); .-a(#d7d1ff); .bgc(rgba(247, 246, 255, 0.7));
    p{ .mb(25); .fs(18,24); .c(@gray); .semi-bold; .vam;
      >img { .ib; .mr(10); .vam; }
    }
    ul{
      li{ .rel; .pl(10); .fs(14,26); .c(@gray);
        &::before{ content:'·'; .abs; .lt(0,0); .z(1); .fs(14,26); .c(@gray); .block; }
      }
    }
  }
}
</style>
