<template>
  <div toast-container>
    <transition-group name="toast">
      <div v-for="toast in toastStack" :key="toast.id" @click="remove(toast.id)">
        <Success v-if="toast.type === 'success'" :toast="toast" />
        <Fail v-else :toast="toast" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import Success from './Success'
import Fail from './Fail'

export default {
  name: 'ToastContainer',
  components: { Success, Fail },
  data () {
    return {
      seq: 0,
      toastStack: [],
      intervalId: -1,
      fullscreen: false,
      fullscreenStyle: {},
      toastHolder: null
    }
  },
  methods: {
    toast (message, { type = 'success', dura = 1500 } = {}) {
      this.seq += 1
      this.toastStack.push({ message, type, id: this.seq })
      this.remove(this.seq, dura)
    },
    remove (id, dura = 0) {
      setTimeout(() => {
        this.toastStack = this.toastStack.filter(t => t.id !== id)
      }, dura)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';
[toast-container] { .fix; .wf; .lt; .z(11000); .h(0); .fs(14); .c(#000);
  >span{ .block; .wh(100%,0); .tc;
    >div{ display:table; .mh-c; .pointer; }
  }
  .toast-enter-active{ animation: toast-in .3s; }
  .toast-leave-active{ animation: toast-in .3s reverse; }
}

@keyframes toast-in {
  0% { .o(0); transform: translateY(-30px); }
  100% { .o(1); transform: translateY(0px); }
}
</style>
