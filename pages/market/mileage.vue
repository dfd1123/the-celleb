<template>
  <div market-mileage-page>
    <h2 class="tit">
      기업 마일리지
    </h2>
    <div class="panel-box-holder">
      <ul>
        <li>
          <span class="label">사용 가능 마일리지</span>
          <h6 class="price">
            1,000,000 <i>원</i>
          </h6>
          <span class="caution">일주일 내 소멸 예정 : 0원</span>
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
      @change-date="changeDate"
      @input="changeStatus"
      @search="getMileageList"
    />
    <div class="list-holder">
      <MileageList :list="mileageList" />
    </div>
    <cl-button v-if="mileageList.length === 5" type="white" class="more-btn" @click="addMileage">
      <img src="~/assets/imgs/icon/ico-plus.svg" alt="plus">
      <span>더보기</span>
    </cl-button>
    <div class="caution-list">
      <p>
        <img src="~/assets/imgs/icon/ico-caution.svg" alt="caution">
        꼭 확인해주세요!
      </p>
      <ul>
        <li>할인 쿠폰을 적용해서 구매한 의뢰인에게는 쿠폰 금액 제외한 금액으로 세금계산서를 발행해야 합니다.</li>
        <li>더셀럽이 전문가에게 할인된 쿠폰 금액에 대해 보전하여 수익금으로 정산하기 때문에 매출 신고 시에는 전체 판매 금액으로 신고해야 합니다. (적립캐시 사용은 할인쿠폰 적용과 무관하니 일반 거래건과 동일하게 진행해주시길 바랍니다.)</li>
      </ul>
      <br><br>
      <p>매출신고 방법 안내</p>
      <ul>
        <li>더셀럽은 전문가의 매출 신고방법을 따로 안내해 드리지 않으며, 매출 신고와 관련된 문의사항은 국세청이나 세무사무실에 문의바랍니다.</li>
        <li>월별 출금내역은 세무 신고 시의 참고이며 반드시 귀사의 회계자료와 비교 후 처리하시기 바랍니다.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ClButton from '@/components/common/ClButton'
import SearchControlBox from '@/components/mypage/SearchControlBox'
import MileageList from '@/components/market/mileage/MileageList'

export default {
  name: 'MarketMileage',
  components: { ClButton, SearchControlBox, MileageList },
  data () {
    return {
      searchInfo: {
        startDate: null,
        endDate: null,
        type: 'all',
        searchList: [{ label: '전체', value: 'all' }, { label: '적립', value: 'store' }, { label: '사용', value: 'use' }, { label: '만료', value: 'expire' }, { label: '취소', value: 'cancel' }]
      },
      mileageList: []
    }
  },
  mounted () {
    this.getMileageList()
  },
  methods: {
    getMileageList () {
      let originMileageList = [
        { no: '123981232', type: 'store', price: 40000, date: 1597935600000, endDate: 1631286000000 },
        { no: '587638723', type: 'use', price: 32000, date: 1595257200000, endDate: 1639148400000 },
        { no: '283742384', type: 'expire', price: 7000, date: 1592838000000, endDate: 1630422000000 },
        { no: '943582742', type: 'cancel', price: 40000, date: 1583679600000, endDate: 1615215600000 },
        { no: '823747384', type: 'store', price: 40000, date: 1577890800000, endDate: 1610204400000 }
      ]

      if (this.searchInfo.type !== 'all') { originMileageList = originMileageList.filter(item => item.type === this.searchInfo.type) }
      if (this.searchInfo.startDate) { originMileageList = originMileageList.filter(item => item.date >= this.searchInfo.startDate) }
      if (this.searchInfo.endDate) { originMileageList = originMileageList.filter(item => item.date <= this.searchInfo.endDate) }

      this.mileageList = originMileageList.map(mileage => ({ ...mileage, moDate: moment(mileage.date).format('YYYY-MM-DD'), moEndDate: moment(mileage.endDate).format('YYYY-MM-DD') }))
    },
    addMileage () {
      this.mileageList.push(
        { no: '587638723', type: 'use', price: 32000, date: 1577490800000, endDate: 1609148400000, moDate: moment(1577490800000).format('YYYY-MM-DD'), moEndDate: moment(1609148400000).format('YYYY-MM-DD') }
      )
    },
    changeDate ({ startDate, endDate }) {
      this.searchInfo.startDate = startDate
      this.searchInfo.endDate = endDate
    },
    changeStatus (type) {
      this.searchInfo.type = type
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[market-mileage-page]{
  .tit{ .mb(29); .fs(28,33); .c(@title-black); .semi-bold; }
  .panel-box-holder { .mb(56); .p(26,40); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    >ul{ .crop;
      >li{ .fl; width: calc(100% - 238px); .p(23,0); .tc;
        &:first-child{ .w(238); .p(18,0); .tl; .-r(#ebebeb); }
        >.label{ .block; .mb(11); .fs(18,21); .c(@gray); }
        .price { .fs(30); .c(@title-black); .semi-bold; }
        .caution { .block; .mt(16); .fs(14,17); .c(#aaa); }
        >p{ .mb(18); .fs(16,19); .c(@gray); }
        .ad-apply-btn { .wh(253, 48);
          >button { .wh(100%, 48); .fs(18); }
        }
      }
    }
  }
  .list-holder{  .m(32,0); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04); }
  .more-btn { .w(100%); .mb(29);
    >button { .wh(100%, 66); .fs(20); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      span{ .ib; .vam; .ml(10); }
    }
  }
  .caution-list{ .mt(80); .p(40); .br(7); .-a(#d7d1ff); .bgc(rgba(247, 246, 255, 0.7));
    p{ .mb(25); .fs(18,24); .c(@gray); .semi-bold; .vam;
      >img { .ib; .mr(10); .vam; }
    }
    ul{
      li{ .rel; .pl(10); .fs(14,26); .c(@gray);
        &::before{ content:'·'; .abs; .lt(0,0); .z(1); .fs(14,26); .c(@gray); .block; }
      }
    }
  }
}
</style>
