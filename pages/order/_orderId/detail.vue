<template>
  <div order-detail-page>
    <div v-if="order" class="inner-holder">
      <h2 class="tit">
        구매 상세내역
      </h2>
      <div class="product-list">
        <OrderCard :item="order" trading-statement />
      </div>
      <div class="order-detail-card order-complete">
        <div class="box">
          <b>주문이 접수되었습니다.</b><br>
          <p>(더셀럽) 님이 주문을 확인하였으며, 곧 작업이 시작됩니다!</p><br>
          <span>작업 완료 예정일 : 21.10.20 12:30</span>
        </div>
      </div>
      <div v-if="order.status === 'complete'" class="order-detail-card order-complete-download">
        <div class="box">
          <b>주문이 완료되었습니다.</b><br>
          <span>21.10.30 15:30</span><br>
          <cl-button type="line-purple" @click="orderFileOpen">
            파일 열기
          </cl-button>
        </div>
      </div>
      <template v-else-if="order.status === 'cancel'">
        <div class="order-detail-card order-cancel-request-complete">
          <div class="box">
            <b>주문 취소 신청하였습니다.</b><br>
            <p>(취소 사유)로 인해 거래를 취소합니다.</p><br>
          </div>
        </div>
        <div class="order-detail-card order-cancel-complete">
          <div class="box">
            <b>주문 취소가 완료되었습니다.</b><br>
            <cl-button type="purple" @click="$router.push('/product/instagram/list')">
              더 많은 마케팅 보기
            </cl-button>
          </div>
        </div>
      </template>
      <div v-if="order.status === 'complete'" class="review-write-box">
        <p class="subject">
          평가 남기기
        </p>
        <RatingStar active-color="#f87676" :star-size="25" />
        <TextAreaBox placeholder="작업물에 대한 솔직한 평가를 남겨주세요!" />
        <cl-button type="purple" @click="reviewSubmit">
          평가 작성완료
        </cl-button>
      </div>
      <div v-if="order.status !== 'complete' && order.status !== 'cancel'" class="row2">
        <div class="order-detail-card order-qna">
          <div class="box">
            <p class="main-msg">
              문의사항이 있다면?
            </p><br>
            <cl-button type="line-purple" @click="qnaSubmitModalOpen">
              문의하기
            </cl-button>
          </div>
        </div>
        <div class="order-detail-card order-cancel-request">
          <div class="box">
            <p class="main-msg">
              거래 중 문제가 발생했다면<br>
              아래 버튼을 클릭하세요!
            </p><br>
            <cl-button type="line-gray" @click="cancelRequest">
              거래 취소 요청
            </cl-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderCard from '@/components/order/OrderCard'
import ClButton from '@/components/common/ClButton'
import RatingStar from '@/components/common/RatingStar'
import TextAreaBox from '@/components/common/input/TextAreaBox'
import QnaSubmitModal from '@/components/product/modal/QnaSubmitModal'

export default {
  name: 'OrderDetailPage',
  components: { OrderCard, ClButton, RatingStar, TextAreaBox },
  data () {
    return {
      order: null,
      item: null,
      store: null
    }
  },
  computed: {
    orderId () {
      return this.$route.params.orderId
    }
  },
  mounted () {
    this.getOrderInfo()
  },
  methods: {
    async getOrderInfo () {
      this.order = await this.$api.get(`/orders/${this.orderId}`)
      this.item = await this.$api.get(`/products/${this.order.product_id}`)
      this.store = await this.$api.get(`/users/${this.item.inf_Id}`)
    },
    qnaSubmitModalOpen () {
      this.$modal(QnaSubmitModal, { store: this.store })
    },
    orderFileOpen () {
      this.$toast('서비스 준비중 입니다.', { type: 'fail' })
    },
    reviewSubmit () {
      this.$alert({ title: '리뷰를 작성하였습니다.' })
    },
    async cancelRequest () {
      await this.$alert({ title: '거래 취소 요청 완료' })
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[order-detail-page] { .pt(84); .pb(191);
  .tit{ .mb(31); .fs(28,33); .c(@title-black); }
  [order-card]{ .pt(35); .pb(35);
    .main-info{ .pl(290);
      .product-img { .wh(258,177); }
      .product-info{
        .sub-info { .mt(0); .pb(0); .-t; }
      }
    }
  }
  .order-detail-card{ .flex-center; .h(248); .mt(24); .p(76.5); .tc; .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .box{ .ib; .mh-c; .pl(112); .tl; .bg-xy(0,0);
      > b{ .ib; .mb(7); .fs(22, 27); .c(@title-black); .medium; }
      > p { .ib; .mb(23); .fs(16,18); .c(@gray);
        &.main-msg{ .mb(0); .fs(18,25); }
      }
      >span { .ib; .fs(15,19); .c(#aaa); }
      [cl-button] { .mt(32);
        >button { .wh(196,60); .fs(20); .medium; }
      }
    }

    &.order-complete{
      .box{ .w(490.1); .pl(140.6); .contain('~assets/imgs/icon/ico-order-complete.svg'); .bg-x(20); .bg-s(62.6, 88.6); }
    }

    &.order-qna{
      .box { .pl(149); .contain('~assets/imgs/icon/ico-order-qna.svg'); .bg-s(93.37, 74.1); }
    }

    &.order-cancel-request{
      .box { .pl(163.6); .contain('~assets/imgs/icon/ico-cancel-req.svg'); .bg-s(107.52, 96.61); }
    }

    &.order-complete-download{
      .box { .w(490.1); .pl(140.6); .contain('~assets/imgs/icon/ico-order-complete-download.svg'); .bg-x(15); .bg-s(80, 75.6); }
    }

    &.order-cancel-request-complete{
      .box { .w(490.1); .pt(20); .pb(20); .pl(140.6); .contain('~assets/imgs/icon/ico-cancel-req.svg'); .bg-s(107.52, 96.61); }
    }

    &.order-cancel-complete{
      .box { .w(490.1); .pl(140.6); .contain('~assets/imgs/icon/ico-order-complete-download.svg'); .bg-x(15); .bg-s(80, 75.6); }
    }
  }

  .row2 { .crop;
    .order-detail-card{ .fl; width:calc((100% / 2) - 15px);
      &:nth-of-type(2) { .ml(30); }
    }
  }

  .review-write-box{ .mt(24); .p(64, 124, 69); .br(7); .bgc(#fff); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04); .tc;
    .subject{ .fs(22,27); .c(@title-black); }
    [rating-star] { .mt(14); .mb(36.6);
      .score{ .hide; }
      .rating-star-holder{ .ml(-3); }
    }
    [text-area-box] { .m(37,0);
      textarea{ .p(41,40); .h(291); }
    }
    [cl-button]{
      >button { .wh(253,60); .fs(20); }
    }
  }
}
</style>
