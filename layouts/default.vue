<template>
  <div id="app">
    <Header />
    <KeepAlive>
      <RouterView :include="keepAliveLists" />
    </KeepAlive>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import keepAliveLists from '@/constants/keepAliveLists'

export default {
  name: 'App',
  components: { Header },
  data () {
    return {
      keepAliveLists
    }
  }
}
</script>

<style scoped>

</style>
