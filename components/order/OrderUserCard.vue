<template>
  <div order-user-card @click="$emit('click')">
    <div class="main-info">
      <div class="user-profile">
        <Avatar :src="item.buyer_image" />
        <span class="nickname">{{ item.buyer_name }}</span>
      </div>
      <div class="product-info">
        <div class="order-info">
          <em :class="['status', item.status]">{{ statusTag }}</em>
          <span class="order-no">주문번호 {{ item.order_no }}</span>
        </div>
        <h6 class="name">
          {{ item.title || '-' }}
        </h6>
        <p class="description">
          {{ item.simple_intro }}
        </p>
        <div class="detail-info">
          <span class="receipt-price-date">발송 예정일 {{ maybeCompleteDate }}</span>
          <span v-if="payMethod" class="paymethod">결제방법 : {{ item.payMethod }}</span>
        </div>
        <div class="sub-info">
          <span v-if="tradingStatement" class="trading-state">거래명세서</span>
          <span v-if="slipOut" class="trading-state">전표출력</span>
          <!--          <span class="option-name">네이버쇼핑라이브 30일 <small>(1개)</small></span>-->
          <b class="price">{{ commaPrice }} 원</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Avatar from '@/components/common/Avatar'
import { numberFormat } from '@/utils/numberUtils'

export default {
  name: 'OrderUserCard',
  components: { Avatar },
  props: {
    item: { type: Object, default: () => ({}) },
    tradingStatement: { type: Boolean, default: false },
    slipOut: { type: Boolean, default: false },
    payMethod: { type: Boolean, default: false },
    status: { type: String, default: '' }
  },
  computed: {
    statusTag () {
      if (this.item.status === 'remain_req') {
        return '요청사항 미작성'
      } else if (this.item.status === 'ing') {
        return '진행중'
      } else if (this.item.status === 'edit_req') {
        return '수정요청'
      } else if (this.item.status === 'shipping') {
        return '발송중'
      } else if (this.item.status === 'complete') {
        return '주문완료'
      } else if (this.item.status === 'un_review') {
        return '리뷰 미작성'
      } else if (this.item.status === 'cancel') {
        return '주문취소'
      }

      return ''
    },
    maybeCompleteDate () {
      return moment(this.item.maybe_complete_date).format('YY.MM.DD HH:mm')
    },
    commaPrice () {
      return numberFormat(this.item.price)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[order-user-card]{ .mb(29); .p(38, 40, 28); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
  .main-info{ .rel; .pl(200);
    .user-profile { .abs; .lt(0,0); .z(1); .wh(110); .m(0, 19);
      [avatar]{ .wh(100%); }
      .nickname { .block; .mt(13); .fs(16,19); .c(@gray); .tc; }
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
