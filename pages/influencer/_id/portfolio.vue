<template>
  <div influencer-portfolio-page>
    <div class="inner-holder">
      <div class="white-box hd-box">
        <div class="profile">
          <StoreAvatar />
          <div class="info">
            <div class="name">
              <h4>
                더셀럽
              </h4>
              <button>프로필 수정</button>
            </div>
            <div class="rating-info">
              <RatingStar :value="5.0" active-color="#f87676" :star-size="18" readonly />
              <em class="score">5.0</em>
              <span>(300개의 평가)</span>
            </div>
          </div>
        </div>
        <ul class="store-info">
          <li>
            <b>150개</b>
            <span>작업 수</span>
          </li>
          <li>
            <b>100%</b>
            <span>만족도</span>
          </li>
          <li>
            <b>30분 이내</b>
            <span>평균응답시간</span>
          </li>
        </ul>
      </div>
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
import StoreAvatar from '@/components/common/StoreAvatar'
import RatingStar from '@/components/common/RatingStar'
import ClButton from '@/components/common/ClButton'
import PortfolioCard from '@/components/influencer/PortfolioCard'
import PortfolioInfoSubmitModal from '@/components/influencer/modal/PortfolioInfoSubmitModal'

export default {
  name: 'InfluencerPortfolio',
  components: { StoreAvatar, RatingStar, ClButton, PortfolioCard },
  methods: {
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
  .hd-box{ .clear; .mb(32); .p(48,40); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .profile{ .rel; .fl; .w(50%); .p(2, 0);
      [store-avatar] { .abs; .lt(0, 0); .z(1); .wh(110); }
      .info { .p(10,0); .pl(134);
        .name { .rel; .block;
          >h4{ .ib; .vam; .fs(30, 36); .c(@title-black); .medium; }
          >button{ .ib; .vam; .h(31); .ml(16); .p(0,12); .fs(16); .c(#888); .bgc(#f1f1f1); .br(5); }
        }
        .rating-info { .mt(23);
          [rating-star] { .ib; .vam; .mb(0); .ml(-2); .vam; cursor: default;
            .score { .hide; }
            .rating-star-holder { .vam;
              > div { .m(0, 1); .p(0, 1); cursor: default; }
            }
          }
          .score{ .ib; .vam; .ml(10); .mr(12); .fs(24,24); .c(@gray); .medium; }
          >span{ .ib; .vam; .fs(18,24); .c(#aaa); }
        }
      }
    }
    .store-info{ .crop;
      >li{ .fl; width:calc(100% / 3); .h(96); .m(7,0); .p(16,0); .tc; .-l(#ebebeb);
        >b{ .block; .fs(30,36); .c(@title-black); .ls(-0.6); }
        >span { .block; .mt(7); .fs(18,21); .c(#999); }
      }
    }
  }
}
</style>
