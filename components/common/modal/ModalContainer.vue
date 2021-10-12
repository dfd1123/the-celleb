<template>
  <transition :name="'md-' + transitionMode">
    <div v-if="modals.length" modal-container>
      <component
        :is="modal.component"
        v-for="modal in modals"
        :key="modal.id"
        :options="modal.options"
        @close="() => resolve(modal.id, true)"
        @resolve="(result) => resolve(modal.id, result)"
        @reject="(result) => reject(modal.id, result)"
      />
    </div>
  </transition>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'ModalContainer',
  data () {
    return {
      seq: 0,
      modals: [],
      transitionMode: 'fade'
    }
  },
  mounted () {
    window.addEventListener('popstate', this.backEventController)
  },
  beforeDestroy () {
    window.removeEventListener('popstate', this.backEventController)
  },
  methods: {
    add (component, options) {
      if ((this.$route.hash || []).includes('modal')) {
        this.$router.replace(this.$route.path)
      }
      // this.$router.push({ hash: "#modal=" + component.name });
      this.transitionMode = options?.transitionMode || this.transitionMode

      return new Promise((resolve, reject) => {
        this.modals = _cloneDeep([
          ...this.modals,
          { id: this.seq++, component, resolve, reject, options }
        ])

        document.body.style.overflow = 'hidden'
        history.pushState(null, document.title, location.href)
      })
    },
    resolve (id, result) {
      this.modals.find(m => m.id === id).resolve(result)
      this.close(id)
    },
    reject (id, result) {
      result = result || {}
      this.modals.find(m => m.id === id).reject(result)
      this.close(id)
    },
    close (id) {
      this.modals = this.modals.filter(m => m.id !== id)

      if (this.modals.length === 0) {
        document.body.style.overflow = null
        document.body.style.touchAction = null
      }
    },
    backEventController () {
      if (this.modals && this.modals.length > 0) {
        this.modals.pop()
      }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[modal-container] { .fix; .lt(0,0); .z(10000); .wh(100%); }

/**
  * Transition
  */
.md-fade-enter-active,
.md-fade-leave-active {
  transition: opacity 0.21s;
}

.md-fade-enter,
.md-fade-leave-to {
  opacity: 0;
}

.md-zoom-enter-active,
.md-zoom-leave-active {
  animation-duration: 0.21s;
  animation-fill-mode: both;
  animation-name: md-zoom;
}

.md-zoom-leave-active {
  animation-direction: reverse;
}

@keyframes md-zoom {
  from {
    opacity: 0;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
</style>
