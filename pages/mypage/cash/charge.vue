<template>
  <div mypage-charge-page>
    <h2 class="tit">
      캐시충전
    </h2>
    <div class="charge-control-holder">
      <div class="charge-price-control">
        <p class="subject">
          충전금액
        </p>
        <TextInput v-model="chargePrice" type="number" placeholder="충전 금액을 입력해주세요. ex) 5000" />
        <div class="charge-add-btn-holder">
          <cl-button type="line-gray" @click="addChargePrice(50000)">
            +5만원
          </cl-button>
          <cl-button type="line-gray" @click="addChargePrice(300000)">
            +30만원
          </cl-button>
          <cl-button type="line-gray" @click="addChargePrice(500000)">
            +50만원
          </cl-button>
          <cl-button type="line-gray" @click="addChargePrice(1000000)">
            +100만원
          </cl-button>
          <cl-button type="line-gray" @click="addChargePrice(1500000)">
            +150만원
          </cl-button>
        </div>
      </div>
      <div class="paymethod-holder">
        <span class="label">결제수단</span>
        <div class="select-area">
          <RadioBox v-model="payMethod" label="신용카드" val="creditCard" />
          <RadioBox v-model="payMethod" label="실시간 계좌이체" val="realTimeDeposit" />
          <RadioBox v-model="payMethod" label="무통장입금" val="noAccountDeposit" />
        </div>
      </div>
      <cl-button type="purple" class="charge-btn" :disabled="!showChargePrice || !payMethod" @click="charge">
        {{ showChargePrice }} 결제하기
      </cl-button>
    </div>
  </div>
</template>

<script>
import { numberFormat } from '@/utils/numberUtils'
import TextInput from '@/components/common/input/TextInput'
import ClButton from '@/components/common/ClButton'
import RadioBox from '@/components/common/input/RadioBox'

export default {
  name: 'MypageChargePage',
  components: { TextInput, ClButton, RadioBox },
  data () {
    return {
      chargePrice: null,
      payMethod: ''
    }
  },
  computed: {
    showChargePrice () {
      return this.chargePrice ? numberFormat(this.chargePrice) + '원' : ''
    }
  },
  methods: {
    addChargePrice (price) {
      this.chargePrice += price
    },
    async charge () {
      const result = await this.$confirm({ title: '결제하시겠습니까?', message: `캐시충전 - ${this.showChargePrice}` })

      if (result) {
        this.$router.push('/cash/charge/complete')
      }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[mypage-charge-page]{
  .tit{ .mb(29); .fs(28,33); .c(@title-black); .semi-bold; }
  .charge-control-holder{ .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .charge-price-control{ .p(41,40,52); .-b(#ebebeb);
      .subject{ .mb(30); .fs(24,29); .c(@title-black); .medium; }
      [text-input] { .h(56); .m(30,0);
        > input { .p(0,29); .fs(22,56); .tr; }
      }
      .charge-add-btn-holder{ .crop;
        [cl-button] { .fl;
          >button{ .wh(133,60); .ml(17); .fs(20); .c(#999); .bgc(#fff); transition: all 0.2s;
            &:hover{ .-a(@strong-purple); .c(@strong-purple); .bgc(#f7f7ff); }
          }
          &:first-child{
            >button{ .ml(0); }
          }
        }
      }
    }
    .paymethod-holder{ .crop; .p(47,40,72);
      .label{ .fl; .w(164); .fs(24,29); .c(@title-black); .medium; }
      .select-area{ .fl; width: calc(100% - 164px);
        [radio-box]{ .fl; width:calc(100% / 3); .tc;
          label {
            &.checkbox { .vam; }
            > span { .fs(20, 29); }
          }
        }
      }
    }
    .charge-btn{ .w(100%); .pb(67); .tc;
      > button { .wh(408,60); .fs(20); }
    }
  }
}
</style>
