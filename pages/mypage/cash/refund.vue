<template>
  <div cash-refund-page>
    <h2 class="tit">
      캐시환불
    </h2>
    <div class="refund-control-holder">
      <ValidationObserver ref="validator">
        <div>
          <div class="left">
            <div class="inp-box">
              <label>환불 예정 금액 (충전 캐시)</label>
              <ValidationProvider v-slot="{errors}" rules="required" vid="refundPrice" name="refundPrice">
                <TextInput v-model="refundPrice" type="number" :class="{'error': errors.length > 0}" />
                <ValidationErrors :errors="errors" />
              </ValidationProvider>
            </div>
            <div class="inp-box with-drop">
              <label>환불계좌</label>
              <div class="rel-box">
                <ValidationProvider v-slot="{errors}" rules="required" vid="bankName" name="bankName" class="rels">
                  <SelectBox v-model="bankInfo.bankName" :list="bankList" :class="{'error': errors.length > 0}" placeholder="은행" />
                </ValidationProvider>
                <ValidationProvider v-slot="{errors}" rules="required" name="bankAccountNum" class="rels">
                  <TextInput v-model="bankInfo.accountNum" :class="{'error': errors.length > 0}" />
                  <ValidationErrors :errors="errors" />
                </ValidationProvider>
              </div>
            </div>
            <div class="inp-box">
              <label>예금주</label>
              <ValidationProvider v-slot="{errors}" rules="required" name="accountHolder">
                <TextInput v-model="bankInfo.holder" :class="{'error': errors.length > 0}" />
                <ul class="caution">
                  <li>* 환불 신청 시, 영업일 기준 2일 이내에 원결제 수단으로 환불됩니다.</li>
                  <li>* 원결제 수단으로 환불 불가 시, 환불 신청 시 기재하신 계좌로 환불됩니다.</li>
                  <li>* 캐시는 전액 환불만 가능합니다.</li>
                </ul>
                <ValidationErrors :errors="errors" />
              </ValidationProvider>
            </div>
          </div>
          <div class="right">
            <p class="label">
              환불 사유
            </p>
            <ul class="radio-box-list">
              <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="refundReason">
                <li>
                  <RadioBox v-model="refundReason" label="실시간 계좌이체" val="realtimeDeposit" />
                </li>
                <li>
                  <RadioBox v-model="refundReason" label="사이트 이용이 불편함" val="Inconvenience" />
                </li>
                <li>
                  <RadioBox v-model="refundReason" label="구매할 서비스가 없음" val="notbuy" />
                </li>
                <li>
                  <RadioBox v-model="refundReason" label="전문가의 작업 불가능 통보" val="impossible" />
                </li>
                <li>
                  <RadioBox v-model="refundReason" label="불만족스러운 거래경험" val="dissatisfaction" />
                </li>
                <li>
                  <RadioBox v-model="refundReason" label="직접입력" val="direct" />
                </li>
                <ValidationErrors :errors="errors" />
              </ValidationProvider>
              <li v-if="refundReason === 'direct'">
                <ValidationProvider v-slot="{errors}" rules="required" name="환불 사유">
                  <TextInput v-model="refundDirectReason" :class="{'error': errors.length > 0}" />
                  <ValidationErrors :errors="errors" />
                </ValidationProvider>
              </li>
            </ul>
          </div>
        </div>
      </ValidationObserver>
      <cl-button type="purple" @click="refund">
        개인정보 수집 이용 동의 및 환불신청
      </cl-button>
    </div>
  </div>
</template>

<script>
import bankList from '@/constants/bankList'
import SelectBox from '@/components/common/input/SelectBox'
import TextInput from '@/components/common/input/TextInput'
import RadioBox from '@/components/common/input/RadioBox'
import ClButton from '@/components/common/ClButton'
import { numberFormat } from '@/utils/numberUtils'
import ValidationErrors from '@/plugins/validation/components/ValidationErrors'

export default {
  name: 'CashRefundPage',
  components: {
    ValidationErrors,
    TextInput,
    SelectBox,
    RadioBox,
    ClButton
  },
  data () {
    return {
      bankList,
      refundPrice: null,
      refundReason: '',
      refundDirectReason: '',
      bankInfo: {
        bankName: '',
        accountNum: '',
        holder: ''
      }
    }
  },
  methods: {
    async refund () {
      await this.$validate(this.$refs.validator)

      const result = await this.$confirm({
        title: '환불을 신청하시겠습니까?',
        message: `환불 -${numberFormat(this.refundPrice || '0')}원`
      })

      if (result) {
        const { bankName, accountNum, holder } = this.bankInfo
        this.$router.push({ path: '/cash/refund/complete', query: { bankName, accountNum, holder, price: this.refundPrice } })
      }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[cash-refund-page] {
  .tit { .mb(29); .fs(28, 33); .c(@title-black); .semi-bold; }
  .refund-control-holder { .clear; .p(41, 40, 70); .bgc(#FFFFFF); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    > div { .crop; }
    .left { .fl; .w(436);
      .inp-box { .crop; .mb(29);
        > label { .block; .clear; .mb(15); .fs(20, 24); .c(@title-black); }
        [text-input] { .max-w(360); .h(56);
          > input { .p(0, 20); .fs(18, 56); }
        }
        .rel-box{ .rel; .clear;
          .rels{ .clear; .fl; .pb(30);
            [validation-errors]{ .abs; .lb(0, 0); .z(1); }
          }
        }
        .caution { .mt(16);
          li { .fs(15, 24); .c(#999999); }
        }

        &.with-drop {
          [select-box] { .fl; .wh(128, 56); .p(0, 5); .br(5); .-a(#D9D9D9);
            .show-value { .fs(16, 56); }
            > .angle { .t(17);
              svg path { fill: #AAAAAA; }
            }
          }
          [text-input] { .fl; width: calc(360px - 138px); .ml(10); }
        }
      }
    }
    .right { .fl; .w(282); .ml(18);
      .label { .mb(17); .fs(20, 24); .c(@title-black); }
      .radio-box-list {
        li { .mb(23);
          [radio-box] {
            label { .vam;
              > span { .fs(18, 21); .c(@gray); }
            }
          }
        }
      }
    }

    [cl-button] { .w(100%); .mt(75); .tc;
      > button { .max-w(408); .wh(100%, 60); .fs(20); }
    }
  }
}
</style>
