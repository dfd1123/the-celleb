<template>
  <div find-password-complete>
    <div class="contents-holder">
      <img src="~/assets/imgs/icon/ico-success-check.svg" alt="success check">
      <h2 class="title">
        비밀번호가 재설정 되었습니다.
      </h2>
      <p class="message">
        다시 로그인하여 이용해주세요 :)
      </p>
      <cl-button type="purple" @click="$router.push('/auth/login')">
        로그인하기
      </cl-button>
    </div>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'

export default {
  name: 'FindPasswordComplete',
  components: { ClButton }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[find-password-complete]{ .abs; .lt(0, 0); .z(1); .w(100%); .min-h(100%); .p(50,0); .bgc(#fafbff); .flex-center;
  .contents-holder { .max-w(561); .w(100%); .p(41, 40); .pt(67.4); .pb(58); .tc; .bgc(#FFFFFF); .br(12); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    >img{ .pointer; }
    .title{ .mt(18.6); .mb(9); .fs(30,36); .c(@gray);  }
    .message { .m(9,0); .fs(18,21); .c(#999);  }
    [cl-button] { .w(100%);
      >button { .wh(100%, 70); .mt(44); .fs(24); }
    }
  }
}
</style>
