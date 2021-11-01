<template>
  <div product-card-wrap :class="[type]">
    <ProductCard v-for="item in list" :key="`item-${item.id}`" :item="item" />
  </div>
</template>

<script>
export default {
  name: 'ProductCardWrap',
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
    [product-card] {
      .card-holder { .fl; width:calc((100% / 4) - (90px / 4)); .mb(60); .mr(30); }
      &:nth-child(4n){
        .card-holder { .mr(0); }
      }
    }
  }
}
</style>
