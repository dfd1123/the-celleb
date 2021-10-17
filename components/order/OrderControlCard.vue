<template>
  <div order-control-card>
    <div class="main-info">
      <div class="product-img">
        <img :src="sampleOrderProduct" alt="order-product">
      </div>
      <div class="product-info">
        <h6>더셀럽</h6>
        <p>공동 구매를 빠르고 효율적으로 도와드립니다.</p>
      </div>
    </div>
    <div class="sub-info">
      <table>
        <tr>
          <th>기본항목</th>
          <th>작업일</th>
          <th>수량</th>
          <th>가격</th>
        </tr>
        <tr>
          <td>네이버 쇼핑라이브</td>
          <td>30일</td>
          <td>
            <IntegerSelect v-model="item.amount" :min="1" :write="false" />
          </td>
          <td><b>{{ (item.amount || 0) * (item.price || 0) }}원</b></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import sampleOrderProduct from '@/assets/imgs/sample/product-order-sample.jpg'
import IntegerSelect from '@/components/common/input/IntegerSelect'

export default {
  name: 'OrderControlCard',
  components: { IntegerSelect },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sampleOrderProduct,
      item: {}
    }
  },
  mounted () {
    this.syncProductInfo()
  },
  methods: {
    syncProductInfo () {
      this.item = this.product
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[order-control-card] { .bgc(#FFFFFF);
  .main-info { .rel; .min-h(108); .mb(33); .pl(189);
    .product-img { .abs; .lt(0, 0); .z(1); .wh(157, 108);
      > img { .wh(100%); .vam; object-fit: cover; object-position: center; }
    }
    .product-info {
      h6 { .mb(11); .fs(24, 29); .c(@title-black); .medium; .ellipsis; }
      p { .fs(18, 23); .c(@gray); }
    }
  }
  .sub-info {
    table { .w(100%); border-collapse: collapse;
      tr {
        th, td { .tc;
          &:nth-of-type(1) { .w(40%); .tl; }
          &:nth-of-type(2) { .w(15%); }
          &:nth-of-type(3) { .w(20%); }
          &:nth-of-type(4) { .w(35%); }
          [integer-select] { .mh-c; }
        }

        th { .p(10, 0); .fs(15, 19); .c(#AAAAAA); .medium; .-b(#EBEBEB, 2); }
        td { .p(14, 0); .fs(18, 20);
          b { .fs(20); }
        }
      }
    }
  }
}

</style>
