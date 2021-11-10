<template>
  <div product-review-wrap>
    <h2 class="sec-tit">
      서비스 평가
    </h2>
    <div class="review-list-holder">
      <div class="total-review-score">
        <b>{{ averageRating }}</b>
        <span>
          <RatingStar :value="averageRating" active-color="#f87676" :star-size="16" readonly />
          {{ reviewTotalCnt }}개의 후기
        </span>
      </div>
      <ul class="review-list-wrap">
        <ProductReviewItem v-for="(review, index) in reviewList" :key="`review-${review.id}${index}`" :review="review" />
      </ul>
      <cl-button v-if="remainReviewList.length" type="line" @click="addReviewList">
        더 많은 평가보기
      </cl-button>
    </div>
  </div>
</template>

<script>
import ProductReviewItem from '@/components/product/view/ProductReviewItem'
import RatingStar from '@/components/common/RatingStar'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'ProductReviewWrap',
  components: { ProductReviewItem, RatingStar, ClButton },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      reviewList: [],
      remainReviewList: []
    }
  },
  computed: {
    averageRating () {
      if (!this.reviewTotalCnt) { return 0.0 }
      const result = (this.totalList.map(review => review.rating).reduce((prev, next) => prev + next, 0) / this.reviewTotalCnt).toFixed(1)

      return result === 'NaN' ? 0.0 : Number(result)
    },
    totalList () {
      return [...this.reviewList, ...this.remainReviewList]
    },
    reviewTotalCnt () {
      return this.totalList.length
    }
  },
  mounted () {
    this.getReviewList()
  },
  methods: {
    async getReviewList () {
      this.reviewList = Array.from({ length: 3 }).map(() => ({}))
      const reviewList = (await this.$api.get('/reviews')).sort((a, b) => { if (a.createdAt > b.createdAt) { return 1 } else if (a.createdAt < b.createdAt) { return -1 } else { return 0 } })

      let maxCnt = Math.floor(Math.random() * reviewList.length)
      maxCnt = maxCnt < 2 ? 4 : maxCnt
      this.reviewList = reviewList.slice(0, maxCnt > 6 ? 6 : maxCnt)
      this.remainReviewList = reviewList
    },
    addReviewList () {
      const sliceLength = this.remainReviewList.length > 3 ? 3 : this.remainReviewList.length
      this.reviewList = [...this.reviewList, ...this.remainReviewList.splice(0, sliceLength)]
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-review-wrap] {.p(46, 0);
  .review-list-holder {
    .total-review-score { .mb(24); .p(39, 0); .tc; .bgc(#F9F9F9); .-a(#D9D9D9); .br(7);
      > b { .ib; .fs(56); .bold; .vam; }
      > span { .ib; .ml(42); .fs(18); .c(@gray); .vam; }
      [rating-star] { .mb(8); cursor: default;
        .score { .hide; }
        .rating-star-holder > div { .m(0, 1); .p(0, 1); cursor: default; }
      }
    }
    .review-list-wrap { .mt(24); }
    [cl-button] { .w(100%); .mt(38);
      > button { .wh(100%, 64); .fs(18); .c(@gray); }
    }
  }
}

</style>
