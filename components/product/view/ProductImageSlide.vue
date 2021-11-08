<template>
  <div product-image-slide class="product-img-slide">
    <swiper>
      <swiper-slide v-for="(image, index) in images" :key="`image-${index}`">
        <img :src="image">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductImageSlide',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    images: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-image-slide]{ .crop; .w(100%); .mb(56);
  .swiper-slide{ .h(441);
    >img{ .wh(100%); object-fit: cover; object-position: center; }
  }
}

</style>
