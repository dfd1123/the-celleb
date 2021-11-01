<template>
  <modal influencer-portfolio-submit-modal>
    <div class="step-view">
      <div class="progress">
        <span class="bar" />
      </div>
      <ul>
        <li>전문가 소개</li>
        <li>전문 분야</li>
        <li>경력 사항</li>
      </ul>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/common/modal/Modal'

export default {
  name: 'InfluencerProfileSubmitModal',
  components: { Modal }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

</style>
