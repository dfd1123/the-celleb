<template>
  <div v-if="totalCount > 0" pagination :class="theme">
    <div class="page-holder">
      <span class="left" :class="{invisible: now === 0}">
        <button :disabled="now === 0" @click="$emit('change', 0)"><img src="~/assets/imgs/icon/ico-double-angle.svg"></button>
      </span>
      <a v-for="cursor in cursors" :key="cursor" :class="{active: cursor === now}" @click="$emit('change', cursor)">{{ cursor + 1 }}</a>
      <span class="right" :class="{invisible: now === last}">
        <button :disabled="now === last" @click="$emit('change', last)"><img src="~/assets/imgs/icon/ico-double-angle.svg"></button>
      </span>
    </div>
  </div>
</template>

<script>
import { range } from '@/utils/commonUtils'

export default {
  name: 'Pagination',
  props: {
    list: { type: Array, default: () => [] },
    currentCursor: { type: Number, default: 0 },
    chunkSize: { type: Number, required: true },
    showSize: { type: Number, default: 5 },
    totalCount: { type: Number, default: 0 },
    theme: { String: Number, default: 'gray' }
  },
  computed: {
    now () {
      return this.currentCursor
    },
    last () {
      return Math.ceil(this.totalCount / this.chunkSize) - 1
    },
    start () {
      return Math.max(0, Math.min(this.now - Math.floor((this.showSize - 1) / 2), this.last - this.showSize + 1))
    },
    end () {
      return Math.min(this.last, this.start + this.showSize - 1)
    },
    cursors () {
      return range(this.start, this.end)
    }
  }
}
</script>

<style lang="less">
@import "~@/assets/less/proj";
[pagination] { .mt(60); .mb(173); .tc;
  .page-holder { .ib; .br(4); .-a(#d9d9d9); }
  button { .wh(35, 40); .vam; .lh(0);
    svg { .w(11);
      .stroke-target { stroke: #777; }
    }
    //@{hover-press} {
    //  svg {
    //    .stroke-target { stroke: #fff; }
    //  }
    //}
  }
  button + button { .ml(10); }
  a { .vam; .ib; .rel; .wh(40, 40); .p(0,2); .fs(18, 40); .c(#aaa); .light; .-r(#d9d9d9); .pointer;
    &:nth-of-type(1) { .-l(#d9d9d9); }
    //@{hover-press} { .o(1); }
    &.active { .c(#fff); .semi-bold; .bgc(@strong-purple); }
  }
  a + a { .ml(0); }
  .left button { .t-r(180deg);
    img{ .mr(5); .vam; }
  }
  .right button { .t-r(0deg);
    img{ .ml(-2); .vam; }
  }
  .invisible { .o(0.2); pointer-events: none; }

  &.dark {
    button {
      svg {
        .stroke-target { stroke: @title-black; }
      }
      //@{hover-press} {
      //  svg {
      //    .stroke-target { stroke: black; }
      //  }
      //}
    }
    a { .c(@gray); .o(0.4);
      //@{hover-press} { .o(1); }
      //&.active { .o(1);
      //  &:after {.cnt; .abs; .lb; .wh(100%, 1); .bgc(black);}
      //}
    }
  }
}
</style>
