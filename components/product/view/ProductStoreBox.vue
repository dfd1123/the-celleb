<template>
  <div product-store-box>
    <div class="store-profile">
      <img :src="store.image" alt="store-profile">
    </div>
    <p class="name">
      {{ store.influencer_name || '-' }}
    </p>
    <cl-button type="line" class="qna-btn" @click="qnaModalOpen">
      문의 남기기
    </cl-button>
    <p class="introduce">
      {{ store.intro || '-' }}
    </p>
  </div>
</template>

<script>
import QnaSubmitModal from '@/components/product/modal/QnaSubmitModal'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'ProductStoreBox',
  components: { ClButton },
  props: {
    store: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    qnaModalOpen () {
      this.$modal(QnaSubmitModal, { store: this.store })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-store-box] { .p(40); .bgc(#FFFFFF); .-a(#D9D9D9); .br(7);
  .store-profile { .wh(96); .mh-c; .br(50%);
    > img { .wh(100%); .vam; object-fit: cover; object-position: center; }
  }
  .name { .mt(19); .mb(31); .fs(24, 29); .c(@title-black); .tc; }
  [cl-button] { .w(100%);
    &.qna-btn {
      > button { .wh(100%, 60); .fs(20); .c(@gray); }
    }
  }
  .introduce { .m(24, 0); .fs(15, 23); .c(#999999); .regular; }
}

</style>
