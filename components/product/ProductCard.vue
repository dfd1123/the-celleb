<template>
  <div product-card>
    <div class="card-holder">
      <router-link :to="`/product/${item.channel_id}/${item.id}`">
        <div class="prod-img-box">
          <img :src="productImg" :alt="item.title || 'sample image'">
        </div>
        <div class="prod-info-box">
          <h2 class="name">
            {{ item.title || '업체이름' }}
          </h2>
          <div class="description">
            {{ item.simple_intro }}
          </div>
        </div>
      </router-link>
      <div class="prod-price-box">
        <em class="price">{{ minimumPrice }}<i>원</i></em>
        <div class="about-reason">
          <HearButton />
          <span class="score">{{ item.rating }}</span>
          <span class="review-cnt">({{ item.review_cnt }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sampleProductImg from '@/assets/imgs/sample/product1.jpg'
import HearButton from '@/components/common/HearButton'
import { numberFormat } from '~/utils/numberUtils'

export default {
  name: 'ProductCard',
  components: { HearButton },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sampleProductImg
    }
  },
  computed: {
    productImg () {
      return this.item.images[0] || sampleProductImg
    },
    minimumPrice () {
      return numberFormat(this.item.minimum_price || 0)
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
    .description { .h(46); .fs(16, 23); .c(@gray); .ellipsis(2); }
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
