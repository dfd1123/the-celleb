<template>
  <div adver-apply-complete>
    <div class="complete-holder">
      <div class="tit">
        <img src="~/assets/imgs/icon/ico-success-check.svg" alt="success check">
        <h5>광고신청이 완료되었습니다!</h5>
      </div>
      <div class="product-card-holder">
        <div class="product-card">
          <span class="status">결제완료</span>
          <h6 class="name">
            {{ product.name }}광고
          </h6>
          <div class="bt">
            <div class="detail">
              <span class="apply-date">신청일 {{ applyDate }}</span>
              <span class="info">{{ serviceName }} | {{ adRangeDate }}</span>
            </div>
            <b class="price">{{ product.commaPrice }}<i>원</i></b>
          </div>
        </div>
      </div>
      <div class="btn-holder">
        <cl-button type="purple" @click="$router.push('/market/advertisement')">
          광고신청 내역 보기
        </cl-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ClButton from '@/components/common/ClButton'
import { numberFormat } from '@/utils/numberUtils'

export default {
  name: 'AdverApplyComplete',
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
    },
    serviceName () {
      return this.$route.query.service || '-'
    },
    applyDate () {
      return moment().format('YY.MM.DD')
    },
    adRangeDate () {
      const now = Date.now() + Number(this.$route.query.adRange || 0)
      return `${moment().format('YY.MM.DD')} ~ ${moment(now).format('YY.MM.DD')}`
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[adver-apply-complete]{
  .complete-holder{ .w(614); .mh-c; .pt(132.4); .pb(220);
    .tit{ .tc;
      h5{ .mt(18.6); .mb(34); .fs(30,36); .c(@title-black); .medium; }
    }
    .product-card-holder{ .m(34,0);
      .product-card{ .p(36,40,39); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
        .status{ .ib; .mb(13); .p(0, 10); .fs(15, 29); .c(@purple); .-a(@purple); .br(5); }
        .name { .mb(11); .fs(24,29); .c(@title-black); .medium; }
        .bt{ .crop;
          .detail{ .fl;
            >span{ .block; .mb(3); .fs(15,19); .c(#aaa);  }
          }
          .price{ .fr; .block; .mt(20); .fs(24); .c(@purple); .semi-bold; }
        }
      }
    }
    .btn-holder{ .mt(98);  .mh-c; .tc;
      [cl-button] { .wh(309,60);
        >button { .wh(100%); .fs(20); .c(#fff); }
      }
    }
  }
}
</style>
