<template>
  <div refund-complete-page>
    <div class="complete-holder">
      <div class="tit">
        <img src="~/assets/imgs/icon/ico-success-check.svg" alt="success check">
        <h5>환불신청이 완료되었습니다!</h5>
      </div>
      <div class="charge-card">
        <span class="status">신청완료</span>
        <h4 class="subject">
          환불신청
        </h4>
        <div class="info">
          <span class="date">신청일 {{ refundDate }}<br>환불계좌 {{ refundBankInfo }}</span>
          <b class="price">{{ commaRefundPrice }} 원</b>
        </div>
      </div>
      <div class="btn-holder">
        <cl-button type="purple" @click="goRefundHistory">
          환불신청 내역 보기
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
  name: 'RefundComplete',
  components: { ClButton },
  computed: {
    refundDate () {
      return moment().format('YY.MM.DD HH.mm')
    },
    refundBankInfo () {
      const { bankName, accountNum, holder } = this.$route.query
      return `${accountNum} (${bankName}, ${holder})`
    },
    commaRefundPrice () {
      return numberFormat(this.$route.query.price || 0)
    }
  },
  methods: {
    goRefundHistory () {
      this.$router.push('/mypage/cash/refund')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[refund-complete-page]{
  .complete-holder{ .w(614); .mh-c; .pt(132.4); .pb(220);
    .tit{ .tc;
      h5{ .mt(18.6); .mb(34); .fs(30,36); .c(@title-black); .medium; }
    }
    .charge-card{ .p(36,40,48); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      .status { .ib; .h(31); .p(0,10); .fs(15,31); .c(#e94c6f); .br(5); .-a(#e94c6f); }
      .subject { .mt(13); .fs(24,29); .c(@title-black); .medium; }
      .info { .crop;
        .date { .fl; .block; .mt(10); .fs(15,22); .c(#aaa); }
        .price { .fr; .mt(20); .fs(24,31); .c(@purple); .semi-bold; }
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
