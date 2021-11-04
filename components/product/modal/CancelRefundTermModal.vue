<template>
  <modal cancel-refund-term-modal @close="close" @resolve="resolve">
    <template #title>
      취소 및 환불 규정 보기
    </template>
    <ul class="term-context">
      <li>
        <i>01.</i>
        작업 시작 전 100% 환불 가능합니다.
        <span>(작업 시작 후에도 결과물이 완성되지 않았을 경우에는 100% 환불 가능합니다.)</span>
      </li>
      <li>
        <i>02.</i>
        판매자의 사정으로 작업이 당초 약속했던 일자보다 지연되거나 그에 상응하는 사안이 발생하였을 경우 진행한 작업 건수 또는 작업 노출 일수를 계산하여 제외한 금액을 환불 가능합니다.<br>
        (1) 작업 건수 환불금액 = 결제금액 - (진행한 작업 건수 × 건단가)<br>
        (2) 작업 노출 기간 환불금액 = 결제금액 ÷ 30일 × 작업 노출되지 않은 일수<br>
      </li>
      <li>
        <i>03.</i>
        협의기간, 작업 기간, 광고기간에 따른 환불 규정<br>
        (1)  전문가가 작업을 시작하기 전, 의뢰인과 작업 일정 및 가능 여부를
        논의하는 '협의기간'에는 100% 환불 가능합니다.<br>
        (2) 사전 협의된 광고기간(노출 기간)에는 작업건수/노출기간에 따라 환불
        금액이 산출됩니다.<br>
        <span>(단, 의뢰인의 과실이나 단순 변심, 광고 매체 규제 등으로 인한 불이익은 환불이 불가)</span>
      </li>
      <li><i>04.</i>컨설팅·노하우 강의 및 자료, 솔루션 등 서비스 상품을 받은 이후에는 환불이 불가합니다.</li>
      <li><i>05.</i>이메일 · 메시지 (솔루션 포함) 발송 이후에는 환불이 불가합니다.</li>
    </ul>
    <cl-button type="purple" @click="resolve">
      확인
    </cl-button>
  </modal>
</template>

<script>
import Modal from '@/components/common/modal/Modal'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'CancelRefundTermModal',
  components: { Modal, ClButton },
  methods: {
    close () {
      this.$emit('close')
    },
    resolve () {
      this.$emit('resolve')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[cancel-refund-term-modal]{
  &[modal]{
    .panel{
      .contents{ .pl(40); .pr(40);
        .term-context{
          >li{ .rel; .mb(20); .pl(30); .fs(18,28); .c(@gray);
            >i{ .abs; .lt(0,0); .z(1); .fs(16); .c(@strong-purple); .medium; }
            >span{ .block; .fs(16,28); .c(#999999); }
          }
        }
        [cl-button] { .block; .max-w(256); .w(100%); .mh-c; .mt(49);
          >button{ .wh(100%, 60); .fs(20); }
        }
      }
    }
  }
}
</style>
