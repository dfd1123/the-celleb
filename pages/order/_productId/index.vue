<template>
  <div order-page>
    <div class="inner-holder">
      <h2 class="page-tit">
        주문하기
      </h2>
      <div class="order-info-holder">
        <ValidationObserver ref="validator" class="change-order-info">
          <div class="article-box order-card-holder">
            <OrderControlCard v-if="item" :product="item" @change-price="changePrice" />
          </div>
          <div class="article-box coupon-use-holder">
            <h4 class="sub-tit">
              쿠폰 사용
            </h4>
            <div class="inp-list-box">
              <label>사용 가능한 쿠폰</label>
              <SelectBox v-model="selectCoupon" :list="couponList" />
            </div>
            <div class="inp-list-box">
              <label>캐시사용</label>
              <div class="value">
                <IntegerSelect v-model="useCash" :min="0" :max="hasCash" :controller="false" />
                <cl-button type="line-purple" @click="allUseCash">
                  전액사용
                </cl-button>
                <span>보유캐시 : {{ remainCash }}원</span>
              </div>
            </div>
          </div>
          <div class="article-box pay-method-holder">
            <h4 class="sub-tit">
              결제 방법
            </h4>
            <div class="radio-holder">
              <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="결제방법">
                <RadioBox v-model="payMethod" label="신용카드" val="credit-card" />
                <RadioBox v-model="payMethod" label="실시간 계좌이체" val="realtime-bank-transfer" />
                <RadioBox v-model="payMethod" label="무통장입금" val="deposit-without-bank" />
                <RadioBox v-model="payMethod" label="휴대폰" val="phone-bank" />
                <ValidationErrors :errors="errors" />
              </ValidationProvider>
            </div>
          </div>
          <div class="article-box tax-bill-holder">
            <h4 class="sub-tit">
              세금 계산서
            </h4>
            <div v-if="taxBillPossible" class="radio-holder">
              <CheckBox v-model="taxBillApply" label="세금계산서 발행신청" :val="true" />
              <button class="caution-btn">
                안내 주위사항
              </button>
            </div>
            <p v-else class="cant-taxbill">
              개인 전문가이므로 세금계산서 발행이 불가능합니다.<br>
              현금영수증(사업자지출증빙) / 신용카드 매입전표는 매입세액공제 사용이 불가능 합니다.<br>
              현금영수증 / 신용카드 영수증은 개인 소득 공제용으로만 사용하실 수 있습니다.
            </p>
          </div>
        </ValidationObserver>
        <OrderBuyController
          v-if="item"
          :item="item"
          :total-price="totalPrice"
          :coupon-price="selectCoupon ? 10000 : 0"
          :cash="useCash"
          @buy="buyClickHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { numberFormat } from '@/utils/numberUtils'
import OrderControlCard from '@/components/order/OrderControlCard'
import OrderBuyController from '@/components/order/OrderBuyController'
import IntegerSelect from '@/components/common/input/IntegerSelect'
import SelectBox from '@/components/common/input/SelectBox'
import ClButton from '@/components/common/ClButton'
import RadioBox from '@/components/common/input/RadioBox'
import CheckBox from '@/components/common/input/CheckBox'

export default {
  name: 'OrderPage',
  components: {
    IntegerSelect,
    SelectBox,
    ClButton,
    RadioBox,
    CheckBox,
    OrderControlCard,
    OrderBuyController
  },
  data () {
    return {
      couponList: [
        {
          label: '사용안함',
          value: null
        },
        {
          label: '가입 감사 10,000원 할인 <small> (10,000원 이상 구매시, D-30)</small>',
          value: 1
        },
        {
          label: '3주년 이벤트 10,000원 할인쿠폰',
          value: 2
        }
      ],
      selectCoupon: null,
      payMethod: null,
      taxBillApply: false,
      taxBillPossible: true,
      hasCash: 500,
      useCash: 0,
      totalPrice: 0,
      item: null
    }
  },
  computed: {
    remainCash () {
      const hasCash = this.hasCash ?? 0
      const useCash = this.useCash ?? 0
      return numberFormat(hasCash - useCash)
    },
    itemId () {
      return this.$route.params.productId
    },
    option () {
      if (!this.item) { return {} }
      const option = this.item.options[this.$route.query.option] || {}

      return { ...option, commaPrice: numberFormat(option.price) }
    }
  },
  mounted () {
    this.getItemInfo()
  },
  methods: {
    async getItemInfo () {
      this.item = await this.$api.get(`/products/${this.itemId}`)
    },
    allUseCash () {
      this.useCash = this.hasCash
    },
    changePrice (price) {
      this.totalPrice = price
    },
    async buyClickHandler (receiptPrice) {
      await this.$validate(this.$refs.validator)

      const result = await this.$confirm({ title: '결제하시겠습니까?', message: `${this.$route.query.option.toUpperCase()} - ${numberFormat(receiptPrice)}원` })

      if (result) {
        await this.$router.push({
          path: '/order/25/complete',
          query: {
            title: this.item.title,
            simple_intro: this.item.simple_intro,
            image: this.item.images[0],
            amount: this.item.amount,
            option: this.$route.query.option.toUpperCase(),
            totalPrice: receiptPrice
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[order-page] { .bgc(#FAFBFF);
  .page-tit { .pt(84); .pb(39); .fs(28, 33); .c(@black); }
  .order-info-holder { .rel; .clear; .pb(175);
    .change-order-info { .fl; .w(816);
      .article-box{  .m(24, 0); .p(30, 30, 38); .br(7); .bgc(#FFFFFF); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
        .sub-tit { .mb(33); .fs(26,31); .c(@gray); .medium; }
      }
      .coupon-use-holder{ .pt(37);
        .inp-list-box { .mb(21);
          > label { .ib; .w(150); .fs(18, 40); .vat; }
          [select-box] { .ib; .wh(402,40); .-a(#d9d9d9); .br(5); .vam;
            > input { .pl(16); .fs(15); }
            > .angle { .t(9);
              svg {
                path { fill:#aaa; }
              }
            }
          }
          .value{ .ib; .vam;
            [integer-select] { .ib; .vat; .wh(198,40); .mt(0); .-a(#d9d9d9); .br(5); }
            [cl-button] {
              >button{ .wh(91,40); .fs(16); }
            }
            >span { .block; .mt(10); .fs(15,19); .c(#999); }
          }
        }
      }
      .pay-method-holder { .pt(37); .pb(43);
        .radio-holder {
          [radio-box] { .mr(45); }
        }
      }
      .tax-bill-holder {
        .radio-holder {
          .caution-btn { .fs(13); .c(#aaa); text-decoration: underline; vertical-align: bottom; }
        }
        .cant-taxbill{ .max-w(515); .fs(15,24); .c(#aaa); .regular; }
      }
    }
    [order-buy-controller] { .fr; }
  }
}
</style>
