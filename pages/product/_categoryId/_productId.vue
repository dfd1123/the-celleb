<template>
  <div product-view-page>
    <CategoryNav />
    <div class="inner-holder product-wrap">
      <div class="detail-info">
        <div class="product-img-slide">
          <swiper>
            <swiper-slide>
              <img src="~/assets/imgs/sample/product-big1.png">
            </swiper-slide>
          </swiper>
        </div>
        <ToggleTab v-model="selectedTab" :tabs="tabs" />
        <div class="contents-holder">
          <div v-show="selectedTab === 0" class="box">
            수정 1회는 무료입니다.
            의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과 동일하게 취급이 됩니다.
            수정 1회는 무료입니다. 의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과
            동일하게 취급이 됩니다. 수정 1회는 무료입니다.

            의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과 동일하게 취급이 됩니다.
            수정 1회는 무료입니다.
            의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과 동일하게 취급이 됩니다.
            수정 1회는 무료입니다. 의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과
            동일하게 취급이 됩니다.
          </div>
        </div>
        <div class="review-con">
          <h2>서비스 평가</h2>
          <div class="review-list-holder">
            <div class="total-review-score">
              <b>5.0</b>
              <span>
                <RatingStar :value="5.0" active-color="#f87676" :star-size="16" readonly />
                215개의 후기
              </span>
            </div>
            <ul class="review-list-wrap">
              <li class="review-li">
                <Avatar />
                <div class="info">
                  <p>감사합니다~ 자주 애용할게요~~~</p>
                  <span class="date">20.07.09</span>
                  <RatingStar :value="5.0" active-color="#f87676" :star-size="16" readonly />
                </div>
              </li>
            </ul>
            <cl-button type="line">
              더 많은 평가보기
            </cl-button>
          </div>
        </div>
      </div>
    </div>
    <SlideProductList subject="다른 회원이 함께 본 서비스" />
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import CategoryNav from '@/components/product/CategoryNav'
import ToggleTab from '@/components/common/tab/ToggleTab'
import RatingStar from '@/components/common/RatingStar'
import Avatar from '@/components/common/Avatar'
import ClButton from '@/components/common/ClButton'
import SlideProductList from '@/components/product/SlideProductList'

export default {
  name: 'ProductViewPage',
  components: {
    Swiper,
    SwiperSlide,
    CategoryNav,
    ToggleTab,
    RatingStar,
    Avatar,
    ClButton,
    SlideProductList
  },
  directives: {
    swiper: directive
  },
  data () {
    return {
      selectedTab: 0,
      tabs: ['서비스 설명', '가격 정보', '수정 / 재진행', '취소 / 환불', '서비스 평가']
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[product-view-page] {
  .product-wrap{ .crop; .p(65, 0);
    .detail-info{ .fl; .w(612); .mr(102);
      .product-img-slide{ .crop; .wh(100%,441); .mb(56); }
      [toggle-tab] { .mb(16); .-b(@purple);
        > button { .rel; .wh(20%, 53); .fs(16,19); .c(#aaa); .light; .vam; .bgc(#fff);
          &.on { .c(@purple); .regular; .-a(@purple); .-b; .br-t(5);
            &::after{ .cnt; .abs; .lb(0,-1); .z(1); .wh(100%, 1); .bgc(#fff); }
          }
        }
      }
      .contents-holder{ .p(27, 10, 56); .-b(#d9d9d9, 2);
         > .box{ .fs(16, 30); .c(#888); }
      }
      .review-con{ .p(46, 0);
        > h2{ .mb(29); .fs(26,31); .c(@gray); .medium; }
        .review-list-holder{
          .total-review-score{ .mb(24); .p(39, 0); .tc; .bgc(#f9f9f9); .-a(#d9d9d9); .br(7);
            >b{ .ib; .fs(56); .bold; .vam; }
            >span{ .ib; .ml(42); .fs(18); .c(@gray); .vam; }
            [rating-star] { .mb(8); cursor: default;
              .score { .hide; }
              .rating-star-holder > div{ .m(0,1); .p(0,1); cursor: default; }
            }
          }
          .review-list-wrap{ .mt(24);
            .review-li{ .rel; .pt(30); .pb(33.1); .-t(#ebebeb);
              &:last-child{ .-b(#ebebeb); }
              [avatar] { .abs; .lt(10,30); .z(1); .wh(76.9); }
              .info{ .p(10,0); .pl(140); .pr(10);
                >p{ .mb(18); .fs(18,21); .c(@title-black); }
                .date{ .ib; .fs(18); .c(#ccc); .vam;
                  &::after{ .cnt; .ib; .wh(1,12); .ml(10); .mr(5); .vam; .bgc(#ccc);  }
                }
                [rating-star] { .ib; .mt(-6); .mb(0); .vam; cursor: default;
                  .score { .hide; }
                  .rating-star-holder{ .vam;
                    > div{ .m(0,1); .p(0,1); cursor: default; }
                  }
                }
              }
            }
          }
          [cl-button] { .w(100%); .mt(38);
            > button { .wh(100%, 64); .fs(18); .c(@gray); }
          }
        }
      }
    }
  }
}
</style>
