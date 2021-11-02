<template>
  <div influencer-career-info>
    <span class="label">경력사항을 작성해주세요.</span>
    <div class="career-inp-holder">
      <ValidationObserver ref="validator">
        <div class="freelancer-yn">
          <label>
            <span>프리랜서인 경우, 체크해주세요.</span>
            <check-box v-model="form.isFree" :val="true" />
          </label>
        </div>
        <div class="inp-area row2">
          <div class="inp-box">
            <ValidationProvider rules="required" name="회사명">
              <TextInput v-model="companyName" placeholder="회사명" />
            </ValidationProvider>
          </div>
          <div class="inp-box">
            <ValidationProvider rules="required" name="근무부서">
              <TextInput v-model="part" placeholder="근무부서" />
            </ValidationProvider>
          </div>
        </div>
        <div class="with-btn-inp-area">
          <div class="inp-area row3">
            <div class="inp-box">
              <ValidationProvider rules="required" name="직위">
                <TextInput v-model="position" placeholder="직위" />
              </ValidationProvider>
            </div>
            <div class="inp-box">
              <ValidationProvider rules="required" name="연차">
                <SelectBox v-model="careerYear" :list="yearList" placeholder="년" />
              </ValidationProvider>
            </div>
            <div class="inp-box">
              <ValidationProvider rules="required" name="개월수">
                <SelectBox v-model="careerMonth" :list="monthList" placeholder="개월" />
              </ValidationProvider>
            </div>
          </div>
          <cl-button type="line-purple" @click="addCareer">
            확인
          </cl-button>
        </div>
      </ValidationObserver>
    </div>
    <ul class="career-list">
      <li v-for="(career, index) in form.careerList" :key="`career-${index}`">
        <div class="info">
          <span>{{ career.companyName }}</span>
          <span>{{ career.part }}</span>
          <span>{{ career.position }}</span>
          <span>{{ `${career.careerYear}년 ${career.careerMonth}개월` }}</span>
        </div>
        <button @click="removeCareer(index)">
          <img src="~/assets/imgs/icon/ico-close.svg" alt="remove">
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import CheckBox from '@/components/common/input/CheckBox'
import TextInput from '@/components/common/input/TextInput'
import SelectBox from '@/components/common/input/SelectBox'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'InfluencerCareerInfo',
  components: { CheckBox, TextInput, SelectBox, ClButton },
  props: {
    form: {
      type: Object,
      default: () => ({
        isFree: null,
        careerList: []
      })
    }
  },
  data () {
    return {
      companyName: '',
      part: '',
      position: '',
      careerYear: null,
      careerMonth: null
    }
  },
  computed: {
    yearList () { return Array.from({ length: 50 }).map((_, index) => 50 - index) },
    monthList () { return Array.from({ length: 12 }).map((_, index) => 1 + index) }
  },
  methods: {
    async addCareer () {
      await this.$validate(this.$refs.validator)

      const { companyName, part, position, careerYear, careerMonth } = this
      this.form.careerList.push({ companyName, part, position, careerYear, careerMonth })

      this.resetData()
    },
    removeCareer (index) {
      this.form.careerList = this.form.careerList.filter((_, i) => i !== index)
    },
    resetData () {
      this.companyName = ''
      this.part = ''
      this.position = ''
      this.careerYear = null
      this.careerMonth = null
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[influencer-career-info]{ .mt(40);
  .label{ .block; .mb(21); .fs(18, 21); .c(@title-black); .medium; }
  [validation-errors]{ .mb(6); }
  .career-inp-holder{
    .freelancer-yn{ .mb(24); .-a(#d9d9d9); .br(5);
      > label{ .crop; .block; .p(14.5, 20); .pointer;
        >span{ .fl; .ib; .vam; .fs(16,20); .c(@gray); }
        [check-box] { .fr; }
      }
    }
    .inp-box{
      [text-input] {
        >input { .p(0, 20); .fs(16); }
      }
      [select-box]{ .wh(100%, 48); .-a(#d9d9d9); .br(5);
        .show-value{ .pl(20); .fs(16); }
        .angle{ .t(15);
          svg path { fill:#aaa; }
        }
      }
    }
    .with-btn-inp-area{
      .inp-area{ .fl; width:calc(100% - 130px); }
      [cl-button] { .fr; .w(130);
        >button{ .wh(100%, 48); .fs(18); }
      }
    }
    .inp-area{ .crop; .mb(24);
      &.row2{
        .inp-box{ .fl; width: calc((100% / 2) - 6.5px); .mr(13);
          &:last-child { .mr(0); }
        }
      }

      &.row3{
        .inp-box{ .fl; width: calc((100% / 3) - 8.5px); .mr(8);
          &:last-child { .mr(0); }
        }
      }
    }
  }
  .career-list{ .mt(15);
    >li{ .rel; .crop; .mb(10); .p(11.5, 20); .bgc(rgba(239, 239, 239, 0.7)); .br(5);
      .info{ .fl;
        >span{ .ib; .vam; .fs(14); .c(@gray);
          &::after{ .cnt; .ib; .wh(1,10); .m(0, 10); .bgc(#d9d9d9); }
          &:last-child {
            &::after{ .hide; }
          }
        }
      }
      >button{ .fr; .wh(16); .mt(-3); .o(0.7);
        >img{ .wh(16); .vam; }
      }
    }
  }
}
</style>
