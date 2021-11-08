<template>
  <div market-nav>
    <div class="user-info">
      <div class="profile-image">
        <StoreAvatar :src="userInfo.image" />
      </div>
      <span class="name">{{ userInfo.nickname }} 님</span>
    </div>
    <ul class="menu-list">
      <li>
        <accordion-view
          id="market-sales-manage"
          v-model="accordionOpen"
          title="판매관리"
          :class="{'on': routeName === 'market-sales-manage'}"
        >
          <ul>
            <li>
              <router-link to="/market/sales-manage?type=all">
                전체 ({{ allOrderCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=remain_req">
                요청사항 미작성 ({{ remainReqCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=ing">
                진행중 ({{ ingCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=edit_req">
                수정 요청 ({{ editReqCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=shipping">
                발송중 ({{ shippingCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=complete">
                완료 ({{ completeCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=un_review">
                평가 미작성 ({{ unReviewCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=cancel">
                취소 ({{ cancelCnt }})
              </router-link>
            </li>
          </ul>
        </accordion-view>
      </li>
      <li>
        <accordion-view
          id="market-sales-service"
          v-model="accordionOpen"
          title="판매서비스"
          :class="{'on': routeName === 'market-sales-service'}"
        >
          <ul>
            <li>
              <router-link to="/market/sales-service?type=all">
                전체 ({{ allProductCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-service?type=ing">
                판매중 ({{ ingProductCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-service?type=wait">
                승인대기중 ({{ waitProductCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-service?type=stop">
                판매중지 ({{ stopProductCnt }})
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-service?type=reject">
                비승인 ({{ rejectProductCnt }})
              </router-link>
            </li>
          </ul>
        </accordion-view>
      </li>
      <li>
        <router-link to="/market/revenue" :class="{'on': routeName === 'market-revenue'}">
          수익관리
        </router-link>
      </li>
      <li>
        <router-link to="/market/advertisement" :class="{'on': routeName === 'market-advertisement'}">
          광고관리
        </router-link>
      </li>
      <li>
        <accordion-view
          id="market-advertisement-apply"
          v-model="accordionOpen"
          title="광고신청"
          :class="{'on': routeName === 'market-advertisement-apply'}"
        >
          <ul>
            <li>
              <router-link to="/market/advertisement/apply?type=master">
                마스터
              </router-link>
            </li>
            <li>
              <router-link to="/market/advertisement/apply?type=premium">
                프리미엄
              </router-link>
            </li>
            <li>
              <router-link to="/market/advertisement/apply?type=plus">
                플러스
              </router-link>
            </li>
          </ul>
        </accordion-view>
      </li>
      <li>
        <router-link to="/market/mileage" :class="{'on': routeName === 'market-mileage'}">
          기업 마일리지
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import StoreAvatar from '@/components/common/StoreAvatar'
import AccordionView from '@/components/common/AccordionView'

export default {
  name: 'MarketNav',
  components: { StoreAvatar, AccordionView },
  data () {
    return {
      accordionOpen: 'market-manage',
      orders: [],
      products: []
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
    },
    allProductCnt () {
      return this.products.length
    },
    ingProductCnt () {
      return this.products.filter(product => product.service_status === 'ing').length
    },
    waitProductCnt () {
      return this.products.filter(product => product.service_status === 'wait').length
    },
    rejectProductCnt () {
      return this.products.filter(product => product.service_status === 'reject').length
    },
    stopProductCnt () {
      return this.products.filter(product => product.service_status === 'stop').length
    }
  },
  mounted () {
    const accordRouteNames = ['market-sales-manage', 'market-sales-service', 'market-advertisement-apply']

    if (!accordRouteNames.includes(this.routeName)) {
      this.accordionOpen = ''
    } else {
      this.accordionOpen = this.routeName
    }

    this.getOrderInfo()
    this.getProductInfo()
  },
  methods: {
    async getOrderInfo () {
      this.orders = await this.$api.get('/orders')
    },
    async getProductInfo () {
      this.products = await this.$api.get('/products')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[market-nav]{ .fl; .w(348); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
  .user-info{ .rel; .p(22.5, 32); .pl(133); .-b(#ebebeb,2);
    .profile-image { .abs; .lt(32,22.5); .z(1);
      [store-avatar] { .wh(77); }
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
