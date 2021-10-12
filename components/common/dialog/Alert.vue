<template>
  <div alert class="dialog-holder">
    <div class="context">
      <div v-if="type === 'success'" class="success">
        <img src="~assets/imgs/icon/ico-success-check.svg" alt="success">
      </div>
      <div v-if="alert.title" class="title">
        <h5>{{ alert.title }}</h5>
      </div>
      <div class="message">
        <p v-html="alert.message" />
      </div>
    </div>
    <div class="btns">
      <cl-button v-if="alert.button" :type="type === 'success' ? 'purple' : 'red'" @click="clickButton(true)">
        {{ alert.button.text }}
      </cl-button>
    </div>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'

export default {
  name: 'Alert',
  components: { ClButton },
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      alert: {
        title: '',
        message: '',
        button: {
          text: '확인'
        }
      }
    }
  },
  computed: {
    type () {
      return this.option.type || 'success'
    }
  },
  mounted () {
    this.resetState()
  },
  methods: {
    resetState () {
      this.alert = { ...this.alert, ...this.option }
    },
    clickButton (status) {
      this.$emit('resolve', status)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[alert] { .p(38.4,59);

  .context{
    .title{ .mt(14.6); .mb(7);
      h5{ .fs(30,36); .c(@gray); .semi-bold; }
    }
    .message{
      >p{ .mb(41); .fs(18,21); .c(#999); }
    }
  }

  .btns{
    [cl-button]{ .wh(100%, 60);
      > button{ .wh(100%); .fs(20); }
    }
  }
}
</style>
