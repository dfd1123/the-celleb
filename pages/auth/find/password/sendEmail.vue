<template>
  <div find-password-send-email>
    <div class="contents-holder">
      <img src="~/assets/imgs/icon/color-logo.svg" alt="the celleb" @click="$router.push('/')">
      <p class="sub-intro">
        계정과 연결된 이메일 주소를 입력하시면,
        비밀번호 재설정 링크를 보내드립니다.
      </p>
      <ValidationObserver ref="validator">
        <div class="inp-box-holder">
          <ValidationProvider v-slot="{errors}" rules="required|email" name="이메일" class="inp-box">
            <TextInput v-model="email" :class="{'error': errors.length > 0}" placeholder="이메일을 입력해 주세요." @enter="sendEmail" />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
        </div>
      </ValidationObserver>
      <cl-button type="purple" @click="sendEmail">
        비밀번호 재설정 링크 전송
      </cl-button>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/common/input/TextInput'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'FindPasswordSendEmail',
  components: { TextInput, ClButton },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    async sendEmail () {
      await this.$validate(this.$refs.validator)

      this.$router.push('/auth/find/password/sendComplete')
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[find-password-send-email]{ .abs; .lt(0, 0); .z(1); .wh(100%); .flex-center;
  .contents-holder { .max-w(561); .w(100%); .p(55, 40); .tc; .bgc(#FFFFFF); .br(12); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    >img{ .h(27.2); }
    .sub-intro { .mt(29.3); .mb(46); .w(294); .mh-c; .fs(18,23); .c(@gray); }
    fieldset { display: contents; }
    .inp-box-holder{ .mt(46); .mb(18); .tl;
      .inp-box{
        [text-input]{ .wh(100%, 56);
          >input{ .h(56); .p(0, 20); .fs(20,56); }
        }
      }
    }
    [cl-button]{ .w(100%);
      >button{ .wh(100%, 70); .fs(22); }
    }
  }
}
</style>
