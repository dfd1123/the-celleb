<template>
  <div market-container>
    <div class="inner-holder my-page-holder">
      <MarketNav />
      <div class="container">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import MarketNav from '@/components/market/MarketNav'

export default {
  name: 'MarketContainer',
  components: { MarketNav }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[market-container]{ .pt(84); .pb(204); .bgc(#fafbff);
  .my-page-holder{ .clear;
    .container{ .fr; .w(816);
      [order-card] { .pointer; }
    }
  }
}
</style>
