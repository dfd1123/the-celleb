<template>
  <div product-create-page>
    <div class="inner-holder">
      <div class="contents-holder">
        <div class="step-view">
          <ul>
            <li v-for="(step, index) in stepList" :key="`step-${index}`" :class="{'active': stepIndex >= index, 'line': stepIndex - 1 >= index}">
              <i class="index">{{ index + 1 }}</i><span class="name">{{ step }}</span>
            </li>
          </ul>
        </div>
        <div class="contents">
          <div class="hd">
            <h2 class="tit">
              서비스 등록
            </h2>
            <div class="control-box">
              <div v-if="stepIndex === 1" class="switch-box">
                <span class="label">
                  패키지로 설정
                </span>
                <ToggleSwitch v-model="isPackage" />
              </div>
              <cl-button type="purple" class="submit-btn" @click="submit">
                제출하기
              </cl-button>
            </div>
          </div>
          <ValidationObserver ref="validator">
            <ProductBasicInfo v-if="stepIndex === 0" :basic-info="basicInfo" />
            <ProductPriceInfo v-else-if="stepIndex === 1" :is-package="isPackage" :price-info="priceInfo" />
            <ProductDescription v-else-if="stepIndex === 2" :description-info="descriptionInfo" />
            <ProductImageInfo v-else-if="stepIndex === 3" :image-info="imageInfo" />
            <ProductRequestInfo v-else-if="stepIndex === 4" />
          </ValidationObserver>
        </div>
        <div class="btn-holder">
          <cl-button type="line-gray" @click="tempStore">
            저장
          </cl-button>
          <cl-button type="line-purple" @click="goStep">
            다음
          </cl-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleSwitch from '@/components/common/ToggleSwitch'
import ClButton from '@/components/common/ClButton'
import ProductBasicInfo from '@/components/product/create/ProductBasicInfo'
import ProductPriceInfo from '@/components/product/create/ProductPriceInfo'
import ProductDescription from '@/components/product/create/ProductDescription'
import ProductImageInfo from '@/components/product/create/ProductImageInfo'
import ProductRequestInfo from '@/components/product/create/ProductRequestInfo'
import SubmitApplyModal from '@/components/product/modal/SubmitApplyModal'

export default {
  name: 'ProductCreatePage',
  components: { ToggleSwitch, ClButton, ProductBasicInfo, ProductPriceInfo, ProductDescription, ProductImageInfo, ProductRequestInfo },
  data () {
    return {
      stepIndex: -1,
      stepList: ['기본정보', '가격설정', '서비스 설정', '이미지', '요청사항'],
      isPackage: true,
      basicInfo: {
        title: '',
        category: '',
        channel: ''
      },
      priceInfo: {
        micro: {
          title: '',
          description: '',
          price: null,
          workDay: null,
          editCnt: null,
          quickWork: {
            addPrice: null,
            workDay: null
          }
        },
        mega: {
          title: '',
          description: '',
          price: null,
          workDay: null,
          editCnt: null,
          quickWork: {
            addPrice: null,
            workDay: null
          }
        },
        star: {
          title: '',
          description: '',
          price: null,
          workDay: null,
          editCnt: null,
          quickWork: {
            addPrice: null,
            workDay: null
          }
        },
        addEdit: [{
          addPrice: null,
          editCnt: null
        },
        {
          addPrice: null,
          editCnt: null
        }],
        customOption: [{
          title: '',
          description: '',
          addPrice: null,
          workDay: null
        }]
      },
      descriptionInfo: {
        description: ''
      },
      imageInfo: {
        mainImage: null,
        subImages: []
      },
      requestInfoList: []
    }
  },
  computed: {
    routeQueryStep () {
      return Number(this.$route.query.step ?? 0)
    }
  },
  watch: {
    routeQueryStep () {
      this.stepIndex = this.routeQueryStep
    }
  },
  mounted () {
    this.stepIndex = this.routeQueryStep
  },
  methods: {
    async goStep () {
      await this.$validate(this.$refs.validator)

      if (this.stepIndex >= 4) {
        this.submit()
        return false
      } else if (this.stepIndex === 3) {
        if (!this.imageInfo.mainImage) {
          this.$toast('메인 이미지는 반드시 업로드 하셔야 합니다.', { type: 'fail' })
          return false
        } else if (!this.imageInfo.subImages.length) {
          this.$toast('상세 이미지는 1개 이상 업로드 하셔야 합니다.', { type: 'fail' })
          return false
        }
      }

      this.stepIndex += 1
      this.$router.push({ path: this.$route.path, query: { step: this.stepIndex } })
    },
    async tempStore () {
      await this.$validate(this.$refs.validator)

      this.$toast('입력하신 정보가 임시 저장 되었습니다.', { type: 'success' })
    },
    async submit () {
      await this.$validate(this.$refs.validator)

      if (this.stepIndex === 3) {
        if (!this.imageInfo.mainImage) {
          this.$toast('메인 이미지는 반드시 업로드 하셔야 합니다.', { type: 'fail' })
          return false
        } else if (!this.imageInfo.subImages.length) {
          this.$toast('상세 이미지는 1개 이상 업로드 하셔야 합니다.', { type: 'fail' })
          return false
        }
      }

      await this.$modal(SubmitApplyModal)

      setTimeout(async () => {
        await this.$alert({ title: '서비스 등록 완료', message: '새롭게 등록된 서비스를 확인해보세요!' })
        this.$router.push('/market/sales-service?type=all')
      }, 300)
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[product-create-page]{
 .inner-holder{ .min-h(998); .pt(83); .pb(107);
   .contents-holder{ .rel; .pl(326);
     .step-view{ .abs; .lt(0,0); .z(1); .w(296); .p(40); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      >ul{
        >li{ .rel; .pb(37);
          &:last-child{ .pb(0); }
          &::after{ .cnt; .abs; .lt(18,0); .z(1); .wh(3, 100%); .bgc(#efefef); }
          .index{ .rel; .z(2); .ib; .vam; .wh(39); .fs(22,39); .c(#fff); .semi-bold; .tc; .bgc(#d9d9d9); .br(50%); }
          .name{ .rel; .z(2); .ib; .vam; .ml(20); .fs(22,27); .c(#aaa); }

          &.active{
            .index{ .bgc(@strong-purple); .semi-bold; }
            .name{ .c(@strong-purple); .semi-bold; }
          }
          &.line{
            &::after{ .bgc(@strong-purple); }
          }
        }
      }
     }
     .contents {
       > .hd{ .h(51); .mb(32);
         .tit{ .fs(28,33); .c(@title-black); .semi-bold; }
         .control-box{ .abs; .rt(0,-10); .z(1);
           .switch-box{ .ib; .vam; .mr(15); .p(12, 20); .br(7); .bgc(#fff); .no-drag; box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.06);
             .label{ .ib; .vam; .mr(18); .fs(16,20); .c(@gray);
             }
           }
           .submit-btn{
             >button{ .wh(117,48); .fs(20); }
           }
         }
       }
     }
     .btn-holder { .mt(40); .tr;
      [cl-button]{ .wh(120,48); .ml(12);
        >button{ .wh(100%, 48); .p(0,43); .fs(20); }
      }
     }
   }
 }
}
</style>
