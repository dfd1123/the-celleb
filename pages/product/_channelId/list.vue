<template>
  <div product-list-page>
    <ChannelNav v-model="channel" />
    <div class="inner-holder">
      <h2 class="page-tit">
        인스타그램
      </h2>
      <FilterBox v-model="applyFilters" />
      <div class="orderby-controller">
        <span class="total-cnt">30,250개의 업체</span>
        <SelectBox v-model="orderBy" :list="orderByList" />
      </div>
      <NoData v-if="itemList && showItemCnt === 0" main-msg="조회된 업체 및 서비스가 없습니다." />
      <ProductCardWrap v-else :list="showItemList" />
      <Pagination :chunk-size="12" :total-count="showItemCnt" />
    </div>
  </div>
</template>

<script>
import ChannelNav from '@/components/product/ChannelNav'
import FilterBox from '@/components/product/FilterBox'
import SelectBox from '@/components/common/input/SelectBox'
import ProductCardWrap from '@/components/product/ProductCardWrap'
import NoData from '@/components/common/NoData'
import Pagination from '@/components/common/Pagination'

export default {
  name: 'ProductListPage',
  components: { ChannelNav, FilterBox, SelectBox, ProductCardWrap, NoData, Pagination },
  data () {
    return {
      channel: 'instagram',
      orderByList: [
        { label: '추천순', value: 'recommend', order: 'desc' },
        { label: '인기순', value: 'hit', order: 'desc' },
        { label: '가격순', value: 'minimum_price', order: 'asc' }
      ],
      orderBy: '',
      applyFilters: [],
      itemList: null
    }
  },
  computed: {
    showItemList () {
      if (!this.itemList) { return Array.from({ length: 8 }).map(() => ({})) }
      let showItemList = this.itemList.filter(item => item.channel_id === this.channel)
      showItemList.sort((a, b) => {
        const order = this.orderByList.find(item => item.value === this.orderBy).order

        if (order === 'desc') {
          if (a[this.orderBy] < b[this.orderBy]) {
            return 1
          } else if (a[this.orderBy] > b[this.orderBy]) {
            return -1
          }
        } else if (a[this.orderBy] > b[this.orderBy]) {
          return 1
        } else if (a[this.orderBy] < b[this.orderBy]) {
          return -1
        }
        return 0
      })
      if (this.applyFilters.length) { showItemList = showItemList.filter(item => this.applyFilters.includes(item.purpose)) }

      this.routeQueryReplace()

      return showItemList
    },
    showItemCnt () { return this.showItemList.length || 0 }
  },
  mounted () {
    this.matchOptions()
    this.getItemList()
  },
  methods: {
    async getItemList () {
      this.itemList = await this.$api.get('/products')
    },
    matchOptions () {
      this.orderBy = this.$route.query.orderBy ?? 'recommend'
      this.applyFilters = this.$route.query.purpose || []
      if (!Array.isArray(this.applyFilters)) { this.applyFilters = [this.applyFilters] }
    },
    routeQueryReplace () {
      if (this.$route.name === 'product-channelId-list') {
        this.$router.replace({
          path: this.$route.path,
          query: { ...this.$route.query, orderBy: this.orderBy, purpose: this.applyFilters }
        }).catch(() => {
        })
      }
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
  [no-data] { .h(600);
    p.main-msg{ .c(@light-gray); }
  }
}
</style>
