<template>
  <div product-card-wrap :class="[type]">
    <ProductCard v-for="(item, index) in list" :key="`item-${index}`" :item="{image: require(`~/assets/imgs/sample/product${index + 1}.jpg`)}" />
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

[product-card-wrap]{
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
