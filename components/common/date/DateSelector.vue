<template>
  <div date-selector :class="theme">
    <div v-if="m" class="date-selector-header">
      <!--      <button @click="move(-1, 'year')">-->
      <!--        <svg-double-angle />-->
      <!--      </button>-->
      <span>{{ m.format('YYYY년 MM월') }}</span>
      <div class="arrow-btn-holder">
        <button v-wave class="prev" @click="move(-1, 'month')">
          <img src="~/assets/imgs/icon/ico-circle-arrow.svg" alt="angle">
        </button>
        <button v-wave class="next" @click="move(1, 'month')">
          <img src="~/assets/imgs/icon/ico-circle-arrow.svg" alt="angle">
        </button>
      </div>
      <!--      <button @click="move(1, 'year')">-->
      <!--        <svg-double-angle />-->
      <!--      </button>-->
    </div>
    <Calendar
      :month="month"
      :selected="value"
      :range-start="rangeStart"
      :range-end="rangeEnd"
      :theme="theme"
      @select="onSelect"
    />
  </div>
</template>

<script>
import moment from 'moment'
import Calendar from '@/components/common/date/Calendar'
import ComponentModel from '@/mixin/ComponentModel'

export default {
  name: 'DateSelector',
  components: { Calendar },
  mixins: [ComponentModel({
    event: 'select',
    update: 'updateModel'
  })],
  props: {
    value: {},
    rangeStart: String,
    rangeEnd: String,
    theme: String
  },
  data () {
    return {
      selected: null,
      m: null,
      month: null
    }
  },
  methods: {
    updateModel () {
      this.m = moment(this.value || undefined)
      if (this.value) { this.selected = this.m.format('YYYY-MM-DD') }
      this.m.set({ date: 1 })
      this.month = this.m.format('YYYY-MM')
    },
    move (d, unit) {
      this.m.add(d, unit)
      this.month = this.m.format('YYYY-MM')
    },
    onSelect (v) {
      this.$emit('select', v)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';
[date-selector] { .c(@title-black);
  .date-selector-header { .rel; .h(45); .fs(20, 45); .mb(25);
    > * {.vam;}
    >span { .fs(24,29); .c(#222); .semi-bold; }
    .arrow-btn-holder{ .abs; .rt(0,0); .z(1);
      button { .crop; .br(50%); .pointer;
        &.prev { .t-r(0deg); }
        &.next { .ml(10); .t-r(180deg); }
        >img { .vam; }
        svg { .w(24);
          .stroke-target { stroke: #191919; }
        }
        //&:nth-of-type(1) {.l(24); .t-r(0deg);}
        //&:nth-of-type(2) {.l(55); .t-r(90deg);}
        //&:nth-of-type(3) {.r(55); .t-r(-90deg);}
        //&:nth-of-type(4) {.r(24); .t-r(-90deg);}
      }
    }
  }
  &.dark {
    .date-selector-header {
      >span { .c(white); }
      button {
        svg { .w(24);
          .stroke-target { stroke: white; }
        }
      }
    }
  }
}
</style>
