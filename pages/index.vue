<template>
  <div main>
    <div class="bg-con">
      <img src="~/assets/imgs/bg/main-bg.jpg" alt="celleb main background">
    </div>
    <div class="wrapper inner-holder">
      <div class="container">
        <h1 class="main-tit">
          '진짜' 셀럽을 잇다, <em>더셀럽</em>
        </h1>
        <div class="search-con">
          <div class="select-box-con">
            <ValidationObserver ref="validator">
              <ValidationProvider rules="required" name="카테고리">
                <SelectBox v-model="category" v-wave :list="topCategoryList" placeholder="카테고리" />
              </ValidationProvider>
              <ValidationProvider rules="required" name="예산">
                <SelectBox v-model="priceRange" v-wave :list="priceRangeList" placeholder="예산" />
              </ValidationProvider>
              <ValidationProvider rules="required" name="채널">
                <SelectBox v-model="channel" v-wave :list="bottomCategoryList" placeholder="채널" />
              </ValidationProvider>
              <ValidationProvider rules="required" name="목적">
                <SelectBox v-model="purpose" v-wave :list="purposeList" placeholder="목적" />
              </ValidationProvider>
            </ValidationObserver>
          </div>
          <button v-wave type="button" class="search-btn" @click="search">
            <img src="~/assets/imgs/icon/ico-search.svg" alt="search">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectBox from '@/components/common/input/SelectBox'

export default {
  name: 'MainPage',
  components: { SelectBox },
  data () {
    return {
      topCategoryList: [{ label: '건강 기능식품', value: 1 }, { label: '일반식품', value: 2 }, { label: '가전제품', value: 3 }, { label: '화장품', value: 4 }, { label: '쥬얼리', value: 5 }, { label: '패션', value: 6 }, { label: '육아', value: 7 }],
      priceRangeList: [
        { label: '1만원~100만원', value: '10000|1000000' },
        { label: '100만원~300만원', value: '1000000|3000000' },
        { label: '300만원~500만원', value: '3000000|5000000' },
        { label: '500만원~1,000만원', value: '5000000|10000000' },
        { label: '1,000만원 이상', value: '10000000' }
      ],
      bottomCategoryList: [{ label: '인스타그램', value: 'instagram' }, { label: '유튜브', value: 'youtube' }, { label: '네이버 블로그', value: 'blog' }, { label: '네이버 카페', value: 'instagram' }, { label: '틱톡', value: 'youtube' }, { label: '라이브커머스', value: 'blog' }],
      purposeList: [
        { label: '공동구매', value: 'groupBuy' },
        { label: '체험단', value: 'experienceGroup' },
        { label: '콘텐츠', value: 'contents' },
        { label: '홍보', value: 'marketing' }
      ],
      category: '',
      priceRange: '',
      channel: '',
      purpose: ''
    }
  },
  methods: {
    async search () {
      await this.$validate(this.$refs.validator)
      const [min, max] = this.priceRange.split('|')
      this.$router.push({ path: `/product/${this.channel}/list`, query: { purpose: this.purpose, min, max } })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[main] { .rel; .crop;
  .bg-con { .crop; .abs; .lt(0, 0); .z(1); .wh(100%, 100vh);
    > img { object-fit: cover; .min-w(100%); .min-h(100%); }
    &::after { .cnt; .abs; .lt(0, 0); .z(1); .wh(100%); .o(0.65); background-image: linear-gradient(116deg, #8E2AE4 2%, #0901F3 100%); }
  }

  .wrapper { .rel; .z(2); display: table; height: calc(100vh - 131px);
    .container { display: table-cell; .vam; .mh-c;
      .main-tit { .mb(51); .fs(44, 53); .c(#FFFFFF); .regular; .tc;
        > em { .extra-bold; }
      }
      .search-con { .rel; .pr(60);
        .select-box-con { .rel; .z(2);
          [select-box] { .rel; .fl; .wh(25%, 64); .p(0, 8); box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.16);
            &:nth-of-type(1){ .z(4); }
            &:nth-of-type(2){ .z(3); }
            &:nth-of-type(3){ .z(2); }
            &:nth-of-type(4){ .z(1); }
            > input { .fs(16); .c(@black);
              &::placeholder{ .fs(16); }
            }
            >.angle{ .rt(18,21); }
          }
        }
        .search-btn { .abs; .rt(4,0); .z(1); .wh(64); .lh(70); .br(5); .bgc(#fff);
          > img { .ml(6); }
        }
      }
    }
  }
}

</style>
