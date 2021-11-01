<template>
  <div category-nav>
    <SlideTabNav v-model="activeIndex" :menu-list="menuList" @change="route" />
  </div>
</template>

<script>
import SlideTabNav from '@/components/common/menu/SlideTabNav'

export default {
  name: 'ChannelNav',
  components: { SlideTabNav },
  data () {
    return {
      activeIndex: -1,
      menuList: ['인스타그램', '유튜브', '블로그', '카페', '틱톡', '라이브커머스']
    }
  },
  computed: {
    channelId () {
      return this.$route.params.channelId
    },
    menuRouteList () {
      const pathList = ['instagram', 'youtube', 'blog', 'cafe', 'tiktok', 'live-commerce']
      return this.menuList.map((menu, index) => ({ id: pathList[index], name: menu, path: `/product/${pathList[index]}/list` }))
    }
  },
  watch: {
    channelId () {
      this.activeIndexUpdate()
    }
  },
  mounted () {
    this.activeIndexUpdate()
  },
  methods: {
    route () {
      const path = this.menuRouteList[this.activeIndex].path
      this.$router.push(path)
    },
    activeIndexUpdate () {
      const activeIndex = this.menuRouteList.findIndex(menu => menu.id === this.channelId)
      if (activeIndex !== -1) { this.activeIndex = activeIndex }

      this.$emit('input', this.channelId)
      this.$emit('input', this.channelId)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[category-nav] {

}

</style>
