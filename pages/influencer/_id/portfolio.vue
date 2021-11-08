<template>
  <div influencer-portfolio-page>
    <div v-if="store" class="inner-holder">
      <InfluencerPanel :store="store" />
      <div class="add-btn">
        <cl-button type="line" @click="portfolioCreateModalOpen">
          <img src="~/assets/imgs/icon/ico-plus.svg" alt="plus">
          <span>포트폴리오 추가</span>
        </cl-button>
      </div>
      <div class="white-box portfolio-box">
        <h5 class="sub-tit">
          포트폴리오
        </h5>
        <div class="portfolio-list-holder">
          <PortfolioCard v-for="i in 5" :key="`pf-${i}`" :item="{images:[`/images/portfolio${i}.jpg`]}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfluencerPanel from '@/components/influencer/InfluencerPanel'
import ClButton from '@/components/common/ClButton'
import PortfolioCard from '@/components/influencer/PortfolioCard'
import PortfolioInfoSubmitModal from '@/components/influencer/modal/PortfolioInfoSubmitModal'

export default {
  name: 'InfluencerPortfolio',
  components: { InfluencerPanel, ClButton, PortfolioCard },
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
    portfolioCreateModalOpen () {
      this.$modal(PortfolioInfoSubmitModal)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[influencer-portfolio-page]{ .pt(61); .pb(175);
  .add-btn{ .mb(60); .tc;
    [cl-button]{  .wh(100%, 66); .mh-c;
      >button { .wh(100%,66); .fs(20); .c(#999);
        span{ .ib; .vam; .ml(10); }
      }
    }
  }

  .white-box{ .m(32,0); .p(40); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .sub-tit{ .mb(35); .fs(26,31); .c(@title-black); .medium; }
    .more-btn{ .mt(40); .tc;
      [cl-button]{ .max-w(340); .wh(100%, 66); .mh-c;
        >button { .wh(100%,66); .fs(20); .c(#999);
          span{ .ib; .vam; .ml(10); }
        }
      }
    }
  }
}
</style>
