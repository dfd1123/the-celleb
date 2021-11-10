<template>
  <div product-view-page>
    <ChannelNav />
    <div v-if="item" class="inner-holder product-wrap">
      <div class="detail-info">
        <ProductImageSlide
          v-que="{animation: 'fadeIn', delay: 200, duration: 600}"
          :images="item.images "
        />
        <div
          v-que="{animation: 'fadeInUp', delay: 0, duration: 600}"
        >
          <ToggleTab v-model="selectedTab" :tabs="tabs" />
          <ProductInfoTabItem :value="selectedTab" :item="item" />
        </div>
        <ProductReviewWrap
          v-que="{animation: 'fadeSlowInUp', delay: 0, duration: 600}"
          :item="item"
        />
      </div>
      <div class="control-holder">
        <BuyControlPanel
          v-que="{animation: 'fadeInSlowRight', delay: 350, duration: 600}"
          :item="item"
        />
        <ProductStoreBox
          v-que="{animation: 'fadeInSlowRight', delay: 500, duration: 600}"
          :store="store"
        />
      </div>
    </div>
    <SlideProductList v-if="item" subject="다른 회원이 함께 본 업체" class="other-user-relate" />
    <SlideProductList v-if="item" subject="추천 업체" />
  </div>
</template>

<script>
import que from '@/directives/que'
import ProductImageSlide from '@/components/product/view/ProductImageSlide'
import ProductInfoTabItem from '@/components/product/view/ProductInfoTabItem'
import ProductReviewWrap from '@/components/product/view/ProductReviewWrap'
import ChannelNav from '@/components/product/ChannelNav'
import ToggleTab from '@/components/common/tab/ToggleTab'
import BuyControlPanel from '@/components/product/view/BuyControlPanel'
import ProductStoreBox from '@/components/product/view/ProductStoreBox'
import SlideProductList from '@/components/product/SlideProductList'

export default {
  name: 'ProductViewPage',
  directives: { que },
  components: {
    ProductImageSlide,
    ProductInfoTabItem,
    ProductReviewWrap,
    ChannelNav,
    ToggleTab,
    BuyControlPanel,
    ProductStoreBox,
    SlideProductList
  },
  data () {
    return {
      selectedTab: 0,
      tabs: ['서비스 설명', '가격 정보', '수정 / 재진행', '취소 / 환불', '서비스 평가'],
      item: null,
      store: {}
    }
  },
  computed: {
    itemId () {
      return this.$route.params.productId
    },
    channelId () {
      return this.$route.params.channelId
    },
    influencerId () { return this.item.inf_Id }
  },
  mounted () {
    this.getItemInfo()
  },
  methods: {
    async getItemInfo () {
      this.item = await this.$api.get(`/products/${this.itemId}`)
      if (this.influencerId) { this.store = await this.$api.get(`/users/${this.influencerId}`) }
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[product-view-page] { .bgc(#fff);
  .sec-tit { .mb(29); .fs(26,31); .c(@gray); .medium; }
  .product-wrap{ .crop; .p(62, 0);
    .detail-info{ .fl; .w(612); .mt(3); .mr(102);
      [toggle-tab] { .mb(16); .-b(@purple);
        > button { .rel; .wh(20%, 53); .fs(16,19); .c(#aaa); .light; .vam; .bgc(#fff);
          &.on { .c(@purple); .regular; .-a(@purple); .-b; .br-t(5);
            &::after{ .cnt; .abs; .lb(0,-1); .z(1); .wh(100%, 1); .bgc(#fff); }
          }
        }
      }
    }
    .control-holder{ .fl; .w(480); }
  }
  [slide-product-list]{
    &.other-user-relate{ .bgc(#FBFBFB); }
  }
}
</style>
