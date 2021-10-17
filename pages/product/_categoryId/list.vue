<template>
  <div product-list-page>
    <CategoryNav />
    <div class="inner-holder">
      <h2 class="page-tit">
        인스타그램
      </h2>
      <FilterBox v-model="applyFilters" />
      <div class="orderby-controller">
        <span class="total-cnt">30,250개의 업체</span>
        <SelectBox v-model="orderBy" :list="orderByList" />
      </div>
      <ProductCardWrap :list="itemList" />
      <Pagination :chunk-size="10" :total-count="100" />
    </div>
  </div>
</template>

<script>
import CategoryNav from '@/components/product/CategoryNav'
import FilterBox from '@/components/product/FilterBox'
import SelectBox from '@/components/common/input/SelectBox'
import ProductCardWrap from '@/components/product/ProductCardWrap'
import Pagination from '@/components/common/Pagination'

export default {
  name: 'ProductListPage',
  components: { CategoryNav, FilterBox, SelectBox, ProductCardWrap, Pagination },
  data () {
    return {
      orderByList: [
        { label: '추천순', value: 'recommend' },
        { label: '인기순', value: 'popular' },
        { label: '가격순', value: 'price' }
      ],
      orderBy: '',
      applyFilters: [],
      itemList: []
    }
  },
  mounted () {
    for (let i = 0; i < 12; i++) {
      this.itemList.push({})
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-list-page] { .bgc(#fff);
  .page-tit { .mt(57); .mb(31); .fs(28, 33); .c(@black); }
  .orderby-controller{ .crop; .mt(53); .mb(40);
    .total-cnt{ .fl; .fs(20,24); .c(@gray); .bold; }
    [select-box] { .fr; .wh(96,24); .-a !important;
      input[type="text"]{ .fs(18,24); }
      >.angle{ .t(2);
        svg { .w(12);
          path { fill: #AAAAAA; }
        }
      }
    }
  }
}
</style>
