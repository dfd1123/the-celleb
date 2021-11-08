<template>
  <div charge-complete-page>
    <div class="complete-holder">
      <div class="tit">
        <img src="~/assets/imgs/icon/ico-success-check.svg" alt="success check">
        <h5>캐시충전이 완료되었습니다!</h5>
      </div>
      <div class="charge-card">
        <span class="status">결제완료</span>
        <h4 class="subject">
          캐시충전
        </h4>
        <div class="info">
          <span class="date">결제일 {{ receiptDate }} | {{ payMethod }}</span>
          <b class="price">{{ showChargePrice }}</b>
        </div>
      </div>
      <div class="btn-holder">
        <cl-button type="purple" @click="goChargeHistory">
          충전내역 보기
        </cl-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { numberFormat } from '@/utils/numberUtils'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'ChargeComplete',
  components: { ClButton },
  computed: {
    showChargePrice () {
      return this.$route.query.price ? numberFormat(this.$route.query.price) + ' 원' : ''
    },
    payMethod () {
      return this.$route.query.payMethod || '신용카드'
    },
    receiptDate () {
      return moment().format('YY.MM.DD HH:mm')
    }
  },
  methods: {
    goChargeHistory () {
      this.$router.push('/mypage/cash')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[charge-complete-page]{
  .complete-holder{ .w(614); .mh-c; .pt(132.4); .pb(220);
    .tit{ .tc;
      h5{ .mt(18.6); .mb(34); .fs(30,36); .c(@title-black); .medium; }
    }
    .charge-card{ .p(36,40,48); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      .status { .ib; .h(31); .p(0,10); .fs(15,31); .c(@purple); .br(5); .-a(@purple); }
      .subject { .mt(13); .fs(24,29); .c(@title-black); .medium; }
      .info { .crop;
        .date { .fl; .block; .fs(15,31); .c(#aaa); }
        .price { .fr; .fs(24,31); .c(@purple); .semi-bold; }
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
