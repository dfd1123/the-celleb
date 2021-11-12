<template>
  <div login-page>
    <div class="contents-holder">
      <ValidationObserver ref="validator">
        <div class="logo" @click="$router.push('/')">
          <img src="~/assets/imgs/icon/color-logo.svg" alt="the celleb">
        </div>
        <div class="inp-box-holder">
          <ValidationProvider v-slot="{errors}" rules="required|email" name="이메일" class="inp-box">
            <TextInput v-model="email" type="email" placeholder="이메일을 입력해주세요." />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
          <ValidationProvider v-slot="{errors}" rules="required|password" name="비밀번호" class="inp-box">
            <TextInput v-model="password" type="password" placeholder="비밀번호를 입력해주세요." @enter="login" />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
        </div>
        <cl-button type="purple" class="login-btn" @click="login">
          로그인
        </cl-button>
        <div class="sub-btn-holder">
          <div class="left">
            <router-link to="#">
              아이디 찾기
            </router-link>
            <router-link to="/auth/find/password/sendEmail">
              비밀번호 찾기
            </router-link>
          </div>
          <div class="right">
            <router-link to="#">
              언플루언서 로그인
            </router-link>
          </div>
        </div>
      </ValidationObserver>
      <div class="regist-btns">
        <cl-button type="line-purple" @click="register('brand')">
          브랜드사 회원가입
        </cl-button>
        <cl-button type="line-purple" @click="register('influencer')">
          인플루언서 회원가입
        </cl-button>
      </div>
      <div class="social-login-btns">
        <span>간편 로그인</span>
        <ul class="btn-list">
          <li @click="socialLogin('naver')">
            <img src="~/assets/imgs/icon/ico-naver.svg" alt="naver">
          </li>
          <li @click="socialLogin('facebook')">
            <img src="~/assets/imgs/icon/ico-facebook.svg" alt="facebook">
          </li>
          <li @click="socialLogin('kakao')">
            <img src="~/assets/imgs/icon/ico-kakao.svg" alt="kakao">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/common/input/TextInput'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'LoginPage',
  components: { TextInput, ClButton },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      await this.$validate(this.$refs.validator)

      const users = await this.$api.get('/users')
      const info = users.find(user => user.email === this.email)

      if (info) {
        if (info.password !== this.password) {
          this.$toast('비밀번호가 일치하지 않습니다.', { type: 'fail' })
          return false
        }

        this.$store.commit('auth/setUserInfo', info)
      } else {
        this.$toast('존재하지 않은 아이디 입니다.', { type: 'fail' })
        return false
      }

      this.$router.go(-1)
    },
    socialLogin (social) {
      this.$toast('준비중인 서비스 입니다.', { type: 'fail' })
    },
    register (type = 'brand') {
      this.$router.push(`/auth/register?type=${type}`)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[login-page] { .abs; .lt(0, 0); .z(1); .wh(100%); .flex-center;
  .contents-holder { .max-w(561); .w(100%); .p(41, 40); .bgc(#FFFFFF); .br(12); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .logo { .mt(10.5); .mb(49.3); .tc; .pointer;
      > img { .h(27); }
    }
    .inp-box-holder{
      .inp-box{
        [text-input] { .wh(100%, 56);
          >input{ .h(100%); .fs(20, 56); }
        }
      }
    }
    [cl-button]{
      &.login-btn{ .w(100%);
        >button{ .wh(100%, 70); .fs(22);  }
      }
    }
    .sub-btn-holder{ .crop; .m(16,0);
      .left{ .fl;
        >a {
          &::after{ .cnt; .ib; .vam; .wh(1, 13); .m(0, 10); .lh(19); .bgc(#999); }
          &:last-child{
            &::after{ .hide; }
          }
        }
      }
      .right{ .fr;
        >a { text-decoration: underline; }
      }
      a{ .ib; .vam; .fs(15,19); .c(#999); }
    }
    .regist-btns{ .mt(43);
      [cl-button]{ .fl; width:calc((100% / 2) - 8.5px); .ml(17);
        &:first-child { .ml(0); }
        >button{ .wh(100%, 70); .fs(20); .c(#8c55ff); .-a(#8c55ff); }
      }
    }
    .social-login-btns{ .tc;
      >span{ .ib; .mt(36); .mb(19); .fs(15,19); .c(#aaa); }
      .btn-list{
        >li { .ib; .wh(59); .m(0, 13); .vam; .br(50%); .pointer;
          >img { .vam; }
        }
      }
    }
  }
}
</style>
