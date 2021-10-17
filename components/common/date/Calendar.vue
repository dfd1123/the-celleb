<template>
  <table calendar :class="theme">
    <colgroup>
      <col width="auto">
    </colgroup>
    <thead>
      <tr>
        <td v-for="day in weekdays" :key="day">
          {{ day }}
        </td>
      </tr>
    </thead>
    <tbody v-if="row">
      <div class="spacer" />
      <tr v-for="i in row" :key="i">
        <td v-for="d in weekData(i)" :key="d.ymd" :class="{ past: today > d.ymd, today: today === d.ymd, selected: selectedYMD === d.ymd, ext: d.ext, out: d.out }" :disabled="d.out" @click="select(d)">
          <span v-if="!hideExt || d.ext">{{ d.dto.getDate() }}</span>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="7" class="no-month">
          Month required
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Calendar',
  props: {
    month: String, // 'YYYY-MM'
    selected: {},
    rangeStart: {
      type: String,
      default: ''
    },
    rangeEnd: {
      type: String,
      default: ''
    },
    hideExt: { type: Boolean, default: false },
    theme: String
  },
  data () {
    return {
      weekdays: ['일', '월', '화', '수', '목', '금', '토'],
      arg: null,
      startDay: null,
      lastDate: null,
      row: null,
      ym: null
    }
  },
  computed: {
    today () {
      return +moment().format('YYYYMMDD')
    },
    selectedYMD () {
      return this.parseDate(this.selected)
    },
    rangeStartYMD () {
      return this.parseDate(this.rangeStart)
    },
    rangeEndYMD () {
      return this.parseDate(this.rangeEnd)
    }
  },
  watch: {
    month: 'applyMonth'
  },
  mounted () {
    this.applyMonth()
  },
  methods: {
    parseDate (dateString) {
      if (!dateString) { return null }
      let m
      if (dateString === 'today') { m = moment() } else {
        const matched = String(dateString).match(/^([+-]?\d+)\s+(day|month|week|year)$/)
        m = matched ? moment().add(+matched[1], matched[2]) : moment(dateString)
      }
      return +m.format('YYYYMMDD')
    },
    getBaseDTO () {
      return new Date(this.arg[1], this.arg[2] - 1, 1)
    },
    getDTO (r, c) {
      const dto = this.getBaseDTO()
      dto.setDate((((r - 1) * 7) + c + 1) - this.startDay)
      return dto
    },
    dateData (r, c) {
      const dto = this.getDTO(r, c)
      const m = moment(dto)
      const ymd = +m.format('YYYYMMDD')
      const ext = this.month !== m.format('YYYY-MM')
      const out = (this.rangeStart && this.rangeStartYMD > ymd) || (this.rangeEnd && this.rangeEndYMD < ymd)
      return { dto, m, ymd, ext, out }
    },
    weekData (r) {
      return [...Array(7)].map((_, c) => this.dateData(r, c))
    },
    applyMonth () {
      if (this.month) {
        this.arg = String(this.month).match(/^(\d{4})-(\d{2})$/)
        if (!this.arg) { throw new Error('invalid month format (YYYY-MM)') }
        const dto = this.getBaseDTO()
        this.startDay = dto.getDay()
        dto.setMonth(dto.getMonth() + 1)
        dto.setDate(0)
        this.lastDate = dto.getDate()
        this.row = Math.ceil((this.startDay + this.lastDate) / 7)
      }
    },
    select (d) {
      if (d.out) { return }
      if (this.hideExt && d.ext) { return }
      this.$emit('select', d.m.format('YYYY-MM-DD'))
    }
  }
}
</script>

<style lang="less">
@import "~@/assets/less/proj";
[calendar] { .w(100%); border-collapse: collapse; border-spacing: 0;
  thead {
    td { .pb(0); .c(#1302e6); .medium; }
  }
  tbody {
    .spacer { .h(10px); }
    td {.pt(20); .pointer;.rel; .h(42); .-box; .pointer;
      span {.abs; .w(100%); .tc; .lb(0, 50%); .t-y(50%); z-index: 1;}
      &:hover { .c(white);
        &:before {.cnt; z-index: 0; .abs; .wh(32); .bgc(#5d12fa); .br(16); .lt(50%, 50%); .t-xyc; .o(0.4); }
      }
      &.selected { .rel;
        span {.c(white);}
        &:before {.cnt; z-index: 0; .abs; .wh(32); .bgc(#5d12fa); .br(16); .lt(50%, 50%); .t-xyc;}
      }
      &.out { cursor: not-allowed;
        span { .o(.3); }
        &:hover { .c(@title-black);
          &:before { .hide; }
        }
      }
      &.ext { .bgc(#fff);
        span { .o(.4); }
      }
    }
  }
  td {.tc;}
  &.dark {
    thead {
      td { .c(white); }
    }
    tbody {
      td { .c(white);
        &.selected { .rel;
          span {.c(white);}
          &:before {.cnt; z-index: 0; .abs; .wh(32); .bgc(#C71F1F); .br(16); .lt(50%, 50%); .t-xyc;}
        }
        &.ext { .bgc(transparent);
          span { .o(.4); }
        }
      }
    }
  }
}
</style>
