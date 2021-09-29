<template>
  <div sub-top-nav>
    <div class="ca-nav-con inner-holder">
      <span v-for="(menu, index) in menuList" :key="`menu-${index}`" class="menu" @click="menuClick">
        <router-link :to="menu.path" :class="{'on': menu.path === $route.path}">
          {{ menu.name }}
        </router-link>
      </span>
      <div ref="slideBar" class="slide-bar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubTopNav',
  props: {
    /** @returns {[{name: string, path: string}]} */
    menuList: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      const targetEl = document.querySelector('[sub-top-nav] .menu > a.on')

      this.menuClick({ target: targetEl })
    },
    menuClick ({ target }) {
      const targetEl = target
      if (targetEl.nodeName !== 'A') { return false }

      const offsetLeft = targetEl.offsetLeft
      const clientWidth = targetEl.clientWidth

      this.$refs.slideBar.style.transform = `translateX(${offsetLeft}px)`
      this.$refs.slideBar.style.width = `${clientWidth}px`
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[sub-top-nav] { .no-drag; .-b(#EEEEEE, 2);
  .ca-nav-con { .rel; .mt(14);
    > span {
      > a { .no-drag; .ib; .mr(40); .p(18, 0); .fs(18, 22); .c(@light-gray);
        &.on{ .c(@purple); .bold; }
      }
    }
    .slide-bar { .abs; .lb(0, -1); .z(1); .h(2); .bgc(@purple); transition: all 0.3s; }
  }
}
</style>
