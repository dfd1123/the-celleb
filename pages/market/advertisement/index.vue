<template>
  <div market-advertisement-page>
    <h2 class="tit">
      광고 관리
    </h2>
    <div class="panel-box-holder">
      <ul>
        <li>
          <span class="label">현재 광고주인 상품</span>
          <h6 class="ad-cnt">
            3 개
          </h6>
        </li>
        <li>
          <p>광고신청을 통해서 더 많은 고객을 만나보세요.</p>
          <cl-button type="line-purple" class="ad-apply-btn">
            광고신청하기
          </cl-button>
        </li>
      </ul>
    </div>
    <SearchControlBox :start-date="searchInfo.startDate" :end-date="searchInfo.endDate" :search-list="searchInfo.searchList" />
    <div class="ad-list-holder">
      <AdCard v-for="i in 4" :key="i" :status="i < 3 ? 'ing': 'complete'" />
      <cl-button type="white" class="more-btn">
        <img src="~/assets/imgs/icon/ico-plus.svg" alt="plus">
        <span>더보기</span>
      </cl-button>
    </div>
  </div>
</template>

<script>
import SearchControlBox from '@/components/mypage/SearchControlBox'
import AdCard from '@/components/market/advertisement/AdCard'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'MarketAdvertisementPage',
  components: { SearchControlBox, AdCard, ClButton },
  data () {
    return {
      searchInfo: {
        startDate: new Date().setDate(new Date().getDate() - 30),
        endDate: Date.now(),
        searchList: [{ label: '전체', value: 'all' }, { label: '광고중', value: 'ing' }, { label: '광고중', value: 'complete' }]
      }
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[market-advertisement-page]{
  .tit{ .mb(29); .fs(28,33); .c(@title-black); .semi-bold; }
  .panel-box-holder { .mb(56); .p(26,40); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    >ul{ .crop;
      >li{ .fl; width: calc(100% - 238px); .p(7,0); .tc;
        &:first-child{ .w(238); .p(18,0); .tl; .-r(#ebebeb); }
        >.label{ .block; .mb(11); .fs(18,21); .c(@gray); }
        .ad-cnt { .fs(30); .c(@title-black); .semi-bold; }
        >p{ .mb(18); .fs(16,19); .c(@gray); }
        .ad-apply-btn { .wh(253, 48);
          >button { .wh(100%, 48); .fs(18); }
        }
      }
    }
  }
  .ad-list-holder{ .m(20,0);
    [ad-card] { .mb(29); }
    .more-btn { .w(100%); .mb(29);
      >button { .wh(100%, 66); .fs(20); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
        span{ .ib; .vam; .ml(10); }
      }
    }
  }
}
</style>
