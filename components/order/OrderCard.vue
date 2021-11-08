<template>
  <div order-card @click="cardClick">
    <div class="main-info">
      <div class="product-img">
        <img v-if="manage" :src="item.images[0]" alt="product-image">
        <img v-else :src="item.image" alt="product-image">
      </div>
      <div class="product-info">
        <div class="order-info">
          <em v-if="manage" :class="['status', item.service_status]">{{ serviceStatusTag }}</em>
          <em v-else :class="['status', item.status]">{{ statusTag }}</em>
          <span v-if="!manage" class="order-no">주문번호 {{ item.order_no }}</span>
        </div>
        <h6 class="name">
          {{ item.title || '-' }}
        </h6>
        <p class="description">
          {{ item.simple_intro }}
        </p>
        <div class="detail-info">
          <span v-if="manage" class="manage-record">판매완료<b>{{ item.sales_cnt || '1' }}건</b></span>
          <span v-else class="receipt-price-date">결제일 {{ receiptDate }}</span>
          <span v-if="payMethod" class="paymethod">결제방법 : {{ item.payMethod }}</span>
        </div>
        <div class="sub-info">
          <div v-if="manage" class="manage">
            관리
            <div class="pop-over">
              <ul>
                <li v-for="sStatus in showStatusList" :key="`${sStatus.value}`">
                  {{ sStatus.label }}
                </li>
              </ul>
            </div>
          </div>
          <span v-if="tradingStatement" class="trading-state">거래명세서</span>
          <span v-if="slipOut" class="trading-state">전표출력</span>
          <!--          <span class="option-name">네이버쇼핑라이브 30일 <small>(1개)</small></span>-->
          <b class="price">{{ commaPrice }} 원 {{ manage? '~' : '' }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { numberFormat } from '@/utils/numberUtils'

export default {
  name: 'OrderCard',
  props: {
    item: { type: Object, default: () => ({}) },
    tradingStatement: { type: Boolean, default: false },
    slipOut: { type: Boolean, default: false },
    payMethod: { type: Boolean, default: false },
    status: { type: String, default: '' },
    manage: { type: Boolean, default: false }
  },
  data () {
    return {
      statusList: [
        { label: '판매시작', value: 'sales-ing' },
        { label: '판매일시중지', value: 'sales-stop' },
        { label: '서비스편집', value: 'service-edit' },
        { label: '서비스삭제', value: 'service-delete' }
      ],
      selectStatus: null
    }
  },
  computed: {
    statusTag () {
      if (this.item.status === 'remain_req') {
        return '요청사항 미작성'
      } else if (this.item.status === 'ing') {
        return '진행중'
      } else if (this.item.status === 'edit_req') {
        return '수정요청'
      } else if (this.item.status === 'shipping') {
        return '발송중'
      } else if (this.item.status === 'complete') {
        return '주문완료'
      } else if (this.item.status === 'un_review') {
        return '리뷰 미작성'
      } else if (this.item.status === 'cancel') {
        return '주문취소'
      }

      return ''
    },
    serviceStatusTag () {
      if (this.item.status === 'ing') {
        return '판매중'
      } else if (this.item.status === 'reject') {
        return '미승인'
      } else if (this.item.status === 'wait') {
        return '승인 대기중'
      } else if (this.item.status === 'stop') {
        return '판매중지'
      }

      return '판매중'
    },
    receiptDate () {
      return moment(this.item.created_at).format('YY.MM.DD HH:mm')
    },
    commaPrice () {
      return numberFormat(this.item.price || this.item.minimum_price)
    },
    showStatusList () {
      return this.statusList.filter(item => item.value !== this.item.status)
    }
  },
  methods: {
    cardClick (e) {
      const { target } = e
      const ignoreTargets = [...this.$el.querySelectorAll('.manage .pop-over > ul > li'), this.$el.querySelector('.manage'), this.$el.querySelector('.manage .pop-over'), this.$el.querySelector('.manage .pop-over > ul')]
      if (ignoreTargets.includes(target)) { return false }

      this.$emit('click')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[order-card]{ .mb(29); .p(38, 40, 28); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
  .main-info{ .rel; .pl(229);
    .product-img { .abs; .lt(0,0); .z(1); .w(191); .min-h(131);
      >img { .wh(100%); object-position: center; object-fit: cover; }
    }
    .product-info { .min-h(157.3);
      .order-info {
        .status{ .ib; .p(0,10); .fs(15,31); .c(@purple); .vam; .-a(@purple); .br(5);
          &.refund-complete, &.cancel{ .c(#e94c6f); .-a(#e94c6f); }
        }
        .order-no { .ib; .ml(16); .fs(15,31); .c(#999); .vam; }
      }
      .name{ .mt(17); .mb(10); .fs(24,29); .c(@title-black); .medium; }
      .description { .min-h(44); .fs(18,22); .c(@gray); .regular; .ellipsis(2); }
      .detail-info{ .crop;
        .manage-record { .fs(18,21); .c(@gray);
          >b{ .ml(7); }
        }
        .receipt-price-date { .fl; .block; .mt(10); .fs(15,19); .c(#aaa); }
        .paymethod{ .fr; .fs(18,21); .c(@gray); }
      }
      .sub-info { .clear; .mt(23.3); .p(22, 0); .-t(#ebebeb);
        .manage{ .rel; .ib; .w(86); .p(0,10); .fs(15, 31); .c(#888); .tc; .br(5); .bgc(#f1f1f1);
          .pop-over{ .hide; .abs; .lt(-15,17); .z(1); .pt(30);
            &::before{ .cnt; .abs; .lt(39%,24); .z(3); .wh(20); .br(5); .bgc(#fff); transform:rotate(45deg);  }
            >ul{ .rel; .z(1); .w(118); .p(17, 0); .bgc(#fff); .br(7);  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
              >li{  .block; .w(100%); .fs(15,19); .p(7,0); .pointer;
                &:hover{ .bgc(#fafafa); }
              }
            }
          }
          &:hover{
            .pop-over{ .block; }
          }
        }
        .trading-state{ .ib; .p(0,10); .fs(15, 31); .c(#888); .br(5); .bgc(#f1f1f1); }
        .option-name { .fl; .mr(10); .fs(18, 24); .c(@gray);
          small { .fs(18,31); .c(#999); }
        }
        .price { .fr; .fs(22,31); .c(@gray); .semi-bold; }
      }
    }
  }
}
</style>
