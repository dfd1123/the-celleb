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
        <swiper ref="slideList" :options="slideOption">
          <swiper-slide v-for="i in 10" :key="`${i}`">
            <SlideProductCard />
          </swiper-slide>
        </swiper>
        <button v-wave class="slide-arrow next-btn" @click="slideGo(1)" />
        <button v-wave class="slide-arrow prev-btn" @click="slideGo(-1)" />
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
  components: {
    SlideProductCard,
    Swiper,
    SwiperSlide
  },
  props: {
    subject: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      slideOption: {
        slidesPerView: 4,
        allowSlideNext: true,
        loop: true
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.slideList.$swiper
    }
  },
  methods: {
    more () {
      this.$emit('more')
    },
    slideGo (index) {
      if (index > 0) {
        this.swiper.slideNext(300)
      } else {
        this.swiper.slidePrev(300)
      }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[slide-product-list] { .pt(77); .pb(65);
  .subject { .rel;
    h3 { .fs(26, 31); .c(@gray); .medium; }
    .more-btn { .abs; .rt(0, 0); .z(1); .fs(18, 31); .c(#888888);
      &::after { .cnt; .ib; .wh(11, 13); .contain('~assets/imgs/icon/ico-angle.svg'); .bg-c; transform: rotate(-90deg); }
    }
  }
  .card-list-wrap { .rel;
    .swiper-container { .p(42, 0);
      .swiper-slide { .w(278);
        [slide-product-card] { .mh-c; }
      }
    }
    .slide-arrow { .abs; .t(180); .z(1); .wh(43); .bgc(#fff); .br(50%); .contain('~assets/imgs/icon/ico-slide-arrow.svg'); .bg-c; .bg-s(30,30);
      &.next-btn { .r(-60); box-shadow: 0 2px 6px rgba(0,0,0,0.1); transform: rotate(0deg); .bg-x(40%); }
      &.prev-btn { .l(-60); box-shadow: 0 -2px 6px rgba(0,0,0,0.1); transform: rotate(180deg);  .bg-x(40%); }
    }
  }
}
</style>
