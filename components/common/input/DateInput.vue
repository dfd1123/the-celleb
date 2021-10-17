<template>
  <div date-input>
    <div ref="dateInput" class="date-input" @click="dateModalOpen">
      <img src="~/assets/imgs/icon/ico-calendar.svg" alt="">
      <TextInput :value="dateValueFormat" :placeholder="convertPlaceholder" :readonly="dateModal" :class="{error}" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import TextInput from '@/components/common/input/TextInput'
import DateTimeModal from '@/components/common/modal/DateTimeModal'

export default {
  name: 'DateInput',
  components: { TextInput },
  props: {
    value: {
      type: [Number, String],
      default: undefined
    },
    rangeStart: {
      type: [Number, String],
      default: undefined
    },
    rangeEnd: {
      type: [Number, String],
      default: undefined
    },
    placeholder: {
      type: String,
      default: ''
    },
    dateFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    dateModal: {
      type: Boolean,
      default: true
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modalDateFormat: {
        date: '',
        time: ''
      }
    }
  },
  computed: {
    useTime () {
      // eslint-disable-next-line prefer-regex-literals
      const timeFormat = new RegExp('HH|hh|mm|dd', 'g')
      return timeFormat.test(this.dateFormat)
    },
    convertPlaceholder () {
      if (this.placeholder) { return this.placeholder }

      if (this.useTime) { return '0000-00-00 00:00' } else { return '0000-00-00' }
    },
    dateValueFormat () {
      if (this.value) {
        return moment(this.value || undefined).format(this.dateFormat)
      }
      return ''
    },
    rangeStartFormat () {
      if (this.rangeStart) {
        return moment(this.rangeStart).format(this.dateFormat)
      }

      return null
    },
    rangeEndFormat () {
      if (this.rangeEnd) {
        return moment(this.rangeEnd).format(this.dateFormat)
      }

      return null
    }
  },
  methods: {
    async dateModalOpen () {
      if (!this.dateModal) { return }

      const resultDate = await this.$modal(DateTimeModal, {
        time: moment(this.value ?? undefined).format(this.dateFormat),
        useTime: this.useTime,
        rangeStart: this.rangeStartFormat,
        rangeEnd: this.rangeEndFormat,
        theme: 'manage-datetime black'
      })

      console.log(resultDate)

      const validateDate = await this.validateDate(resultDate)

      if (!validateDate) { return }

      this.$emit('input', resultDate)
    },
    validateDate (millisecond) {
      if (!millisecond) {
        this.$emit('input', '')
        return false
      }

      if (this.rangeStart && millisecond <= this.rangeStart) {
        this.dateModalOpen()
        this.$toast(`${this.rangeStartFormat} 이후 날짜부터 선택할 수 있습니다.`, { type: 'fail' })
        return false
      }

      if (this.rangeEnd && millisecond >= this.rangeEnd) {
        this.dateModalOpen()
        this.$toast(`${this.rangeStartFormat} 이전 날짜까지만 선택할 수 있습니다.`, { type: 'fail' })
        return false
      }

      return true
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[date-input] { .max-w(200);
  .date-input { .rel;
    >img { .abs; .rt(11,32%); .z(1); }
    [text-input] { .h(48); .contain('~assets/imgs/icon/ico-calendar.svg'); .bg-xy(90%, 50%); .bg-s(17, 17);
      > input { .p(0, 20); .pr(40); .fs(16, 48); .c(#999); }
    }
  }
}
</style>
