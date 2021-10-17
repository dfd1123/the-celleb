<template>
  <div search-control-box class="control-box">
    <div class="range-date-input">
      <DateInput :value="startDate" :range-end="endDate" @input="changeStartDate" /> <span>~</span> <DateInput :value="endDate" :range-start="startDate" @input="changeEndDate" />
    </div>
    <div class="search-inp">
      <TextInput v-model="text" :placeholder="searchPlaceholder" @enter="submitSearch" @input="updateText" />
      <cl-button type="purple">
        검색
      </cl-button>
    </div>
  </div>
</template>

<script>
import DateInput from '@/components/common/input/DateInput'
import TextInput from '@/components/common/input/TextInput'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'SearchControlBox',
  components: { DateInput, TextInput, ClButton },
  props: {
    startDate: { type: Number, default: undefined },
    endDate: { type: Number, default: undefined },
    searchText: { type: String, default: '' },
    searchPlaceholder: { type: String, default: '서비스 제목' }
  },
  data () {
    return {
      text: ''
    }
  },
  watch: {
    searchText: 'updateSearchText'
  },
  mounted () {
    this.updateSearchText()
  },
  methods: {
    changeStartDate (val) {
      const date = { startDate: val, endDate: this.endDate }

      this.$emit('change-date', date)
    },
    changeEndDate (val) {
      const date = { startDate: this.startDate, endDate: val }

      this.$emit('change-date', date)
    },
    submitSearch () {
      this.$emit('search')
    },
    updateSearchText () {
      this.text = this.searchText
    },
    updateText () {
      this.$emit('input', this.text)
    }
  }

}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[search-control-box] { .clear;
  [text-input] { .-a; box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    >input { .p(0,20); .fs(16); }
  }
  .range-date-input { .fl;
    [date-input] { .ib; .vam; }
    >span { .ib; .m(0,9); .vam; .fs(20,48); .c(#888); }
  }
  .search-inp{ .fr;
    [text-input] { .ib; .w(204); .vam; }
    [cl-button] { .ib; .ml(14); .vam;
      >button{ .wh(89,48); .fs(20); }
    }
  }
}
</style>
