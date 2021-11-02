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
                <ToggleSwitch />
              </div>
              <cl-button type="purple" class="submit-btn">
                제출하기
              </cl-button>
            </div>
          </div>
          <ValidationObserver ref="validator">
            <ProductBasicInfo v-if="stepIndex === 0" />
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

export default {
  name: 'ProductCreatePage',
  components: { ToggleSwitch, ClButton, ProductBasicInfo },
  data () {
    return {
      stepIndex: 0,
      stepList: ['기본정보', '가격설정', '서비스 설정', '이미지', '요청사항']
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
  methods: {
    async goStep () {
      await this.$validate(this.$refs.validator)

      if (this.stepIndex > 4) {
        // this.$alert({ title: '프로필 저장 완료', message: '새롭게 저장된 프로필을 확인해보세요!' })
      } else {
        this.stepIndex += 1
        this.$router.push({ path: this.$route.path, query: { step: this.stepIndex } })
      }
    },
    async tempStore () {
      await this.$validate(this.$refs.validator)

      this.$toast('입력하신 정보가 임시 저장 되었습니다.', { type: 'success' })
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[product-create-page]{
 .inner-holder{ .min-h(998); .pt(83);
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
       .hd{ .h(51); .mb(32);
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
