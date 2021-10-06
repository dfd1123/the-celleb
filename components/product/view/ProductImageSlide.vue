<template>
  <div product-image-slide class="product-img-slide">
    <swiper>
      <swiper-slide>
        <img src="~/assets/imgs/sample/product-big1.png">
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
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-image-slide]{ .crop; .wh(100%,441); .mb(56); }

</style>
