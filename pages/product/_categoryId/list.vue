<template>
  <div product-list-page>
    <SubTopNav :menu-list="menuList" />
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
    </div>
  </div>
</template>

<script>
import SubTopNav from '@/components/common/menu/SubTopNav'
import FilterBox from '@/components/product/FilterBox'
import SelectBox from '@/components/common/input/SelectBox'
import ProductCardWrap from '@/components/product/ProductCardWrap'

export default {
  name: 'ProductListPage',
  components: { SubTopNav, FilterBox, SelectBox, ProductCardWrap },
  data () {
    return {
      menuList: [
        { name: '인스타그램', path: '/product/instagram/list' },
        { name: '유튜브', path: '/product/youtube/list' },
        { name: '블로그', path: '/product/blog/list' },
        { name: '카페', path: '/product/cafe/list' },
        { name: '틱톡', path: '/product/tiktok/list' },
        { name: '라이브커머스', path: '/product/live-commerce/list' }
      ],
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

[product-list-page] {
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
