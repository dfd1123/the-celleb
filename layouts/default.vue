<template>
  <div id="app" :class="{ftHide, hdHide}">
    <Header v-if="!hdHide" />
    <div class="page-body">
      <KeepAlive :include="keepAliveLists">
        <RouterView :key="`${$route.name}`" />
      </KeepAlive>
    </div>
    <Footer v-if="!ftHide" v-show="!isMain" />
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
    },
    hdHide () {
      return Boolean(this.$route.meta.hdHide)
    },
    ftHide () {
      return Boolean(this.$route.meta.ftHide)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';
#__nuxt{ .h(100%);
  #__layout{ .h(100%);
    #app{ .min-w(@wrapper-size); .min-h(100%);
      &.ftHide{
        >.page-body{ .mb(0); .pb(0); }
      }
      &.hdHide{
        >.page-body{ .mt(0); .pt(0); }
      }
      >.page-body{ .min-h(100vh); .mt(-84); .pt(84); .mb(-240.39); .pb(240.39); .bgc(#fafbff); }
    }
  }
}
</style>
