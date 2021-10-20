<template>
  <div find-password-send-complete>
    <div class="contents-holder">
      <img src="~/assets/imgs/icon/ico-success-check.svg" alt="success check">
      <h2 class="title">
        링크가 발송되었습니다.<br>
        이메일을 확인해주세요 :)
      </h2>
      <cl-button type="light-gray" @click="$router.push('/auth/find/password/create')">
        비밀번호 재설정 링크 재전송
      </cl-button>
    </div>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'

export default {
  name: 'RegisterCompletePage',
  components: { ClButton }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[find-password-send-complete]{ .abs; .lt(0, 0); .z(1); .w(100%); .min-h(100%); .p(50,0); .bgc(#fafbff); .flex-center;
  .contents-holder { .max-w(561); .w(100%); .p(41, 40); .pt(67.4); .pb(58); .tc; .bgc(#FFFFFF); .br(12); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .title{ .mt(18.6); .mb(9); .fs(30,36); .c(@gray);  }
    .message { .m(9,0); .fs(18,21); .c(#999);  }
    [cl-button] { .w(100%);
      >button { .wh(100%, 70); .mt(44); .fs(24); }
    }
  }
}
</style>
