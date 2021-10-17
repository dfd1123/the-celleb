<template>
  <div cash-history-page>
    <h2 class="tit">
      캐시내역
    </h2>
    <div class="cash-box">
      <ul>
        <li>
          <span>보유중인 캐시 <b>5,000</b>원</span>
        </li>
        <li>
          <span>적립캐시 <b>0</b>원</span>
        </li>
        <li>
          <span>충전캐시 <b>0</b>원</span>
        </li>
      </ul>
    </div>
    <div class="btns-bolder">
      <cl-button type="purple" @click="goCharge">
        충전하기
      </cl-button>
      <cl-button type="line-gray" @click="goRefund">
        환불하기
      </cl-button>
    </div>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'

export default {
  name: 'CashHistory',
  components: { ClButton },
  methods: {
    goCharge () {
      this.$router.push('/mypage/cash/charge')
    },
    goRefund () {
      this.$router.push('/mypage/cash/refund')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[cash-history-page]{
  .tit{ .mb(29); .fs(28,33); .c(@title-black); .semi-bold; }
  .cash-box { .mt(39); .mb(30); .p(30); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    >ul{ .crop;
      >li{ .fl; width:calc(100% / 3); .tc;
        &:first-child{ .tl;
          span{
            >b{ .c(@title-black); }
          }
        }
        span{ .fs(18,24); .c(#999); .vam;
          >b{ .m(0,12); .fs(24,24); .semi-bold; vertical-align: text-top; }
        }
      }
    }
  }
  .btns-bolder{ .mt(30); .tr;
    [cl-button]{ .ml(14);
      >button{ .wh(160,60); .fs(20); }
    }
  }
}
</style>
