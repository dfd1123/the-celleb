<template>
  <div mypage-nav>
    <div class="user-info">
      <div class="profile-image">
        <Avatar :src="userInfo.image" />
      </div>
      <span class="name">{{ userInfo.nickname }} 님</span>
    </div>
    <ul class="menu-list">
      <li>
        <accordion-view
          :id="true"
          v-model="accordionOpen"
          title="구매관리"
          :class="{'on': routeName === 'mypage-purchase'}"
        >
          <ul>
            <li>
              <router-link to="/mypage/purchase?type=all">
                전체 ({{ allOrderCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/mypage/purchase?type=remain_req">
                요청사항 미작성 ({{ remainReqCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/mypage/purchase?type=ing">
                진행중 ({{ ingCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/mypage/purchase?type=edit_req">
                수정 요청 ({{ editReqCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/mypage/purchase?type=shipping">
                발송중 ({{ shippingCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/mypage/purchase?type=complete">
                완료 ({{ completeCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/mypage/purchase?type=un_review">
                평가 미작성 ({{ unReviewCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/mypage/purchase?type=cancel">
                취소 ({{ cancelCnt }})
              </router-link>
            </li>
          </ul>
        </accordion-view>
      </li>
      <li>
        <router-link to="/mypage/payment" :class="{'on': routeName === 'mypage-payment'}">
          결제내역
        </router-link>
      </li>
      <li>
        <router-link to="/mypage/cash" :class="{'on': routeName.includes('mypage-cash')}">
          캐시내역
        </router-link>
      </li>
      <li>
        <router-link to="/mypage/coupon" :class="{'on': routeName === 'mypage-coupon'}">
          쿠폰
        </router-link>
      </li>
      <li>
        <router-link to="/mypage/account" :class="{'on': routeName === 'mypage-account'}">
          계정설정
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from '@/components/common/Avatar'
import AccordionView from '@/components/common/AccordionView'

export default {
  name: 'MypageNav',
  components: { Avatar, AccordionView },
  data () {
    return {
      accordionOpen: false,
      orders: []
    }
  },
  computed: {
    routeName () {
      return this.$route.name || ''
    },
    userInfo () {
      return this.$store.state.auth?.myInfo || {}
    },
    allOrderCnt () {
      return this.orders.length
    },
    remainReqCnt () {
      return this.orders.filter(order => order.status === 'remain_req').length
    },
    ingCnt () {
      return this.orders.filter(order => order.status === 'ing').length
    },
    editReqCnt () {
      return this.orders.filter(order => order.status === 'edit_req').length
    },
    shippingCnt () {
      return this.orders.filter(order => order.status === 'shipping').length
    },
    completeCnt () {
      return this.orders.filter(order => order.status === 'complete').length
    },
    unReviewCnt () {
      return this.orders.filter(order => order.status === 'un_review').length
    },
    cancelCnt () {
      return this.orders.filter(order => order.status === 'cancel').length
    }
  },
  mounted () {
    this.accordionOpen = this.$route.name === 'mypage-purchase'
    this.getOrderInfo()
  },
  methods: {
    async getOrderInfo () {
      this.orders = (await this.$api.get('/orders') || []).filter(order => order.buyer_id === this.userInfo.id)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[mypage-nav]{ .fl; .w(348); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
  .user-info{ .rel; .p(22.5, 32); .pl(133); .-b(#ebebeb,2);
    .profile-image { .abs; .lt(32,22.5); .z(1);
      [avatar] { .wh(77); }
    }
    .name { .ib; .p(28.5, 0); .fs(20); .c(@title-black); }
  }
  .menu-list{ .p(20,0);
    > li{
      [accordion-view] {
        .view-wrapper {
          > label { .p(20, 32); .fs(20,24); .c(@title-black); .-b; }
          .context {
            .context-box { .p(8,0); .bgc(#FAFBFF); .-t(#ebebeb); .-b;
              ul{
                li{ .p(8,32);
                  a { .rel; .ib; .fs(18,21); .c(#999);
                    &.nuxt-link-exact-active{ .c(@title-black); .semi-bold;
                      &::after { .cnt; .abs; .lb(0,0); .z(1); .wh(100%,1); .bgc(@title-black);  }
                    }
                  }
                }
              }
            }
          }
        }
        &.on {
          .view-wrapper {
            > label { .semi-bold; }
          }
        }
      }
      > a{ .block; .p(20, 32); .fs(20,24); .c(@title-black);
        &.on { .semi-bold; }
      }
    }
  }
}
</style>
