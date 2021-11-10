<template>
  <modal adver-purchase-modal close-btn @close="close" @resolve="resolve">
    <template #title>
      {{ product.name }} 광고
    </template>
    <div class="inp-box">
      <SelectBox v-model="service" :list="serviceList" placeholder="서비스 선택" />
    </div>
    <div class="inp-box">
      <SelectBox v-model="adRange" :list="adRangeList" placeholder="광고기간 선택" />
    </div>
    <div class="price-info-holder">
      <div class="left">
        <span class="label">광고금액</span>
        <b>{{ product.commaPrice }}<i>원</i></b>
      </div>
      <div class="right">
        <span class="label">전문가 마일리지</span>
        <div class="inp">
          <TextInput type="number" placeholder="0원" readonly />
          <span class="can-use-point">사용가능: 0원</span>
        </div>
      </div>
    </div>
    <cl-button type="purple" class="purchase-btn" @click="resolve">
      결제하기
    </cl-button>
  </modal>
</template>

<script>
import Modal from '@/components/common/modal/Modal'
import SelectBox from '@/components/common/input/SelectBox'
import TextInput from '@/components/common/input/TextInput'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'AdverPurchaseModal',
  components: { Modal, SelectBox, TextInput, ClButton },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      serviceList: ['인스타그램', '유튜브', '네이버 블로그', '네이버 카페', '틱톡', '라이브커머스'],
      adRangeList: [{ label: '1주일', value: 604800000 }, { label: '2주일', value: 1209600000 }, { label: '1개월', value: 2419200000 }, { label: '2개월', value: 4838400000 }, { label: '4개월', value: 4838400000 }, { label: '8개월', value: 9676800000 }, { label: '1년', value: 29030400000 }],
      service: '',
      adRange: ''
    }
  },
  computed: {
    product () {
      return this.options?.product || {}
    }
  },
  methods: {
    async resolve () {
      const confirm = await this.$confirm({ title: '결제하시겠습니까?', message: `${this.product.name}광고 - ${this.product.commaPrice}원` })

      if (confirm) {
        this.$router.push({ path: '/advertisement/1/complete', query: { type: this.$route.query.type, service: this.service, adRange: this.adRange } })
        this.$emit('resolve')
      }
    },
    close () {
      this.$emit('close')
    }

  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[modal]{
  &[adver-purchase-modal]{
    .panel{ .max-w(488);
      .contents { .p(43,39); }
    }
    .inp-box{ .mb(16);
      [select-box]{ .wh(100%, 48); .-a(#d9d9d9); .br(5);
        .show-value { .pl(16); .fs(16); }
        > .angle { .t(15);
          svg path{ fill:#aaa; }
        }
      }
    }

    .price-info-holder{ .crop; .mb(40); .p(22, 0); .-a(#d9d9d9); .br(5);
      >div{ .fl; .w(50%); .p(4,27);
        .label { .block; .mb(10); .fs(18,21); .c(@gray); }
        &.left {
          >b{ .pl(13); .fs(24,27); .c(@gray);
            >i { .ml(4); .fs(22,27) }
          }
        }
        &.right{ .-l(#ebebeb);
          .label{ .mb(15); }
          .inp{
            [text-input] { .max-w(127);
              >input{ .tr; }
            }
            .can-use-point{ .block; .max-w(127); .mt(6); .fs(14,17); .c(#999); .tr; }
          }
        }
      }
    }
    .purchase-btn{ .wh(100%, 60);
      >button { .wh(100%, 60); .fs(20); }
    }
  }
}
</style>
