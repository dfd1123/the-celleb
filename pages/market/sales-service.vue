<template>
  <div sales-service-page>
    <div class="hd-area">
      <h2 class="tit">
        판매서비스
      </h2>
      <div class="control-box">
        <div class="switch-box">
          <div class="label">
            휴가모드
            <img src="~/assets/imgs/icon/ico-circle-question.svg" alt="tooltip">
            <div class="tooltip-box">
              <ul>
                <li>*문의 구매 버튼이 비활성화된 상태로 서비스가 노출됩니다.</li>
                <li>*지정된 기간 안에 돌아오지 않을 경우, 서비스 노출이 중단됩니다.</li>
                <li>*휴가 기간 동안에는 서비스 수정이 불가합니다.</li>
                <li>*휴가모드 설정 변경 시, 서비스 노출 및 판매가 가능합니다.</li>
              </ul>
            </div>
          </div>
          <ToggleSwitch />
        </div>
        <cl-button type="purple" class="marketing-start-btn">
          광고신청
        </cl-button>
      </div>
    </div>
    <cl-button type="white" class="add-service" @click="$router.push('/product/create')">
      <img src="~/assets/imgs/icon/ico-plus.svg" alt="plus">
      <span>서비스 등록하기</span>
    </cl-button>
    <div v-if="products.length" class="order-list-holder">
      <template v-if="products[0].id">
        <OrderCard
          v-for="product in products"
          :key="`product-${product.id}`"
          :item="product"
          manage
          status="sales-ing"
          @click="productClick(product)"
        />
      </template>
    </div>
    <no-data v-else main-msg="내역이 없습니다" />
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'
import ToggleSwitch from '@/components/common/ToggleSwitch'
import OrderCard from '@/components/order/OrderCard'
import NoData from '@/components/common/NoData'

export default {
  name: 'SalesServicePage',
  components: { ClButton, ToggleSwitch, OrderCard, NoData },
  data () {
    return {
      products: []
    }
  },
  computed: {
    type () {
      return this.$route.query.type || ''
    }
  },
  watch: {
    type: 'getProductList'
  },
  mounted () {
    this.getProductList()
  },
  methods: {
    async getProductList () {
      this.products = Array.from({ length: 2 }).map(() => ({}))
      this.products = (await this.$api.get('products')).filter(order => this.type === 'all' ? order : order.status === this.type)
    },
    productClick (product) {
      this.$router.push(`/product/${product.channel_id}/${product.id}`)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[sales-service-page] {
  .hd-area { .rel; .mb(50);
    .control-box{ .abs; .rt(0,-10); .z(1);
      .switch-box{ .ib; .vam; .mr(15); .p(12, 20); .br(7); .bgc(#fff); .no-drag; box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.06);
        .label{ .ib; .vam; .mr(18); .fs(16,20); .c(@gray);
          > img { .vab; .h(20); .pointer; }
          &:hover{
            .tooltip-box{ .block; }
          }
          .tooltip-box{ .hide; .abs; .rb(0,-132); .z(2); .w(387.5); .br(10); .bgc(#fff); box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
            &::before{ .cnt; .abs; .lt(36%,-5); .z(1); .wh(40,30); .br(5); .bgc(#fff); box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16); transform:rotate(45deg);  }
            >ul{ .rel; .z(2); .p(19,17); .bgc(#fff);
              >li{ .fs(14,21); .c(#aaa); }
            }
          }
        }
      }
      .marketing-start-btn{
        >button{ .wh(117,48); .fs(20); }
      }
    }
  }
  .tit { .mb(29); .fs(28, 33); .c(@title-black); .semi-bold; }
  .add-service { .w(100%); .mb(29);
    >button { .wh(100%, 66); .fs(20); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      span{ .ib; .vam; .ml(10); }
    }
  }
  [no-data]{ .mb(80); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    p.main-msg{ .c(#ccc); }
  }
}
</style>
