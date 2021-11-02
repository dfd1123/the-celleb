<template>
  <div product-basic-info>
    <div class="white-box">
      <div class="inp-box">
        <span class="label">제목</span>
        <div class="inp">
          <ValidationProvider v-slot="{errors}" rules="required" name="제목">
            <TextInput v-model="basicInfo.title" :class="{'error': errors.length > 0}" />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
        </div>
      </div>
    </div>
    <div class="white-box">
      <div class="inp-box">
        <span class="label">카테고리</span>
        <div class="inp">
          <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="상위 카테고리">
            <SelectBox v-model="basicInfo.category" :list="topCategoryList" :class="{'error': errors.length > 0}" placeholder="상위 카테고리" />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
        </div>
        <div class="inp">
          <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="하위 카테고리">
            <SelectBox v-model="basicInfo.channel" :list="bottomCategoryList" :class="{'error': errors.length > 0}" placeholder="하위 카테고리" />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/common/input/TextInput'
import SelectBox from '@/components/common/input/SelectBox'

export default {
  name: 'ProductBasicInfo',
  components: { TextInput, SelectBox },
  props: {
    basicInfo: {
      type: Object,
      default: () => ({
        title: '',
        category: '',
        channel: ''
      })
    }
  },
  data () {
    return {
      topCategoryList: ['건강 기능식품', '일반식품', '가전제품', '화장품', '쥬얼리', '패션', '육아'],
      bottomCategoryList: ['인스타그램', '유튜브', '네이버 블로그', '네이버 카페', '틱톡', '카카오쇼핑라이브', '네이버쇼핑라이브']
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-basic-info]{
  .white-box{ .mb(26); .p(30,40); .bgc(#fff); .br(7); box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.08); }
  .inp-box { .rel; .pl(113);
    .label{ .abs; .lt(0,0); .z(1); .fs(20,48); .c(@title-black); .medium; }
    [text-input] {
      >input{ .p(0, 20); .fs(18);}
    }
    [select-box]{ .wh(100%, 48); .-a(#d9d9d9); .br(5);
      .show-value{ .pl(20); .fs(16); }
      .angle{ .t(15);
        svg path { fill:#aaa; }
      }
    }
  }
}
</style>
