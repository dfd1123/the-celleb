<template>
  <div market-advertisement-page>
    <h2 class="tit">
      광고 관리
    </h2>
    <div class="panel-box-holder">
      <ul>
        <li>
          <span class="label">현재 광고중인 상품</span>
          <h6 class="ad-cnt">
            3 개
          </h6>
        </li>
        <li>
          <p>광고신청을 통해서 더 많은 고객을 만나보세요.</p>
          <cl-button type="line-purple" class="ad-apply-btn" @click="$router.push('/market/advertisement/apply?type=master')">
            광고신청하기
          </cl-button>
        </li>
      </ul>
    </div>
    <SearchControlBox
      :start-date="searchInfo.startDate"
      :end-date="searchInfo.endDate"
      :search-list="searchInfo.searchList"
      :search-text="searchInfo.status"
      @change-date="changeDate"
      @input="changeStatus"
      @search="getAdverList"
    />
    <div class="ad-list-holder">
      <template v-if="adverList && !(adverList || []).length">
        <NoData main-msg="검색된 결과가 없습니다." />
      </template>
      <template v-else-if="adverList && adverList.length">
        <AdCard v-for="ad in adverList" :key="ad.id" :item="ad" :status="ad.status" />
        <cl-button v-if="adverList.length === 4" type="white" class="more-btn" @click="adverAdd">
          <img src="~/assets/imgs/icon/ico-plus.svg" alt="plus">
          <span>더보기</span>
        </cl-button>
      </template>
    </div>
  </div>
</template>

<script>
import SearchControlBox from '@/components/mypage/SearchControlBox'
import AdCard from '@/components/market/advertisement/AdCard'
import ClButton from '@/components/common/ClButton'
import NoData from '@/components/common/NoData'

export default {
  name: 'MarketAdvertisementPage',
  components: { SearchControlBox, AdCard, ClButton, NoData },
  data () {
    return {
      searchInfo: {
        startDate: null,
        endDate: null,
        status: 'all',
        searchList: [{ label: '전체', value: 'all' }, { label: '광고중', value: 'ing' }, { label: '광고완료', value: 'complete' }]
      },
      adverList: null
    }
  },
  mounted () {
    this.getAdverList()
  },
  methods: {
    getAdverList () {
      const originList = [
        { id: 5, title: '플러스 광고 1주', description: '공동구매를 빠르고 효율적으로 도와드립니다.', receiptPrice: 99000, price: 50000, startDate: 1595862000000, endDate: 1596466800000, status: 'ing' },
        { id: 4, title: '플러스 광고 1주', description: '공동구매를 빠르고 효율적으로 도와드립니다.', receiptPrice: 99000, price: 50000, startDate: 1593270000000, endDate: 1593788400000, status: 'ing' },
        { id: 3, title: '플러스 광고 1주', description: '공동구매를 빠르고 효율적으로 도와드립니다.', receiptPrice: 99000, price: 50000, startDate: 1592751600000, endDate: 1593356400000, status: 'ing' },
        { id: 2, title: '플러스 광고 1주', description: '공동구매를 빠르고 효율적으로 도와드립니다.', receiptPrice: 99000, price: 50000, startDate: 1590073200000, endDate: 1590678000000, status: 'complete' }
      ]

      this.adverList = originList

      if (this.searchInfo.startDate) { this.adverList = originList.filter(ad => ad.startDate >= this.searchInfo.startDate) }
      if (this.searchInfo.endDate) { this.adverList = originList.filter(ad => ad.endDate <= this.searchInfo.endDate) }
      if (this.searchInfo.status !== 'all') { this.adverList = originList.filter(ad => ad.status === this.searchInfo.status) }
    },
    adverAdd () {
      this.adverList.push(
        { id: 1, title: '플러스 광고 1주', description: '공동구매를 빠르고 효율적으로 도와드립니다.', receiptPrice: 99000, price: 50000, startDate: 1590053200000, endDate: 1590278000000, status: 'complete' }
      )
    },
    rePurchase (ad) {
      const newId = this.adverList[0].id + 1
      const startDate = Date.now()
      let endDate = new Date()
      endDate.setDate(endDate.getDate() + 7)
      endDate = endDate.getTime()
      this.adverList.unshift({ ...ad, id: newId, startDate, endDate })
    },
    changeDate ({ startDate, endDate }) {
      this.searchInfo.startDate = startDate
      this.searchInfo.endDate = endDate
    },
    changeStatus (status) {
      this.searchInfo.status = status
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
