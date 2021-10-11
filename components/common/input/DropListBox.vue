<template>
  <div drop-list :class="[convertDirection, className, {mounted, animated, 'on': showList}]" :style="elStyle">
    <ul ref="listBox" class="list-box">
      <li
        v-for="(item, index) in (showList || [])"
        :key="`list-${index}${uid}`"
        :class="{'active': value === (item.value || item)}"
        @mousedown.left="clickListHandler(item)"
        v-html="item.label || item"
      />
      <li v-show="!showList.length" class="none-data">
        리스트가 존재하지 않습니다.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DropListBox',
  props: {
    callComponent: { type: Object, required: true },
    list: { type: [Array, Object], default: () => [] },
    value: { type: [Number, Boolean, String, Array] },
    className: { type: String, default: '' },
    direction: { type: String, default: 'down' }
  },
  data () {
    return {
      animated: false,
      mounted: false,
      styles: {},
      listHeight: 0,
      pageYOffset: 0,
      convertDirection: '',
      showList: null,
      clicked: false
    }
  },
  computed: {
    uid () {
      return this._uid
    },
    elStyle () {
      const { top, left, width, height } = this.styles

      // if (this.isMobile) return '';

      if (this.direction === 'up') { return `top: ${top + this.pageYOffset - this.listHeight}px; left:${left}px; width: ${width}px; z-index: ${this.zIndex};` }
      return `top: ${top + height + this.pageYOffset}px; left:${left}px; width: ${width}px; z-index: ${this.zIndex};`
    },
    zIndex () {
      let maxZindex = 3
      let component = this.callComponent

      while (component.$parent) {
        const element = component.$el
        const zIndex = element.style.zIndex || getComputedStyle(element).getPropertyValue('z-index')

        if (zIndex !== 'auto' && Number(zIndex) > maxZindex) { maxZindex = Number(zIndex) }

        component = component.$parent
      }

      return maxZindex + 1
    },
    isMobile () {
      return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
    }
  },
  created () {
    this.mounted = true
    this.showList = this.list
  },
  async mounted () {
    await this.renderingHtml()
    this.pageYOffset = window.pageYOffset
    this.$nextTick(() => {
      this.listHeight = this.$refs.listBox.offsetHeight
      this.autoDirection()
      this.setListScrollYOffset()
    })
  },
  beforeDestroy () {
    const dropBoxWrap = document.querySelector('#drop-box-wrap')
    dropBoxWrap.removeChild(this.$el)
  },
  methods: {
    renderingHtml () {
      const { top, bottom, left, right, width, height } = this.callComponent.$el.getBoundingClientRect()
      this.styles = { top, bottom, left, right, width, height }

      let dropBoxWrap = document.querySelector('#drop-box-wrap')
      if (!dropBoxWrap) {
        dropBoxWrap = document.createElement('div')
        dropBoxWrap.setAttribute('id', 'drop-box-wrap')
        document.body.appendChild(dropBoxWrap)
      }
      dropBoxWrap.appendChild(this.$el)
    },
    clickListHandler (item) {
      const value = item

      if (Array.isArray(this.value)) {
        let arr = this.value
        if (!arr.includes(value)) { arr.push(value) }
        arr = [...new Set(arr)] // 요소가 객체일 경우를 대비해서 중복 제거
        this.callComponent.change(arr)
      } else {
        this.callComponent.change(value)
      }

      this.clicked = true
    },
    autoDirection () {
      if (this.direction === 'up') {
        this.convertDirection = 'up'
      } else {
        const { top, height } = this.styles
        const listHeight = this.listHeight
        const pageBottomOffset = window.pageYOffset + window.innerHeight

        if ((top + window.pageYOffset + height + listHeight) > pageBottomOffset) {
          this.convertDirection = 'up'
          this.callComponent.$el.classList.remove('down')
          this.callComponent.$el.classList.add('up')
          this.$el.style.top = `${top + pageYOffset - listHeight}px`
        } else {
          this.convertDirection = 'down'
        }
      }
      setTimeout(() => {
        this.animated = true
      }, 50)
    },
    setListScrollYOffset () {
      const scrollBody = this.$refs.listBox
      const selectedItem = scrollBody.querySelector('li.active')
      if (selectedItem) {
        scrollBody.scrollTop = selectedItem.offsetTop
      }
    },
    changeValue (val) {
      this.showList = val
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[drop-list] { .crop; .abs; .lt(0, 0); .z(3); .w(100%); .max-h(0); .br(4); visibility: hidden;
  &.animated { transition: none;
    &.down { transform: translateY(0); .max-h(200); .o(1); }
    &.up{ transform: translateY(0); .o(1); .max-h(200);  }
  }
  &.on {  visibility: visible;  }
  &.up{ transform: translateY(100px); .o(0); transition: transform 0.2s, opacity 0.2s; }
  &.down { .mt(6); transform: translateY(-100px); .o(0); transition: max-height 0.5s, transform 0.4s, opacity 0.2s; }
  //&.mobile { .fix; .lt(0, 0); .z(100000); .flex; .flex-jc; .flex-ai; .wh(100%); .max-h(100%); .mt(0); .bgc(rgba(0, 0, 0, 0.5));
  //  .list-box { .w(95%); .max-w(290); .max-h(300); }
  //  &.down { .max-h(100%); }
  //  &.up{ transform: translateY(0); .o(1); .max-h(100%);  }
  //}
  //&:not(.mobile){
  //  &.up{ transform: translateY(100px); .o(0); transition: transform 0.2s, opacity 0.2s; }
  //  &.down { transition: max-height 0.2s; }
  //}
  .list-box { .crop; .max-h(200); .p(15, 0); .bgc(#fff); .-a(#eee); overflow: auto;
    li { .p(0, 10); .fs(14, 40px); .pointer; .c(#787781);
      &:hover { .bgc(#eee); }
      &.none-data{ .p(15,0);  cursor: default; .tc;
        &:hover { .bgc(transparent); }
      }
    }
  }

  &::-webkit-scrollbar { .w(0); }
  &::-webkit-scrollbar-track { .bgc(transparent); }
  &::-webkit-scrollbar-thumb { .bgc(transparent); .br(2); }
  &::-webkit-scrollbar-thumb:hover { .bgc(transparent); }
}
</style>
