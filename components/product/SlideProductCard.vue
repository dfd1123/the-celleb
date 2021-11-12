<template>
  <div slide-product-card>
    <router-link :to="`/influencer/${item.id}`">
      <div class="image-info">
        <div class="bg-banner">
          <img :src="item.bg_image" alt="">
        </div>
        <div class="profile">
          <img :src="item.image" alt="">
        </div>
      </div>
      <div class="detail-info">
        <h6>{{ item.nickname }}</h6>
        <p>{{ item.intro }}</p>
      </div>
      <div class="sub-info">
        <span class="count"><em>67</em>회 진행</span>
        <span class="average">
          <em>{{ item.rating }} </em>
          / 5.0
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
import sampleBgBanner from '@/assets/imgs/sample/product-small-bg1.png'
import sampleProfile from '@/assets/imgs/sample/profile-img1.png'

export default {
  name: 'SlideProductCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sampleBgBanner,
      sampleProfile
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[slide-product-card]{ .crop; .w(278); .br(7); box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.04);
  .image-info { .rel;
    .bg-banner { .rel; .crop; .wh(100%, 112);
      &::before{ .cnt; .abs; .lt(0,0); .z(1); .wh(100%); .bgc(#828282); .o(0.35); }
      >img{ .wh(100%); object-fit: cover; object-position: center; }
    }
    .profile{ .abs; .lb(26,-45); .z(1); .wh(90); .-a(#ccc); .bgc(#fff); .br(50%); .crop;
      >img{ .wh(100%); object-fit: scale-down; object-position: center; }
    }
  }
  .detail-info{ .p(45,26, 20); .h(203);
    >h6{ .mt(28); .mb(12); .fs(20); .c(@gray); .regular; }
    >p{ .fs(13,20); .c(#888); .ellipsis(2); }
  }
  .sub-info{ .crop; .p(0,20); .bgc(#fcfbfb);
    >span{ .ib; .lh(52); .vam;
      &.count{ .fl; .fs(14); .c(#888); .semi-bold;
      >em{ .c(@purple); }
      }
      &.average { .fr; .fs(18); .c(#888);
        >em{ .fs(24); .medium; .c(@purple); }
      }
    }
  }
}
</style>
