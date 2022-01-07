<template>
  <div product-list-page>
    <ChannelNav v-model="channel" />
    <div class="inner-holder">
      <h2 v-que="{animation: 'fadeInUp', delay: 0, duration: 900}" class="page-tit">
        {{ pageTitle }}
      </h2>
      <FilterBox v-model="purpose" v-que="{animation: 'fadeInUp', delay: 200, duration: 900}" />
      <div v-que="{animation: 'fadeInUp', delay: 400, duration: 900}" class="orderby-controller">
        <span class="total-cnt">{{ showItemCnt }}개의 서비스</span>
        <SelectBox v-model="orderBy" :list="orderByList" />
      </div>
      <div>
        <NoData v-if="itemList && showItemCnt === 0" main-msg="조회된 업체 및 서비스가 없습니다." />
        <ProductCardWrap
          v-else
          v-que="{animation: 'fadeSlowInUpPx', delay: 300, duration: 900}"
          :list="showItemList.slice(cursor * 12, (cursor + 1) * (showItemCnt >= 12 ? 12 : 7))"
        />
        <Pagination :chunk-size="12" :current-cursor="cursor" :total-count="showItemCnt" @change="changeCursor" />
      </div>
    </div>
  </div>
</template>

<script>
import que from '@/directives/que'
import ChannelNav from '@/components/product/ChannelNav'
import FilterBox from '@/components/product/FilterBox'
import SelectBox from '@/components/common/input/SelectBox'
import ProductCardWrap from '@/components/product/ProductCardWrap'
import NoData from '@/components/common/NoData'
import Pagination from '@/components/common/Pagination'

export default {
  name: 'ProductListPage',
  components: { ChannelNav, FilterBox, SelectBox, ProductCardWrap, NoData, Pagination },
  directives: { que },
  data () {
    return {
      channel: 'instagram',
      orderByList: [
        { label: '추천순', value: 'recommend', order: 'desc' },
        { label: '인기순', value: 'hit', order: 'desc' },
        { label: '가격순', value: 'minimum_price', order: 'asc' }
      ],
      orderBy: '',
      purpose: [],
      min: 0,
      max: 0,
      itemList: null
    }
  },
  computed: {
    pageTitle () {
      const titleObj = {
        instagram: '인스타그램',
        youtube: '유튜브',
        blog: '네이버 블로그',
        cafe: '네이버 카페',
        tiktok: '틱톡',
        liveCommerce: '라이브 커머스'
      }

      return titleObj[this.channel]
    },
    cursor () {
      return Number(this.$route.query.cursor || 0)
    },
    showItemList () {
      if (!this.itemList) {
        return Array.from({ length: 8 }).map(() => ({}))
      }
      let channel = this.channel
      if (this.channel === 'cafe') {
        channel = 'instagram'
      } else if (this.channel === 'tiktok') {
        channel = 'youtube'
      } else if (this.channel === 'liveCommerce') {
        channel = 'blog'
      }
      let showItemList = this.itemList.filter(item => item.channel_id === channel)
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
      if (this.purpose.length > 0) {
        showItemList = showItemList.filter(item => this.purpose.includes(item.purpose))
      }
      if (this.min) {
        showItemList = showItemList.filter(item => this.min <= item.minimum_price)
      }
      if (this.max) {
        showItemList = showItemList.filter(item => this.max >= item.minimum_price)
      }

      this.routeQueryReplace()

      return showItemList
    },
    showItemCnt () {
      return this.showItemList.length || 0
    }
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
      this.purpose = this.$route.query.purpose ?? []
      this.min = this.$route.query.min
      this.max = this.$route.query.max
    },
    routeQueryReplace () {
      if (this.$route.name === 'product-channelId-list') {
        this.$router.replace({
          path: this.$route.path,
          query: { ...this.$route.query, orderBy: this.orderBy, purpose: this.purpose }
        }).catch(() => {
        })
      }
    },
    changeCursor (cursor) {
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, cursor } })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-list-page] { .bgc(#FFF);
  .page-tit { .mt(57); .mb(31); .fs(28, 33); .c(@black); }
  .orderby-controller { .crop; .mt(53); .mb(40);
    .total-cnt { .fl; .fs(20, 24); .c(@gray); .bold; }
    [select-box] { .fr; .wh(96, 24); .-a !important;
      input[type="text"] { .fs(18, 24); }
      > .angle { .t(2);
        svg { .w(12);
          path { fill: #AAAAAA; }
        }
      }
    }
  }
  [no-data] { .h(600);
    p.main-msg { .c(@light-gray); }
  }
}
</style>
