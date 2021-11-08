<template>
  <header header>
    <!--    <div class="top-hd">-->
    <!--      <ul class="inner-holder">-->
    <!--        <li>-->
    <!--          <router-link to="#">-->
    <!--            브랜드사 전용 서비스-->
    <!--          </router-link>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--    </div>-->
    <div class="main-hd inner-holder">
      <div class="logo">
        <router-link :to="{path:'/' , query:{}}">
          <img :src="colorLogo" alt="the celleb logo">
        </router-link>
      </div>
      <nav>
        <router-link to="/chatting">
          메시지
        </router-link>
        <router-link to="/product/instagram/list">
          서비스 검색
        </router-link>
        <template v-if="isLogin">
          <router-link to="/mypage">
            마이페이지
          </router-link>
          <router-link v-if="isInfluencer" to="/market/sales-manage?type=all">
            내 서비스 관리
          </router-link>

          <Avatar :src="userInfo.image" tootip />
        </template>
        <template v-else>
          <cl-button type="line-purple" class="login-btn" @click="$router.push('/auth/login')">
            로그인
          </cl-button>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
import colorLogo from '@/assets/imgs/icon/color-logo.svg'
import ClButton from '@/components/common/ClButton'
import Avatar from '@/components/common/Avatar'

export default {
  name: 'Header',
  components: {
    ClButton,
    Avatar
  },
  data () {
    return {
      colorLogo
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.auth?.myInfo
    },
    isInfluencer () {
      return this.isLogin ? this.userInfo.type === 'influencer' : false
    },
    isLogin () {
      return Boolean(this.userInfo?.id)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[header] { .sticky; .lt(0, 0); .z(10); .w(100%); box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.08); .bgc(#FFFFFF);
  .top-hd { .crop; .p(14, 0); .-b(#EEEEEE, 2);
    > ul {
      > li { .fr; .vam;
        > a { .ib; .mr(2); .fs(14, 17); .c(@gray); .vam; }
        &::after { .cnt; .ib; .wh(15); .vam; .bg('@{icon}/ico-small-arrow.svg'); .no-repeat; .bg-c; .bg-sx(4.5); }
      }
    }
  }
  .main-hd { .clear; .pt(19); .pb(20);
    .logo { .fl; .p(10, 0); }
    nav { .fr;
      > a { .ib; .m(0, 2.5); .p(0, 12); .fs(16, 42); .c(@gray); .vam; }
      > button { .ib; .vam; }
      [avatar] { .ib; .vam; }
      [cl-button] {
        &.login-btn { .p(1, 0);
          > button { .wh(85, 40); .fs(15); }
        }
      }
    }
  }
}

</style>
