<template>
  <div market-nav>
    <div class="user-info">
      <div class="profile-image">
        <Avatar />
      </div>
      <span class="name">더셀럽 님</span>
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
                전체 (3)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=reqNotWrite">
                요청사항 미작성 (0)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=ing">
                진행중 (2)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=editReq">
                수정 요청 (1)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=delivering">
                발송중 (1)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=lateSend">
                늦은 발송 (0)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=complete">
                완료 (2)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-manage?type=cancel">
                취소 (1)
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
                전체 (4)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-service?type=ing">
                판매중 (1)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-service?type=wait">
                승인대기중 (1)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-service?type=stop">
                판매중지 (1)
              </router-link>
            </li>
            <li>
              <router-link to="/market/sales-service?type=notApply">
                비승인 (1)
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
import Avatar from '@/components/common/Avatar'
import AccordionView from '@/components/common/AccordionView'

export default {
  name: 'MarketNav',
  components: { Avatar, AccordionView },
  data () {
    return {
      accordionOpen: 'market-manage'
    }
  },
  computed: {
    routeName () {
      return this.$route.name || ''
    }
  },
  mounted () {
    const accordRouteNames = ['market-sales-manage', 'market-sales-service', 'market-advertisement-apply']
    console.log(accordRouteNames.includes(this.routeName))
    if (!accordRouteNames.includes(this.routeName)) {
      this.accordionOpen = ''
    } else {
      this.accordionOpen = this.routeName
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[market-nav]{ .fl; .w(348); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
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
