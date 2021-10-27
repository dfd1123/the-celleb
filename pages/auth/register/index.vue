<template>
  <div register-page>
    <div class="contents-holder">
      <div class="logo" @click="$router.push('/')">
        <img src="~/assets/imgs/icon/color-logo.svg" alt="the celleb">
      </div>
      <p v-if="isInfluencer" class="sub-info">
        인플루언서 전용 회원가입
      </p>
      <div class="inp-box-holder">
        <ValidationObserver ref="validator">
          <ValidationProvider v-slot="{errors}" rules="required|email" name="아이디(이메일)" class="inp-box">
            <TextInput v-model="email" type="email" :class="{'error': errors.length > 0}" placeholder="아이디(이메일)을 입력해주세요." />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
          <ValidationProvider v-slot="{errors}" rules="required|password" name="비밀번호" class="inp-box">
            <TextInput v-model="password" type="password" :class="{'error': errors.length > 0}" placeholder="비밀번호를 입력해주세요" />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
          <ValidationProvider v-slot="{errors}" rules="required|password" name="비밀번호 확인" class="inp-box">
            <TextInput v-model="confirmPassword" type="password" :class="{'error': errors.length > 0, 'success': passwordCorrect}" placeholder="비밀번호를 확인해주세요" />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
          <ValidationProvider v-slot="{errors}" rules="required|nicknameRegistered" name="닉네임" class="inp-box">
            <TextInput v-model="nickname" :class="{'error': errors.length > 0}" placeholder="닉네임을 입력해주세요." />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
          <template v-if="!isInfluencer">
            <ValidationProvider v-slot="{errors}" rules="required" name="사업자등록번호" class="inp-box">
              <TextInput v-model="companyRegistNum" type="number" :class="{'error': errors.length > 0}" placeholder="사업자등록번호를 입력해주세요." />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
            <ValidationProvider v-slot="{errors}" rules="required" name="대표자명" class="inp-box">
              <TextInput v-model="ceoName" :class="{'error': errors.length > 0}" placeholder="대표자명을 입력해주세요." />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </template>
          <ValidationProvider v-slot="{errors}" rules="required|url" name="운영중인 SNS주소" class="inp-box">
            <TextInput v-model="snsUrl" :class="{'error': errors.length > 0}" placeholder="운영중인 SNS주소를 입력해주세요." />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
          <template v-if="isInfluencer">
            <ValidationProvider v-slot="{errors}" rules="required" name="인플루언서 이름" class="inp-box">
              <TextInput v-model="influencerName" :class="{'error': errors.length > 0}" placeholder="인플루언서 이름을 입력해주세요." />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </template>
        </ValidationObserver>
      </div>
      <div class="agree-list">
        <ul>
          <li>
            <CheckBox v-model="allAgree" label="전체동의" class="all-agree" :val="true" @change="allAgreeChange" />
          </li>
          <li>
            <CheckBox v-model="useTermAgree" label="이용약관 동의(필수)" :val="true" @change="specificAgreeChange" />
          </li>
          <li>
            <CheckBox v-model="privacyAgree" label="개인정보 처리방침 동의(필수)" :val="true" @change="specificAgreeChange" />
          </li>
          <li>
            <CheckBox v-model="marketingAgree" label="SNS 및 이메일 알림 동의(선택)" :val="true" @change="specificAgreeChange" />
          </li>
        </ul>
      </div>
      <cl-button type="purple" class="register-btn" @click="register">
        회원가입
      </cl-button>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/common/input/TextInput'
import CheckBox from '@/components/common/input/CheckBox'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'RegisterPage',
  components: { TextInput, CheckBox, ClButton },
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      companyRegistNum: '',
      nickname: '',
      ceoName: '',
      snsUrl: '',
      influencerName: '',
      allAgree: false,
      useTermAgree: false,
      privacyAgree: false,
      marketingAgree: false
    }
  },
  computed: {
    passwordCorrect () {
      if (this.password && this.confirmPassword) {
        return this.password === this.confirmPassword
      }
      return false
    },
    isInfluencer () {
      return this.$route.query.type === 'influencer'
    }
  },
  methods: {
    async register () {
      await this.$validate(this.$refs.validator)
      const isAgree = await this.validateAgree()

      if (!isAgree) {
        return false
      }

      if (!this.passwordCorrect) {
        this.$toast('비밀번호가 일치하지 않습니다.', { type: 'fail' })
        return false
      }

      this.$router.push('/auth/register/complete')
    },
    allAgreeChange () {
      if (this.allAgree) {
        this.useTermAgree = true
        this.privacyAgree = true
        this.marketingAgree = true
      } else {
        this.useTermAgree = false
        this.privacyAgree = false
        this.marketingAgree = false
      }
    },
    specificAgreeChange () {
      this.allAgree = this.useTermAgree && this.privacyAgree && this.marketingAgree
    },
    validateAgree () {
      if (!this.useTermAgree) {
        this.$toast('이용약관에 동의하지 않으셨습니다.', { type: 'fail' })
      } else if (!this.privacyAgree) {
        this.$toast('개인정보 처리방침에 동의하지 않으셨습니다.', { type: 'fail' })
      }

      return this.useTermAgree && this.privacyAgree
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[register-page]{ .abs; .lt(0, 0); .z(1); .w(100%); .min-h(100%); .p(50,0); .bgc(#fafbff); .flex-center;
  .contents-holder { .max-w(561); .w(100%); .p(41, 40); .bgc(#FFFFFF); .br(12); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .logo { .mt(10.5); .mb(21.3); .tc; .pointer;
      > img { .h(27); }
    }
    .sub-info { .fs(18,21); .c(@title-black); .tc; }
    .inp-box-holder{ .mt(44);
      .inp-box{
        [text-input]{ .wh(100%, 56);
          > input { .wh(100%, 56); .p(0,20); .fs(20,56);  }
        }
      }
    }
    .agree-list{
      ul{
        >li{ .m(11,0);
          [check-box]{
            label{
              >span{ .fs(15); .c(#999); }
            }
            &.all-agree{
              label{
                >span{ .c(@gray); }
              }
            }
          }
        }
      }
    }
    [cl-button]{ .w(100%); .mt(40);
      >button{ .wh(100%, 70); .fs(22); }
    }
  }
}
</style>
