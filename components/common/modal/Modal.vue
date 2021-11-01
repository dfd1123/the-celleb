<template>
  <div modal :class="[size]">
    <div class="dim" @click="close" />
    <div class="panel">
      <div class="contents">
        <div class="header">
          <h6 class="title">
            <slot name="title" />
          </h6>
          <button v-if="closeBtn" class="close-btn" @click="close">
            <img src="~/assets/imgs/icon/ico-modal-close.svg" alt="close">
          </button>
        </div>
        <div class="body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    size: { type: String, default: 'normal' },
    closeBtn: { type: Boolean, default: false }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[modal] { .flex-center; .fix; .lt(0,0); .z(1); .wh(100%);
  .dim{ .abs; .lt(0,0); .z(1); .wh(100%); .bgc(rgba(0,0,0,0.5)); }
  .panel { .rel; .z(2); .max-w(685); .max-h(752); .w(100%); .tc;
    .contents { .p(39, 50); .bgc(#fff); .tl; .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04); }
    .header { .rel; .mb(31);
      .title { .fs(28,33); .c(@title-black); .semi-bold; }
      .close-btn { .abs; .rt(0,0); .z(1);
        > img{ .vam; }
      }
    }
  }

  &.small {
    .panel { .max-w(400); }
  }
}
</style>
