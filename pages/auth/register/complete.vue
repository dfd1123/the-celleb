<template>
  <div register-complete-page>
    <div class="contents-holder">
      <img src="~/assets/imgs/icon/ico-success-check.svg" alt="success check">
      <h2 class="title" v-html="isInfluencer ? '프로필을 완성하고<br>더욱 많은 고객을 만나보세요!':'회원 가입이 완료되었습니다.'" />
      <p class="message">
        {{ isInfluencer ? '전문분야와 포트폴리오 등록시 더 많은 고객과 매칭됩니다.' : '가입 완료되었습니다. 지금 바로 마케팅 추천을 받으세요!' }}
      </p>
      <cl-button type="purple" @click="$router.push('/auth/login')">
        {{ isInfluencer ? '프로필 완성하기' : '로그인하기' }}
      </cl-button>
    </div>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'

export default {
  name: 'RegisterCompletePage',
  components: { ClButton },
  computed: {
    isInfluencer () {
      return this.$route.query.type === 'influencer'
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[register-complete-page]{ .abs; .lt(0, 0); .z(1); .w(100%); .min-h(100%); .p(50,0); .bgc(#fafbff); .flex-center;
  .contents-holder { .max-w(561); .w(100%); .p(41, 40); .pt(67.4); .pb(58); .tc; .bgc(#FFFFFF); .br(12); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .title{ .mt(18.6); .mb(9); .fs(30,36); .c(@gray);  }
    .message { .m(9,0); .fs(18,21); .c(#999);  }
    [cl-button] { .w(100%);
      >button { .wh(100%, 70); .mt(44); .fs(24); }
    }
  }
}
</style>
