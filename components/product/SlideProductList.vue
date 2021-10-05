<template>
  <div slide-product-list>
    <div class="inner-holder">
      <div class="subject">
        <h3>{{ subject }}</h3>
        <button class="more-btn" @click="more">
          전체보기
        </button>
      </div>
      <div class="card-list-wrap">
        <swiper>
          <swiper-slide v-for="i in 10" :key="`${i}`">
            <SlideProductCard />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import SlideProductCard from '@/components/product/SlideProductCard'

export default {
  name: 'SlideProductList',
  components: { SlideProductCard, Swiper, SwiperSlide },
  props: {
    subject: { type: String, default: '' }
  },
  methods: {
    more () {
      this.$emit('more')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[slide-product-list] {
  .subject { .rel;
    h3 { .fs(26, 31); .c(@gray); }
    .more-btn { .abs; .rt(0,0); .z(1); .fs(18, 31); .c(#888);
      &::after{ .cnt; .ib; .wh(11,13); .contain('~assets/imgs/icon/ico-angle.svg'); .bg-c; transform: rotate(-90deg); }
    }
  }
}
</style>
