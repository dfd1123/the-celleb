<template>
  <div id="app" :class="{'main': isMain}">
    <Header />
    <div class="page-body">
      <KeepAlive :include="keepAliveLists">
        <RouterView :key="`${$route.name}`" />
      </KeepAlive>
    </div>
    <Footer v-show="!isMain" />
  </div>
</template>

<script>
import Vue from 'vue'
import keepAliveLists from '@/constants/keepAliveLists'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import mixin from '@/mixin'

Vue.mixin(mixin)

export default {
  name: 'App',
  components: { Header, Footer },
  data () {
    return {
      keepAliveLists
    }
  },
  computed: {
    isMain () {
      return this.$route.name === 'index'
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';
#__nuxt{ .h(100%);
  #__layout{ .h(100%);
    #app{ .min-w(@wrapper-size); .min-h(100%);
      &.main{
        >.page-body{ .mb(0); .pb(0); }
      }
      >.page-body{ .min-h(100vh); .mt(-131.3); .pt(131.3); .mb(-240.39); .pb(240.39); .bgc(#fafbff); }
    }
  }
}
</style>
