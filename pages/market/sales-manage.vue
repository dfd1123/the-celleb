<template>
  <div sales-manage-page>
    <h2 class="tit">
      판매관리
    </h2>
    <div class="search-control-holder">
      <div class="left">
        <SelectBox class="select-service" placeholder="서비스를 선택해주세요." />
        <SelectBox class="nickname" placeholder="닉네임" />
      </div>
      <div class="right">
        <CheckBox class="use-tax-bill" label="세금계산서" />
        <cl-button type="purple" class="search-btn">
          검색
        </cl-button>
      </div>
    </div>
    <div v-if="true" class="order-list-holder">
      <OrderUserCard v-for="i in 3" :key="`${i}`" trading-statement />
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
  components: { SelectBox, CheckBox, ClButton, OrderUserCard, NoData }
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
