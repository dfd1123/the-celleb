<template>
  <div market-revenue-page>
    <div class="tit">
      <h2>수익 관리</h2>
      <div class="bank-info">
        <span>예금주 : 더셀럽</span>
        <span>출금계좌 : 국민은행 910-8885-7406</span>
      </div>
    </div>
    <div class="panel-box">
      <ul>
        <li>
          <span class="label">출금가능 수익금</span>
          <div class="value-holder">
            <p class="value">
              1,000,000<span>원</span>
            </p>
            <cl-button type="line-purple" class="withdrawal-btn" @click="withdrawalRequest">
              출금 신청
            </cl-button>
          </div>
        </li>
        <li>
          <span class="label">예상 수익금</span>
          <div class="value-holder">
            <p class="value">
              3,000,000<span>원</span>
            </p>
          </div>
        </li>
        <li>
          <span class="label">출금 완료 수익금</span>
          <div class="value-holder">
            <p class="value">
              13,000,000<span>원</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="chart-holder">
      <div class="chart-control-box">
        <div class="label-box">
          <span class="complete">
            <i />
            주문완료
          </span>
          <span class="cancel">
            <i />
            주문취소
          </span>
        </div>
        <ToggleTab v-model="selectedTab" class="graph-tab" :tabs="graphTabs" />
      </div>
      <BarChart :data="barChartData" :options="barChartOptions" :height="230" />
    </div>
    <div class="revenue-list-holder">
      <div class="hd">
        <SlideTabNav v-model="revenueSelectedTab" :menu-list="revenueMenuList" />
        <div class="select-type-box">
          <a href="#">수수료가 궁금하세요?</a>
          <SelectBox v-model="revenueStatus" :list="selectBoxList" />
        </div>
      </div>
      <div class="list-box">
        <ul>
          <li v-for="revenue in showRevenueList" :key="revenue.id" class="revenue-li">
            <span :class="['status', revenue.status]">{{ revenue.status === 'ing' ? '진행중':'완료' }}</span>
            <div class="detail-info">
              <span class="revenue">수익금
                <em>{{ revenue.price }}</em>
                <i>원</i>
              </span>
              <div class="sub-info">
                <span class="order-no">#{{ revenue.id }}</span>
                <span>주문 접수일 : {{ revenue.date }}</span>
                <span>실 거래 금액 : {{ revenue.dealPrice }}원</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <cl-button v-if="revenueList.length < 5" type="white" class="more-btn" @click="addRevenue">
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
import BarChart from '@/components/common/chart/BarChart.js'
import ClButton from '@/components/common/ClButton'
import ToggleTab from '@/components/common/tab/ToggleTab'
import SlideTabNav from '@/components/common/menu/SlideTabNav'
import SelectBox from '@/components/common/input/SelectBox'

export default {
  name: 'MarketRevenuePage',
  components: { ClButton, BarChart, ToggleTab, SlideTabNav, SelectBox },
  data () {
    return {
      selectBoxList: [{ label: '전체', value: 'all' }, { label: '진행중', value: 'ing' }, { label: '완료', value: 'end' }],
      revenueMenuList: ['수익금 내역', '출금내역', '월별 수수료 세금계산서'],
      revenueSelectedTab: 0,
      selectedTab: 0,
      revenueStatus: 'all',
      revenueList: [
        { id: '20072399', status: 'ing', price: '240,000', dealPrice: '1,050,000', date: '21.08.07' },
        { id: '20072393', status: 'ing', price: '130,000', dealPrice: '810,000', date: '21.08.07' },
        { id: '20072391', status: 'end', price: '430,000', dealPrice: '680,000', date: '21.08.05' },
        { id: '20072390', status: 'end', price: '220,000', dealPrice: '250,000', date: '21.08.04' }
      ],
      graphTabs: ['일별', '월별'],
      barChartData: {
        labels: ['2020.03', '2020.04', '2020.05', '2020.06', '2020.07', '2020.08'],
        datasets: [
          {
            label: '주문완료',
            backgroundColor: '#5d12fa',
            data: [1800000, 2100000, 6200000, 8200000, 11300000, 6800000]
          },
          {
            label: '주문취소',
            backgroundColor: '#dbdbdb',
            data: [500000, 600000, 1000000, 800000, 700000, 650000]
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    showRevenueList () {
      return this.revenueStatus !== 'all' ? this.revenueList.filter(revenue => revenue.status === this.revenueStatus) : this.revenueList
    }
  },
  methods: {
    withdrawalRequest () {
      this.$alert({ title: '출금신청이 완료되었습니다.', message: '출금 완료까지 다소 시간이 소요될수 있습니다.' })
    },
    addRevenue () {
      this.revenueList.push(
        { id: '20072389', status: 'end', price: '100,000', dealPrice: '30,000', date: '21.08.02' }
      )
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[market-revenue-page]{
  .tit{ .rel; .mb(29);
    h2{ .ib; .vam; .fs(28,33); .c(@title-black); .semi-bold; }
    .bank-info{ .ib; .vam; .ml(14); .p(9.5,15); .fs(15,19); .c(#999); .-a(#d9d9d9); .br(7); .bgc(#fff);
      >span{
        &:first-child{
          &::after{ .cnt; .ib; .vam; .wh(1,11); .m(0,10); .bgc(#d9d9d9); }
        }
      }
    }
  }
  .panel-box{ .mb(32); .p(26,0); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    >ul{ .crop;
      >li{ .rel; .fl; .w(237); .p(22,40); .-l(#ebebeb);
        .label{ .block; .mb(12); .fs(18,21); .c(@gray); }
        .value-holder{ .crop;
          .value{ .fl; .fs(22,27); .c(@gray); .semi-bold;
            >span{ .ib; .ml(17); }
          }
          .withdrawal-btn{ .fl; .ib; .h(31);
            >button { .min-h(0); .h(31); .ml(12); .p(0,10); .fs(15); }
          }
        }
        &:first-child{ .w(336); .-l;
          .value-holder{
            .value{ .fs(26,31); .c(@title-black); }
          }
        }
      }
    }
  }
  .chart-holder{ .m(32,0); .p(45, 40); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .chart-control-box{ .crop; .mb(30); .pl(80);
      .label-box{ .fl;
        >span{ .mr(21); .fs(14,17); .c(@gray);
          >i { .ib; .wh(11); .mr(4); }
          &.complete{
            >i { .bgc(@strong-purple); }
          }
          &.cancel{
            >i { .bgc(#dbdbdb); }
          }
        }
      }
      .graph-tab{ .fr;
        >button{ .wh(61,32); .fs(15); .c(#969696); .-a(#d9d9d9);
          &:first-child { border-top-left-radius: 10px; border-bottom-left-radius: 10px; }
          &:last-child { border-top-right-radius: 10px; border-bottom-right-radius: 10px; }
          &.on{ .c(#fff); .bgc(#999); .-a(#999); }
        }
      }
    }
  }

  .revenue-list-holder{ .m(32,0); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .hd{ .rel; .p(0,40); .pt(10); .-b(#eee);
      [slide-tab-nav]{  .-b;
        .ca-nav-con {
          .slide-bar { .b(-1); .h(5); }
        }
      }
      .select-type-box{ .abs; .rb(40,15); .z(1);
        >a{ .ib; .mb(-2); .fs(14,17); .c(#bdbdbd); text-decoration: underline;}
        [select-box] { .ib; .wh(100,44); .mb(-3); .ml(15); .-a(#d9d9d9); .br(5); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
          .show-value{ .fs(16); .c(#999); .light; }
          > .angle { .t(11.5);
            svg path { fill: #aaa; }
          }
        }
      }
    }
    .list-box { .p(0,40);
      .revenue-li{ .crop; .p(34,0); .-b(#eee);
        &:last-child{ .-b; }
        .status{ .fl; .ib; .w(121); .m(9,0); .fs(20,24); .c(#aaa); .medium;
          &.ing{ .c(@strong-purple); }
          &.complete{ .c(#aaa); }
        }
        .detail-info { .fl; width: calc(100% - 121px);
          .revenue{ .fs(18); .c(@gray);
            >em{ .ib; .ml(5); .fs(22); .semi-bold; }
            >i{ .ib; .ml(11); .fs(20); .semi-bold; }
          }
          .sub-info{ .mt(13);
            >span { .fs(15,19); .c(#aaa); .light;
              &::after { .cnt; .ib; .wh(1,10); .m(0, 10); .bgc(#d9d9d9); }
              &:last-child {
                &::after{ .hide; }
              }
              &.order-no{ .semi-bold; }
            }
          }
        }
      }
    }
  }

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
