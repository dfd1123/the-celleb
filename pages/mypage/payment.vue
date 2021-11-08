<template>
  <div payment-page>
    <SearchControlBox
      :start-date="startDate"
      :end-date="endDate"
      @change-date="changeDate"
      @input="changeSearchText"
      @search="getOrderList"
    />
    <div v-if="orders.length" class="product-list">
      <template v-if="orders[0].id">
        <OrderCard
          v-for="order in orders"
          :key="`order-${order.id}`"
          :item="order"
          slip-out
          pay-method
          @click="$router.push(`/order/${order.id}/detail`)"
        />
      </template>
    </div>
    <NoData v-else main-msg="내역이 없습니다" />
    <div class="caution-list">
      <p>
        <img src="~/assets/imgs/icon/ico-caution.svg" alt="caution">
        꼭 확인해주세요!
      </p>
      <ul>
        <li>세금계산서는 거래 주체인 전문가가 의뢰인에게 발행합니다.</li>
        <li>세금계산서는 사업자 인증 받은 기업전문가에게 요청하실 수 있습니다.</li>
        <li>이벤트 쿠폰 사용 금액은 할인된 금액이기 때문에 세금계산서에 포함되지 않습니다.</li>
        <li>거래명세서는 결제가 완료되었음을 증명하는 용도로만 활용 가능하며 세무상의 지출증빙 효력이 없습니다.</li>
        <li>현금영수증은 개인의 소득공제용으로만 사용 가능하며, 결제 당시 지출 증빙용으로 선택하셨더라도 매입세액공제를 받을실 수 없습니다.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchControlBox from '@/components/mypage/SearchControlBox'
import OrderCard from '@/components/order/OrderCard'
import NoData from '@/components/common/NoData'

export default {
  name: 'PaymentPage',
  components: { SearchControlBox, OrderCard, NoData },
  data () {
    return {
      startDate: null,
      endDate: null,
      searchText: '',
      orders: []
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.auth?.myInfo
    }
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      this.orders = Array.from({ length: 2 }).map(() => ({}))
      let orders = (await this.$api.get('orders')).filter(order => order.status === 'complete' || order.status === 'cancel')
      orders = orders.filter(order => order.buyer_id === this.userInfo.id)
      if (this.startDate && this.endDate) { orders = orders.filter(order => this.startDate <= order.created_at && order.created_at <= this.endDate) }
      orders = orders.filter(order => order.title.replace(/ /g, '').includes(this.searchText.replace(/ /g, '')))
      this.orders = orders
    },
    changeDate ({ startDate, endDate }) {
      this.startDate = startDate
      this.endDate = endDate
    },
    changeSearchText (text) {
      this.searchText = text
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[payment-page] {
  .product-list{ .mt(32);
    [order-card] {
      .main-info{ .pl(0);
        .product-img{ .hide; }
      }
    }
  }
  [no-data]{ .mt(32); .mb(80); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    p.main-msg{ .c(#ccc); }
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
