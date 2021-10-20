<template>
  <div find-password-create>
    <div class="contents-holder">
      <img src="~/assets/imgs/icon/color-logo.svg" alt="the celleb" @click="$router.push('/')">
      <p class="sub-intro">
        새로운 비밀번호를 설정해주세요.
      </p>
      <ValidationObserver ref="validator">
        <div class="inp-box-holder">
          <ValidationProvider v-slot="{errors}" rules="required|password" name="새 비밀번호" class="inp-box">
            <TextInput v-model="password" type="password" :class="{'error': errors.length > 0}" placeholder="새 비밀번호를 입력해 주세요." />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
          <ValidationProvider v-slot="{errors}" rules="required|password" name="비밀번호 재확인" class="inp-box">
            <TextInput v-model="confirmPassword" type="password" :class="{'error': errors.length > 0, 'success': passwordCorrect}" placeholder="비밀번호를 한번 더 입력해 주세요." @enter="changePassword" />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
        </div>
      </ValidationObserver>
      <cl-button type="purple" @click="changePassword">
        비밀번호 변경하기
      </cl-button>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/common/input/TextInput'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'FindPasswordCreate',
  components: { TextInput, ClButton },
  data () {
    return {
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    passwordCorrect () {
      if (this.password && this.confirmPassword) {
        return this.password === this.confirmPassword
      }
      return false
    }
  },
  methods: {
    async changePassword () {
      await this.$validate(this.$refs.validator)

      if (!this.passwordCorrect) {
        this.$toast('비밀번호가 일치하지 않습니다.', { type: 'fail' })
        return false
      }

      this.$router.push('/auth/find/password/complete')
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[find-password-create]{ .abs; .lt(0, 0); .z(1); .wh(100%); .flex-center;
  .contents-holder { .max-w(561); .w(100%); .p(55, 40); .tc; .bgc(#FFFFFF); .br(12); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    >img{ .h(27.2); .pointer; }
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
