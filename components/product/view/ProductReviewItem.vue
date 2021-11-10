<template>
  <li product-review-list>
    <Avatar />
    <div class="info">
      <p>{{ review.text }}</p>
      <span class="date">{{ date }}</span>
      <RatingStar :value="review.rating" active-color="#f87676" :star-size="16" readonly />
    </div>
  </li>
</template>

<script>
import moment from 'moment'
import RatingStar from '@/components/common/RatingStar'
import Avatar from '@/components/common/Avatar'

export default {
  name: 'ProductReviewItem',
  components: { RatingStar, Avatar },
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  computed: {
    date () {
      return moment(this.review.createdAt).format('YY.MM.DD')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-review-list] { .rel; .pt(30); .pb(33.1); .-t(#EBEBEB);
  &:last-child { .-b(#EBEBEB); }
  [avatar] { .abs; .lt(10, 30); .z(1); .wh(76.9); }
  .info { .p(10, 0); .pl(140); .pr(10);
    > p { .mb(18); .fs(18, 21); .c(@title-black); }
    .date { .ib; .fs(18); .c(#CCCCCC); .vam;
      &::after { .cnt; .ib; .wh(1, 12); .ml(10); .mr(5); .vam; .bgc(#CCCCCC); }
    }
    [rating-star] { .ib; .mt(-6); .mb(0); .vam; cursor: default;
      .score { .hide; }
      .rating-star-holder { .vam;
        > div { .m(0, 1); .p(0, 1); cursor: default; }
      }
    }
  }
}

</style>
