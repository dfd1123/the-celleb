<template>
  <div slide-tab-nav>
    <div class="ca-nav-con inner-holder">
      <span v-for="(menu, index) in menuList" :key="`menu-${index}`" :data-index="index" class="menu" @click="menuClick(index)">
        <router-link v-if="menu.path" :to="menu.path" :class="{'on': menu.path === $route.path}">
          {{ menu.name }}
        </router-link>
        <a v-else :class="{'on': model === index}">
          {{ menu }}
        </a>
      </span>
      <div ref="slideBar" class="slide-bar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideTabNav',
  props: {
    value: { type: Number, default: 0 },
    /** @returns {[{name: string, path: string}]} */
    menuList: { type: Array, default: () => [] }
  },
  data () {
    return {
      model: 0
    }
  },
  watch: {
    value () {
      this.update()
      this.drawSlider()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.update()
      this.drawSlider()
    })
  },
  methods: {
    drawSlider () {
      const menuEls = document.querySelectorAll('[slide-tab-nav] .menu')
      const targetEl = menuEls[this.model].children[0]

      if (targetEl.nodeName !== 'A') { return false }

      const offsetLeft = targetEl.offsetLeft
      const clientWidth = targetEl.clientWidth

      this.$refs.slideBar.style.transform = `translateX(${offsetLeft}px)`
      this.$refs.slideBar.style.width = `${clientWidth}px`
    },
    menuClick (index) {
      this.$emit('input', index)
      this.$emit('change', index)
    },
    update () {
      this.model = this.value
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[slide-tab-nav] { .no-drag; .-b(#EEEEEE, 2);
  .ca-nav-con { .rel; .pt(14);
    > span {
      > a { .no-drag; .ib; .mr(40); .p(18, 0); .fs(18, 22); .c(@light-gray); .pointer;
        &.on{ .c(@purple); .bold; }
      }
    }
    .slide-bar { .abs; .lb(0, -2); .z(1); .h(2); .bgc(@purple); transition: all 0.3s; }
  }
}
</style>
