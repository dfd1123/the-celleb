<template>
  <modal portfolio-info-submit-modal close-btn @close="close" @resolve="resolve">
    <template #title>
      포트폴리오 {{ isEdit ? '수정':'등록' }}
    </template>
    <ValidationObserver ref="validator">
      <div class="form-holder">
        <div class="title">
          <ValidationProvider v-slot="{errors}" rules="required" name="포트폴리오 제목">
            <span class="label">포트폴리오 제목</span>
            <div class="inp-box">
              <TextInput v-model="title" :class="{'error': errors.length > 0}" />
              <ValidationErrors :errors="errors" />
            </div>
          </ValidationProvider>
        </div>
        <div class="half-inp">
          <div class="inp-box">
            <ValidationProvider v-slot="{errors}" rules="required" name="서비스">
              <span class="label">서비스 선택</span>
              <SelectBox v-model="service" :list="serviceList" :class="{'error': errors.length > 0}" placeholder="선택해주세요" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
          <div class="inp-box">
            <ValidationProvider v-slot="{errors}" rules="required" name="업종">
              <span class="label">포트폴리오 관련 업종</span>
              <SelectBox v-model="sector" :list="purposeList" :class="{'error': errors.length > 0}" placeholder="선택해주세요" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
        </div>
        <div class="inp-box">
          <ValidationProvider v-slot="{errors}" rules="required" name="설명">
            <span class="label">포트폴리오 설명</span>
            <TextAreaBox v-model="description" :class="{'error': errors.length > 0}" />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="image-upload">
          <div class="inp-box">
            <span class="label">메인 이미지</span>
            <ImageUploader v-model="mainImage" class="main" />
          </div>
          <div class="inp-box">
            <span class="label">상세 이미지</span>
            <ImageUploader v-model="detailImage" class="detail" :max="3" fix />
          </div>
        </div>
        <div class="caution">
          이미지 가이드라인<br>
          * 메인 이미지: 500*500px (1:1 비율)<br>
          * 상세이미지: 500*(y)px (세로 제한 없음)<br>
          * 저작권법(97조6항)의거 무단 복제, 도용된 이미지, 광고/홍보성 텍스트 및 개인 연락처가 포함된<br>
          이미지, 선정적이거나 혐오, 엽기적인 이미지, 해상도가 낮은 이미지는 승인이 거절될 수 있습니다.<br>
          * 승인이 완료된 상태라도 추후 도용, 표절 등의 신고가 접수될 경우 포트폴리오가 임의로 삭제 처리될 수 있습니다.
        </div>
      </div>
    </ValidationObserver>
    <div class="btn-holder">
      <cl-button type="line-purple" @click="tempStore">
        임시저장
      </cl-button>
      <cl-button type="purple" @click="submit">
        {{ isEdit ? '수정하기':'등록하기' }}
      </cl-button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/common/modal/Modal'
import TextInput from '@/components/common/input/TextInput'
import SelectBox from '@/components/common/input/SelectBox'
import TextAreaBox from '@/components/common/input/TextAreaBox'
import ImageUploader from '@/components/common/input/ImageUploader'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'PortfolioInfoSubmitModal',
  components: { Modal, TextInput, SelectBox, TextAreaBox, ImageUploader, ClButton },
  props: {
    options: {
      type: Object,
      default: () => ({
        portfolio: null
      })
    }
  },
  data () {
    return {
      title: '',
      service: '',
      sector: '',
      description: '',
      mainImage: null,
      detailImage: [],
      serviceList: [{ label: '인스타그램', value: 'instagram' }, { label: '유튜브', value: 'youtube' }, { label: '네이버 블로그', value: 'blog' }, { label: '네이버 카페', value: 'cafe' }, { label: '틱톡', value: 'tiktok' }, { label: '라이브커머스', value: 'liveCommerce' }],
      purposeList: [
        { label: '공동구매', value: 'groupBuy' },
        { label: '체험단', value: 'experienceGroup' },
        { label: '콘텐츠', value: 'contents' },
        { label: '홍보', value: 'marketing' }
      ]
    }
  },
  computed: {
    isEdit () {
      return Boolean(this.options.portfolio !== null)
    }
  },
  methods: {
    initData () {
      this.title = this.options.portfolio.title
    },
    async submit () {
      const validate = await this.validation()

      if (!validate) { return false }

      this.$toast('포트폴리오를 등록했습니다. 심사 후 노출되어집니다.', { type: 'success' })
      this.resolve()
    },
    async tempStore () {
      const validate = await this.validation()

      if (!validate) { return false }

      this.$toast('작성하신 정보를 임시로 저장하였습니다.', { type: 'success' })
    },
    async validation () {
      await this.$validate(this.$refs.validator)

      if (!this.mainImage || !this.detailImage.length) {
        this.$toast('이미지를 모두 등록해주세요.', { type: 'fail' })
        return false
      }

      return true
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

[portfolio-info-submit-modal]{
  &[modal]{
    .panel{ .max-h(100%);
      .contents{}
      .header{}
      .body{ .max-h(80vh); overflow-y: scroll;
        .form-holder{
          [validation-errors] { .mb(0); }
          .inp-box{ .w(100%);
            .label{ .block; .fs(16,48); .c(@title-black); }
          }
          .title{ .crop;
            .label{ .fl; .w(121); .fs(16,48); .c(@title-black); }
            .inp-box{ .fl; width:calc(100% - 121px);
              [text-input]{ .wh(100%,48); }
            }
          }
          .half-inp{ .clear;
            .inp-box{ .fl; width:calc((100% / 2) - 11.5px); .mr(23);
              &:last-child { .mr(0); }
            }
          }
          .image-upload{ .crop;
            .inp-box{ .fl; .w;
              &:last-child { .fr; }
            }
          }
          [select-box]{ .w(100%); .-a(#d9d9d9); .br(5);
            .show-value{ .pl(20); .fs(16); .c(#999); }
            > .angle{
              svg path{ fill:#aaa; }
            }
          }
          [image-uploader]{
            .image-li{ .wh(107); }
            &.main{
              .image-li{ .wh(131); }
            }
          }
          [text-area-box]{ .h(107); }
          .caution{ .mt(24); .fs(12,20); .c(#999); }
        }
        .btn-holder{ .crop; .mt(39);
          [cl-button]{ .fl; width:calc((100% / 2) - 11.5px); .mr(23);
            &:last-child { .mr(0); }
            >button{ .wh(100%,60); .fs(20); }
          }
        }
      }
    }
  }
}
</style>
