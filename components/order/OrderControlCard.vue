<template>
  <div order-control-card>
    <div class="main-info">
      <div class="product-img">
        <img v-if="item.id" :src="item.images[0] || sampleOrderProduct" alt="order-product">
      </div>
      <div class="product-info">
        <h6>{{ item.title }}</h6>
        <p>{{ item.simple_intro }}</p>
      </div>
    </div>
    <div class="sub-info">
      <table>
        <tbody>
          <tr>
            <th>기본항목</th>
            <th>작업일</th>
            <th>수량</th>
            <th>가격</th>
          </tr>
          <tr>
            <td>{{ option.id }}</td>
            <td>{{ option.work_day }}일</td>
            <td>
              <IntegerSelect v-model="amount" :min="1" :write="false" @input="changePrice" />
            </td>
            <td><b>{{ totalPrice }}원</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import sampleOrderProduct from 'static/images/product-order-sample.jpg'
import IntegerSelect from '@/components/common/input/IntegerSelect'
import { numberFormat } from '@/utils/numberUtils'

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
      item: {},
      amount: 1
    }
  },
  computed: {
    option () {
      if (!this.item.options) { return {} }
      const option = this.item.options[this.$route.query.option] || {}

      return { ...option, id: this.$route.query.option, commaPrice: numberFormat(option.price) }
    },
    totalPrice () {
      return numberFormat((this.option.price || 0) * this.amount)
    }
  },
  watch: {
    amount () {
      this.item.amount = this.amount
    }
  },
  mounted () {
    this.syncProductInfo()
    this.changePrice()
  },
  methods: {
    syncProductInfo () {
      this.item = this.product
      this.item.amount = 1
    },
    changePrice () {
      this.$emit('change-price', (this.option.price || 0) * this.amount)
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
        th, td { .tc; text-transform: uppercase;
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
