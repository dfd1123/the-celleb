<template>
  <div sales-manage-page>
    <h2 class="tit">
      판매관리
    </h2>
    <div class="search-control-holder">
      <div class="left">
        <SelectBox v-model="service" :list="serviceList" class="select-service" placeholder="서비스를 선택해주세요." />
        <SelectBox v-model="nickname" :list="nicknameList" class="nickname" placeholder="닉네임" />
      </div>
      <div class="right">
        <CheckBox v-model="canBil" :val="true" class="use-tax-bill" label="세금계산서" />
        <cl-button type="purple" class="search-btn" @click="getOrderList">
          검색
        </cl-button>
      </div>
    </div>
    <div v-if="orders.length" class="order-list-holder">
      <template v-if="orders[0].id">
        <OrderUserCard v-for="order in orders" :key="`order-${order.id}`" :item="order" trading-statement @click="productClick(order.id)" />
      </template>
    </div>
    <no-data v-else main-msg="내역이 없습니다" />
  </div>
</template>

<script>
import SelectBox from '@/components/common/input/SelectBox'
import CheckBox from '@/components/common/input/CheckBox'
import ClButton from '@/components/common/ClButton'
import OrderUserCard from '@/components/order/OrderUserCard'
import NoData from '@/components/common/NoData'

export default {
  name: 'SalesManagePage',
  components: { SelectBox, CheckBox, ClButton, OrderUserCard, NoData },
  data () {
    return {
      serviceList: [{ label: '전체', value: '' }, { label: '인스타그램', value: 'instagram' }, { label: '유튜브', value: 'youtube' }, { label: '네이버 블로그', value: 'blog' }, { label: '네이버 카페', value: 'cafe' }, { label: '틱톡', value: 'tiktok' }, { label: '라이브커머스', value: 'liveCommerce' }],
      nicknameList: [{ label: '전체', value: '' }, { label: '알파브라더스', value: '알파브라더스' }],
      service: '',
      nickname: '',
      canBil: false,
      orders: []
    }
  },
  computed: {
    type () {
      return this.$route.query.type || ''
    }
  },
  watch: {
    type: 'getOrderList'
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      this.orders = Array.from({ length: 2 }).map(() => ({}))
      let orders = (await this.$api.get('orders')).filter(order => this.type === 'all' ? order : order.status === this.type)
      orders = orders.filter(order => order.channel_id.includes(this.service))
      orders = orders.filter(order => order.buyer_name.includes(this.nickname))
      orders = orders.filter(order => this.canBil ? order.can_bil === true : order)

      this.orders = orders
    },
    productClick (id) {
      this.$router.push(`/order/${id}/detail`)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[sales-manage-page] {
  .tit{ .mb(29); .fs(28,33); .c(@title-black); .semi-bold; }
  .search-control-holder{ .clear; .mb(32);
    .left{ .fl; }
    .right{ .fr; }
    [select-box]{ .h(48); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      &.select-service { .w(298); .mr(8); }
      &.nickname { .w(222); }
      > .angle svg path { fill:#aaa; }
    }
    [check-box]{
      &.use-tax-bill{ .ib; .mr(34);
        label{
          >span{ .fs(16,19); .c(@gray); }
        }
      }
    }
    .search-btn{
      >button{ .wh(117,48); .fs(20); }
    }
  }
  [no-data]{ .mb(80); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    p.main-msg{ .c(#ccc); }
  }
}
</style>
