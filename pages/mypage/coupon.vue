<template>
  <div mypage-coupon-page>
    <h2 class="tit">
      쿠폰
    </h2>
    <div class="coupon-register-holder">
      <label>
        쿠폰코드 입력하기
      </label>
      <div class="inp-box">
        <div>
          <ValidationObserver ref="validator">
            <ValidationProvider rules="required" name="email">
              <TextInput v-model="couponCode" placeholder="영문 대소문자를 구분하여 쿠폰코드를 입력하세요." @enter="addCoupon" />
            </ValidationProvider>
          </ValidationObserver>
        </div>
        <cl-button type="purple" @click="addCoupon">
          쿠폰등록
        </cl-button>
      </div>
    </div>
    <div class="coupon-list-holder">
      <p class="subject">
        사용 가능쿠폰 (2개)
      </p>
      <div v-if="couponList.length" class="coupon-list">
        <CouponCard v-for="(coupon, index) in couponList" :key="`coupon-card-${index}`" :coupon="coupon" />
      </div>
      <NoData v-else main-msg="사용 가능한 쿠폰이 없습니다." />
    </div>
    <div class="caution-list">
      <p>
        <img src="~/assets/imgs/icon/ico-caution.svg" alt="caution">
        꼭 확인해주세요!
      </p>
      <ul>
        <li>충전캐시는 최대 200만원까지 보유할 수 있습니다.</li>
        <li>신용카드로 결제할 경우, 각 카드사마다 결제한도가 제한됩니다(최대 월 100만원)</li>
        <li>충전캐시의 유효기간은 충전일로부터 5년이며, 보너스 적립캐시의 유효기간은 4개월입니다.</li>
        <li>서비스 구매 시 유효기간 만료일이 가까운 순서대로 사용되나, 보너스 적립캐시의 경우 충전캐시가 모두 소진된 이후 사용됩니다.</li>
        <li>충전캐시는 상품/서비스 구매를 위하여  사전에 일정 금액을 예치하는 것이므로 세금계산서 발행 대상이 아닙니다.</li>
        <li>충전캐시를 사용하여 상품/서비스를 구매하실 때 결제 금액에 대한 세금계산서 신청이 가능합니다. (개인전문가는 발행 불가)</li>
        <li>충전캐시의 영수증(신용카드 전표/현금영수증)은 개인 소득공제용으로만 사용하실 수 있습니다.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'
import TextInput from '@/components/common/input/TextInput'
import CouponCard from '@/components/coupon/CouponCard'
import NoData from '@/components/common/NoData'

export default {
  name: 'MypageCouponPage',
  components: { ClButton, TextInput, CouponCard, NoData },
  data () {
    return {
      couponCode: '',
      preCouponList: [
        {
          id: '더셀럽대박',
          name: '더 셀럽 대박 기원 이벤트 쿠폰',
          remainDate: '25일 남음',
          endDate: '2020.10.04 18:33까지'
        }
      ],
      couponList: [
        {
          name: '두번째 구매 감사 10,000원 할인',
          remainDate: '25일 남음',
          endDate: '2020.08.04 18:33까지'
        },
        {
          name: '두번째 구매 감사 10,000원 할인',
          remainDate: '25일 남음',
          endDate: '2020.08.04 18:33까지'
        }
      ]
    }
  },
  methods: {
    async addCoupon () {
      await this.timeoutShield(1)
      // await this.$validate(this.$refs.validator)
      const addCouponIndex = this.preCouponList.findIndex(coupon => coupon.id === this.couponCode)

      if (addCouponIndex !== -1) {
        this.couponList = [this.preCouponList[addCouponIndex], ...this.couponList]
        this.preCouponList.splice(addCouponIndex, 1)
        this.$toast('쿠폰이 발급되었습니다.', { type: 'success' })
      } else {
        this.$toast('존재하지 않은 쿠폰 아이디 입니다.', { type: 'fail' })
      }

      setTimeout(() => {
        this.couponCode = ''
      }, 10)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[mypage-coupon-page]{
  .tit{ .mb(29); .fs(28,33); .c(@title-black); .semi-bold; }
  .coupon-register-holder{ .mb(47); .p(41,40,44); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    >label{ .block; .mb(25); .fs(20,24); .c(@title-black); }
    .inp-box{ .rel; .pr(148);
      >div{
        [text-input] { .h(56);
          >input { .h(56); .p(0,20); .fs(18,56); }
        }
      }
      [cl-button]{ .abs; .rt(0,0); .z(1);
        >button{ .wh(136,56); .fs(20); }
      }
    }
  }
  .coupon-list-holder{ .mt(47);
    .subject { .mb(19); .fs(20,24); .c(@title-black);  }
    .coupon-list{}
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
  [no-data]{ .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    p.main-msg{ .c(#aaa); }
  }
}
</style>
