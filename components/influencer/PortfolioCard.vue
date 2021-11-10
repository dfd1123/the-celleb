<template>
  <div portfolio-card>
    <div class="image" @click="portfolioModalOpen">
      <img :src="item.main_image" alt="asdasd">
    </div>
    <div class="info">
      <h6 class="name" @click="portfolioModalOpen">
        {{ item.title }}
      </h6>
      <p class="intro" @click="portfolioModalOpen" v-html="item.description.replace(/\n/gi, '<br>')" />
      <span class="naver-ad-no" @click="portfolioModalOpen">#{{ item.naver_no }} 네이버 검색광고</span>
      <cl-button type="gray" class="edit-btn" @click="portfolioEditModalOpen">
        관리
      </cl-button>
    </div>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'
import PortfolioModal from '@/components/influencer/modal/PortfolioModal'
import PortfolioInfoSubmitModal from '@/components/influencer/modal/PortfolioInfoSubmitModal'

export default {
  name: 'PortfolioCard',
  components: { ClButton },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      store: null
    }
  },
  computed: {
    influencerId () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getStoreInfo()
  },
  methods: {
    async getStoreInfo () {
      this.store = await this.$api.get(`/users/${this.influencerId}`)
    },
    portfolioModalOpen () {
      this.$modal(PortfolioModal, { portfolio: this.item })
    },
    portfolioEditModalOpen () {
      this.$modal(PortfolioInfoSubmitModal, { portfolio: this.item })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[portfolio-card]{ .clear;  .mb(28); .p(10,0); .bgc(#fff); .pointer; transition: background-color 0.2s;
  &:hover{ .bgc(#f9f9f9); }
  .image{ .fl; .wh(260,220);
    >img{ .wh(100%); object-fit: cover; object-position: center; }
  }
  .info{ .rel; .fl; width:calc(100% - 292px); .pl(32);
    .name{ .mt(10); .mb(18); .fs(28,33); .c(@title-black); .medium; }
    .intro{ .m(18,0); .fs(18,28); .c(@gray); }
    .naver-ad-no{ .mt(32); .fs(20,24); .c(@strong-purple); .semi-bold; }
    .edit-btn{ .abs; .rt(0,0); .z(1);
      &[cl-button]{
        >button{ .h(42); .p(0,29); .fs(20); }
      }
    }
  }
}
</style>
