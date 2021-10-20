<template>
  <div confirm :class="['dialog-holder', variant]">
    <div class="context">
      <div v-if="icon" class="confirm-icon">
        <img :src="icon" alt="confirm icon">
      </div>
      <div v-if="confirm.title" class="title">
        <h5>{{ confirm.title }}</h5>
      </div>
      <div class="message">
        <p v-html="confirm.message" />
      </div>
    </div>
    <div v-if="confirm.button" class="btns">
      <cl-button
        v-if="confirm.button.no"
        type="light-gray"
        class="btn-no"
        @click="clickButton(confirm.button.no.value)"
      >
        {{ confirm.button.no.text }}
      </cl-button>
      <cl-button
        v-if="confirm.button.yes"
        type="purple"
        class="btn-yes"
        @click="clickButton(confirm.button.yes.value)"
        @keypress.up="clickButton(confirm.button.yes.value)"
      >
        {{ confirm.button.yes.text }}
      </cl-button>
    </div>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'

export default {
  name: 'Confirm',
  components: { ClButton },
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      confirm: {
        title: '',
        message: '',
        button: {
          yes: {
            text: '예',
            value: true
          },
          no: {
            text: '아니오',
            value: false
          }
        }
      }
    }
  },
  computed: {
    icon () {
      return this.confirm.icon || ''
    },
    variant () {
      return this.option.variant || ''
    }
  },
  mounted () {
    this.resetState()
  },
  methods: {
    resetState () {
      this.confirm = { ...this.confirm, ...this.option }
    },
    clickButton (status) {
      this.$emit('resolve', status)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[confirm] { .max-w(496); .w(100%);  .p(47, 53, 38);
  .confirm-icon{ .mb(21); }
  .title {
    h5 { .fs(30, 36); .c(#505050); .bold; }
  }

  .message {
    > p { .mt(7); .mb(40); .fs(18, 21); .c(#999999); }
  }

  .btns { .crop;
    [cl-button] { width: calc((100% / 2) - 16px); .h(60);
      &.btn-no { .mr(8); }
      &.btn-yes { .ml(8); }
      > button { .fl; .wh(100%, 60); .br(5); .fs(20);
      }
    }
  }
}
</style>
