<template>
  <li mileage-list-item class="mileage-li">
    <span :class="['status', item.type]">{{ status }}</span>
    <div class="detail-info">
      <span class="mileage">
        <em>{{ commaPrice }}</em>
        <i>원</i>
      </span>
      <div class="sub-info">
        <span class="order-no">{{ orderNo }}</span>
        <span>{{ item.date }}</span>
        <span>만료예정일 : {{ item.endDate }}</span>
      </div>
    </div>
  </li>
</template>

<script>
import { numberFormat } from '@/utils/numberUtils'

export default {
  name: 'MileageListItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    commaPrice () {
      return numberFormat(this.item.price)
    },
    status () {
      switch (this.item.type) {
        case 'store': return '적립'
        case 'use': return '사용'
        case 'expire': return '만료'
        case 'cancel': return '취소'
        default: return '-'
      }
    },
    orderNo () {
      switch (this.item.type) {
        case 'store': return `판매완료(#${this.item.no})`
        case 'use': return '광고 결제 시 사용'
        case 'expire': return '마일리지 유효기간 만료'
        case 'cancel': return '광고 결제 후 취소'
        default: return '-'
      }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[mileage-list-item] { .crop; .p(34, 0); .-b(#EEEEEE);
    &:last-child { .-b; }
    .status { .fl; .ib; .w(121); .m(9, 0); .fs(20, 24); .c(#AAAAAA); .medium;
      &.store { .c(@strong-purple); }
      &.use, &.cancel { .c(#e94c6f); }
      &.expire { .c(#aaaaaa); }
    }
    .detail-info { .fl; width: calc(100% - 121px);
      .mileage { .fs(18); .c(@gray);
        > em { .ib; .ml(5); .fs(22); .semi-bold; }
        > i { .ib; .ml(11); .fs(20); .semi-bold; }
      }
      .sub-info { .mt(13);
        > span { .fs(15, 19); .c(#AAAAAA); .light;
          &::after { .cnt; .ib; .wh(1, 10); .m(0, 10); .bgc(#D9D9D9); }
          &:last-child {
            &::after { .hide; }
          }
          &.order-no { .semi-bold; }
        }
      }
    }
  }

</style>
