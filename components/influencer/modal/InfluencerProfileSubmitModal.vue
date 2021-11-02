<template>
  <modal influencer-profile-submit-modal close-btn @close="close" @resolve="resolve">
    <div :class="['step-view', stepClass]">
      <div class="progress">
        <span class="bar" />
      </div>
      <ul>
        <li>전문가 소개</li>
        <li>전문 분야</li>
        <li>경력 사항</li>
      </ul>
    </div>
    <div class="step-contents-holder">
      <ValidationObserver ref="validator">
        <InfluencerBasicInfo v-if="step === 1" :form="form" />
        <InfluencerSectorInfo v-if="step === 2" :form="form" />
        <InfluencerCareerInfo v-if="step === 3" :form="form" />
      </ValidationObserver>
    </div>
    <div class="btn-holder">
      <cl-button v-if="step > 1" type="line-gray" class="prev-btn" @click="goStep(step - 1)">
        이전으로
      </cl-button>
      <cl-button type="purple" class="next-btn" @click="goStep(step + 1)">
        {{ step === 3 ? '프로필 저장' : '다음으로' }}
      </cl-button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/common/modal/Modal'
import InfluencerBasicInfo from '@/components/influencer/InfluencerBasicInfo'
import InfluencerSectorInfo from '@/components/influencer/InfluencerSectorInfo'
import InfluencerCareerInfo from '@/components/influencer/InfluencerCareerInfo'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'InfluencerProfileSubmitModal',
  components: { Modal, InfluencerBasicInfo, InfluencerSectorInfo, InfluencerCareerInfo, ClButton },
  data () {
    return {
      form: {
        image: null,
        name: '',
        introduce: '',
        specialtySector: '',
        detailSector: [],
        services: [],
        isFree: null,
        careerList: []
      },
      step: 1
    }
  },
  computed: {
    stepClass () {
      if (this.step === 1) {
        return 'one'
      } else if (this.step === 2) {
        return 'two'
      } else if (this.step === 3) {
        return 'three'
      }

      return ''
    }
  },
  methods: {
    async goStep (nextStep) {
      if (nextStep > 3) {
        if (!this.form.careerList.length) {
          this.$toast('경력 사항을 하나 이상 등록해주세요.', { type: 'fail' })
          return false
        }
        this.resolve()
        this.$alert({ title: '프로필 저장 완료', message: '새롭게 저장된 프로필을 확인해보세요!' })
      } else {
        if (this.step < nextStep) {
          await this.$validate(this.$refs.validator)
        }

        this.step = nextStep
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

[influencer-profile-submit-modal]{
  &[modal]{
    .panel{ .max-w(771);
      .header{ .mb(0); }
      .body{
        .step-view{ .w(300); .mb(40);
          .progress{ .rel; .h(8); .br(100); .bgc(#ebebeb);
            .bar{ .abs; .lt(0,0); .z(1); .wh(0,8); .br(100); .bgc(@strong-purple); transition: width 0.2s;
            }
          }
          &.one .progress .bar{ width:calc((100% / 3) * 1); }
          &.two .progress .bar{ width:calc((100% / 3) * 2); }
          &.three .progress .bar{ width:calc((100% / 3) * 3); }
          >ul{ .crop;
            >li{ .fl; width:calc(100% / 3); .mt(12); .fs(15,19); .c(@gray); .tc; transition: color 0.2s;  }
          }
          &.one > ul > li {
            &:nth-child(-n+1){ .c(@strong-purple); }
          }
          &.two > ul > li {
            &:nth-child(-n+2){ .c(@strong-purple); }
          }
          &.three > ul > li {
            &:nth-child(-n+3){ .c(@strong-purple); }
          }
        }
        .step-contents-holder{

        }
        .btn-holder{ .mt(45); .tc;
          [cl-button]{ .w(100%);
            > button { .wh(100%,60); .fs(20); }
            &.prev-btn{ .max-w(162); .mr(10);
              >button { .bgc(#fff); }
            }
            &.next-btn{ .max-w(256); }
          }
        }
      }
    }
  }
}
</style>
