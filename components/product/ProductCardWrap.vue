<template>
  <div product-card-wrap :class="[type]">
    <template v-if="list.length && list[0].id">
      <ProductCard v-for="item in list" :key="`item-${item.id}`" :item="item" />
    </template>
    <template v-else>
      <SkeletonProductCard v-for="(item, index) in list" :key="`item-${index}`" :item="item" />
    </template>
  </div>
</template>

<script>
import ProductCard from '@/components/product/ProductCard'
import SkeletonProductCard from '@/components/product/SkeletonProductCard'

export default {
  name: 'ProductCardWrap',
  components: { ProductCard, SkeletonProductCard },
  props: {
    list: { type: Array, default: () => [] },
    type: { type: String, default: 'default' }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-card-wrap]{ .crop;
  &.default {
    [product-card], [skeleton-product-card] {
      .card-holder { .fl; width:calc((100% / 4) - (90px / 4)); .mb(60); .mr(30); }
      &:nth-child(4n){
        .card-holder { .mr(0); }
      }
    }
  }
}
</style>
