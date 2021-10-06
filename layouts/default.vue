<template>
  <div id="app">
    <Header />
    <KeepAlive>
      <RouterView :key="`${$route.name}`" :include="keepAliveLists" class="page-body" />
    </KeepAlive>
    <Footer />
  </div>
</template>

<script>
import keepAliveLists from '@/constants/keepAliveLists'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default {
  name: 'App',
  components: { Header, Footer },
  data () {
    return {
      keepAliveLists
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';
#__nuxt{ .h(100%);
  #__layout{ .h(100%);
    #app{ .min-w(@wrapper-size); .min-h(100%);
      >.page-body{ .min-h(100%); .mt(-131.3); .pt(131.3); .mb(-240.39); .pb(240.39); }
    }
  }
}
</style>
