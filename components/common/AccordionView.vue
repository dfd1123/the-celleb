<template>
  <div accordion-view :class="{'open':isOpen}">
    <input
      v-if="name"
      :id="`accord${uid}`"
      ref="accordInp"
      type="radio"
      class="accord-inp"
      :name="name"
      :value="uid"
      :checked="isOpen"
    >
    <input
      v-else
      :id="`accord${uid}`"
      ref="accordInp"
      type="checkbox"
      class="accord-inp"
      :value="uid"
      :checked="isOpen"
    >
    <div class="view-wrapper">
      <label :for="`accord${uid}`" class="no-drag" @click="clickHandler">
        <p v-if="title" class="title no-drag">
          {{ title }}
          <span class="angle-holder">
            <slot name="angle">
              <img src="~/assets/imgs/icon/ico-angle.svg" alt="angle">
            </slot>
          </span>
        </p>
        <slot v-else name="title" />
      </label>

      <div ref="accorContext" class="context" :style="`--accord-height:${contextHeight}px;`">
        <div ref="accorContextBox" class="context-box">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AccordionView',
  props: {
    /*
    name 값을 전달하면 input[type=radio]가 랜더링 되고
    같은 name 값을 전달받은 Accordion 중 하나만 열리고
    나머지는 다 닫히는 기능을 활성화 할 수 있습니다.
    */
    id: { type: [Boolean, String, Number], default: null },
    name: { type: String, default: null },
    title: { type: String },
    value: { type: [Boolean, String, Number, Array], default: null }
  },
  data () {
    return {
      model: null,
      contextHeight: 0,
      timer: -1,
      resizing: false,
      resizeObserve: null
    }
  },
  computed: {
    uid () {
      return this.id ?? this._uid
    },
    valueType () {
      return typeof this.uid
    },
    isOpen () {
      if (this.value === null) { return false } else if (!this.name) { return this.value.includes(this.uid) } else { return this.value === this.uid }
    }
  },
  mounted () {
    this.updateModel()
    window.addEventListener('resize', this.resizeHandler)
    this.resizeObserve = new ResizeObserver(() => this.resizeHandler(0))
    this.resizeObserve.observe(this.$refs.accorContextBox)
  },
  beforeDestroy () {
    this.resizeObserve.disconnect()
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    clickHandler (e) {
      let value
      const defaultValueObj = {
        number: -1,
        string: '',
        boolean: false
      }

      if (this.isOpen) {
        value = defaultValueObj[this.valueType]

        if (!this.name) {
          const arr = Array.isArray(this.value) ? this.value : []
          value = arr.filter(x => x !== this.uid)
        }

        e.preventDefault()
      } else {
        this.setBodyHeight()

        value = this.uid

        if (!this.name) {
          const arr = Array.isArray(this.value) ? this.value : []
          value = [...arr, this.uid]
        }

        if (this.value === null) {
          if (this.$el.classList.contains('open')) { this.$el.classList.remove('open') } else { this.$el.classList.add('open') }
        }
      }

      this.$emit('input', value)
    },
    setBodyHeight () {
      const agent = navigator.userAgent.toLowerCase()
      const isIE = (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || (agent.includes('msie'))
      const contextHeight = isIE ? 10000 : this.$refs.accorContext.scrollHeight
      if (this.contextHeight !== contextHeight) { this.contextHeight = contextHeight }
    },
    resizeHandler () {
      this.setBodyHeight()
    },
    updateModel () {
      this.model = this.value
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj.less';

[accordion-view] {

  input.accord-inp { .hide;
    &:checked {
      ~ .view-wrapper {
        .context { max-height: var(--accord-height); transition: max-height 0.3s;}
        .title {
          .default-angle { .t-r(-180deg); }
        }
      }
    }
  }

  .view-wrapper { .bgc(transparent);
    > label { .block; .p(10, 10); .-b(#DDD); .pointer; }
  }
  .title { .rel;
    .angle-holder { .abs; .rt(0, 0); .z(1); .h(100%); .flex-center; .p(10, 0); }
    .default-angle { .wh(13, 13); transition: transform 0.3s;
      path {stroke: #000;}
    }
  }
  .context { .crop; .max-h(0); transition: max-height 0.3s;
    .context-box { .p(10); .-b(#DDD); .bgc(#EEE); }
  }

  @keyframes accordion-ani {
    from { }
  }
}
</style>
