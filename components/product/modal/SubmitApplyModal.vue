<template>
  <modal submit-apply-modal @close="close" @resolve="resolve">
    <template #title>
      서비스 승인 요청
    </template>
    <ul class="apply-caution-li">
      <li>·&nbsp;&nbsp;서비스 등록을 위한 심사가 진행됩니다. 내용을 한번 더 확인해주세요.</li>
      <li>·&nbsp;&nbsp;서비스 등록 심사는 약 5일이 소요됩니다.</li>
      <li>·&nbsp;&nbsp;비승인된 경우, 수정사항을 별도로 안내 드립니다.</li>
      <li>·&nbsp;&nbsp;서비스 편집은 마이메뉴 > 판매 서비스에서 하실 수 있습니다.</li>
    </ul>
    <div class="btn-holder">
      <cl-button type="purple" @click="serviceApply">
        확인
      </cl-button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/common/modal/Modal'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'SubmitApplyModal',
  components: { Modal, ClButton },
  methods: {
    async serviceApply () {
      const result = await this.$confirm({ title: '서비스를 등록하시겠습니까?' })

      if (result) {
        this.resolve()
      }
    },
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

[submit-apply-modal]{ .p(40);
  .panel{ .max-w(609);
    .contents{
      .apply-caution-li{
        li{ .fs(18,30); .c(@gray); }
      }
      [cl-button]{ .block; .max-w(256); .w(100%); .mh-c; .mt(53);
        >button{ .wh(100%, 60); .fs(20); }
      }
    }
  }
}
</style>
