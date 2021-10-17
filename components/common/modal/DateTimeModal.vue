<template>
  <Modal v-if="ymdModel && timeModel" date-time-modal size="small" @close="close" @resolve="resolve">
    <div class="box" :class="{time:options.useTime}">
      <div class="calendar">
        <DateSelector v-model="ymdModel" :range-start="rangeStart" :range-end="rangeEnd" :theme="options.theme" @select="resolve" />
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/common/modal/Modal'
import DateSelector from '@/components/common/date/DateSelector'
import { getEnHM, getHM, getYMD, getTime } from '@/utils/timeUtils'

export default {
  name: 'DateTimeModal',
  components: { DateSelector, Modal },
  props: {
    options: { type: Object, default: null }
  },
  data () {
    return {
      ymdModel: null,
      timeModel: null
    }
  },
  computed: {
    ampm () {
      let v = this.options.time
      v = Number(v.slice(0, 2))
      return v < 12 ? 'AM' : 'PM'
    },
    ymd () {
      return getYMD(`${this.ymdModel} ${this.timeModel}`)
    },
    hm () {
      return getHM(`${this.ymdModel} ${this.timeModel}`)
    },
    enHm () {
      return getEnHM(`${this.ymdModel} ${this.timeModel}`)
    },
    millisecond () {
      return getTime(`${this.ymdModel} ${this.timeModel}`)
    },
    rangeStart () {
      return this.options?.rangeStart
    },
    rangeEnd () {
      return this.options?.rangeEnd
    }
  },
  watch: {
    ymd () {
      this.timeModel = this.hm
    }
  },
  mounted () {
    this.ymdModel = this.options.time ? getYMD(this.options.time) : getYMD()
    this.timeModel = this.options.time ? getHM(this.options.time) : getHM()
  },
  methods: {
    close () {
      this.$emit('close')
    },
    resolve () {
      this.$emit('resolve', this.millisecond)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj.less';

[date-time-modal] { .z(101);
  .panel{
    .header { .hide; }
    .contents{ .p(30,10); }
  }
  &.light .panel {.bgc(transparent); .br(0); box-shadow: none;
    .header { .hide; }
    .scroll-area {.p(0);}
  }
  &.dark {
    .box {
      .result, .calendar, .timer, .bts-confirm { .bgc(#161a1d);}
      .bts-confirm {
        button {
          &:nth-of-type(3) {.bgc(#C71F1F); .c(white);}
        }
      }
    }
  }
  button {.bgc(transparent);}
  .box {
    .result {
      &:after {.cnt;.abs; .lb(50%, -1); .t-xc; .bgc(@gray); width: calc(100% - 30px); .h(2);}
    }
    .calendar {.br-t(20); .bgc(white); overflow: hidden; .rel; .p(0, 20); .pb(20); .-box;
    }
    .timer { .wh(100%, 160); .br(20); .bgc(white); .ib-list; overflow: hidden; .-box; .rel; .pt(40);
      [time-selector] { .wh(350, 120); .abs; .lt(50%, 40); .t-xc;}
    }
    .bts-confirm { .bgc(white); .tc; .pt(40); .-box; .br-b(20); .pb(20);
      &.hide-return {
        button { .w(160);
          &:nth-of-type(1) { .hide; }
        }
      }
      button {.wh(104, 48); .fs(15, 48); .br(24); .bgc(@gray);
        &:nth-of-type(1) {.c(#787781);}
        &:nth-of-type(2) {.c(#787781); .m(0, 10);}
        &:nth-of-type(3) {.c(white); .bgc(black); }
      }
    }
    &.time {
      .calendar {.br(20);}
      .timer {.br-t(20);}
    }
  }
}
</style>
