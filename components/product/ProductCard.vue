<template>
  <div product-card>
    <div class="card-holder">
      <router-link to="#">
        <div class="prod-img-box">
          <img :src="item.image || sampleProductImg" :alt="item.name || 'sample image'">
        </div>
        <div class="prod-info-box">
          <h2 class="name">
            {{ item.name || '업체이름' }}
          </h2>
          <p class="description">
            인스타그램 최적화 계정으로 활성화 관리해드립니다.
          </p>
        </div>
      </router-link>
      <div class="prod-price-box">
        <em class="price">30,000<i>원</i></em>
        <div class="about-reason">
          <HearButton />
          <span class="score">4.9</span>
          <span class="review-cnt">(320)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sampleProductImg from '@/assets/imgs/sample/product1.jpg'
import HearButton from '@/components/common/HearButton'

export default {
  name: 'ProductCard',
  components: { HearButton },
  props: {
    item: {
      type: Object,
      default: () => ({
        // eslint-disable-next-line no-undef
        image: '',
        name: '업체이름'
      })
    }
  },
  data () {
    return {
      sampleProductImg
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-card] {
  .card-holder { .w(276); }
  .prod-img-box { .h(244);
    > img { .wh(100%); object-fit: cover; object-position: center; transform: scale(1); transition: transform 0.25s;
     &:hover{ transform: scale(1.025); }
    }
  }
  .prod-info-box { .pt(21); .pb(16);
    .name { .mb(7); .fs(20, 24); .c(@black); .medium; .ellipsis; }
    .description { .fs(16, 23); .c(@gray); .ellipsis(2); }
  }
  .prod-price-box { .crop; .p(10, 0); .-t(#EEEEEE, 2);
    .price { .fl; .fs(20, 35); }
    .about-reason { .fr;
      > span { .ib; .fs(16, 35); .vam;
        &.score { .c(#555555); .medium; }
        &.review-cnt { .c(#777777); .regular; }
      }
      [heart-button] { .mr(-7);
        svg { .w(35); }
      }
    }
  }
}
</style>
