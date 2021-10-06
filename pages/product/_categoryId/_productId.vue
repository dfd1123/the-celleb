<template>
  <div product-view-page>
    <CategoryNav />
    <div class="inner-holder product-wrap">
      <div class="detail-info">
        <ProductImageSlide />
        <ToggleTab v-model="selectedTab" :tabs="tabs" />
        <ProductInfoTabItem :value="selectedTab" />
        <ProductReviewWrap />
      </div>
      <div class="control-holder">
        <BuyControlPanel />
        <ProductStoreBox />
      </div>
    </div>
    <SlideProductList subject="다른 회원이 함께 본 서비스" class="other-user-relate" />
    <SlideProductList subject="추천 서비스" />
  </div>
</template>

<script>
import ProductImageSlide from '@/components/product/view/ProductImageSlide'
import ProductInfoTabItem from '@/components/product/view/ProductInfoTabItem'
import ProductReviewWrap from '@/components/product/view/ProductReviewWrap'
import CategoryNav from '@/components/product/CategoryNav'
import ToggleTab from '@/components/common/tab/ToggleTab'
import BuyControlPanel from '@/components/product/view/BuyControlPanel'
import ProductStoreBox from '@/components/product/view/ProductStoreBox'
import SlideProductList from '@/components/product/SlideProductList'

export default {
  name: 'ProductViewPage',
  components: {
    ProductImageSlide,
    ProductInfoTabItem,
    ProductReviewWrap,
    CategoryNav,
    ToggleTab,
    BuyControlPanel,
    ProductStoreBox,
    SlideProductList
  },
  data () {
    return {
      selectedTab: 0,
      tabs: ['서비스 설명', '가격 정보', '수정 / 재진행', '취소 / 환불', '서비스 평가']
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[product-view-page] {
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
