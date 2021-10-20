<template>
  <div mypage-account-page>
    <h2 class="tit">
      계정 설정
    </h2>
    <div class="setting-holder">
      <ValidationObserver ref="validator">
        <div class="left">
          <div class="profile-img">
            <Avatar />
            <button class="profile-img-edit-btn">
              <img src="~/assets/imgs/icon/ico-camera.svg" alt="edit porfile">
            </button>
          </div>
          <div class="inp-box">
            <label>이메일</label>
            <ValidationProvider v-slot="{errors}" rules="required|email" name="이메일">
              <TextInput v-model="email" type="email" :class="{'error': errors.length > 0}" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
          <div class="inp-box">
            <label>닉네임</label>
            <ValidationProvider v-slot="{errors}" rules="required|nicknameRegistered" name="닉네임">
              <TextInput v-model="nickname" :class="{'error': errors.length > 0}" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
        </div>
        <div class="right">
          <p class="sub-tit">
            비밀번호 설정
          </p>
          <div class="inp-box">
            <label>현재 비밀번호</label>
            <ValidationProvider v-slot="{errors}" rules="required|password" name="현재 비밀번호">
              <TextInput v-model="currentPassword" type="password" :class="{'error': errors.length > 0}" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
          <div class="inp-box">
            <label>변경할 비밀번호</label>
            <ValidationProvider v-slot="{errors}" rules="required|password" name="변경할 비밀번호">
              <TextInput v-model="changePassword" type="password" :class="{'error': errors.length > 0}" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
          <div class="inp-box">
            <label>비밀번호 확인</label>
            <ValidationProvider v-slot="{errors}" rules="required|password" name="비밀번호 확인">
              <TextInput v-model="confirmPassword" type="password" :class="{'error': errors.length > 0, 'success': passwordCorrect}" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
        </div>
      </ValidationObserver>
    </div>
    <div class="btn-holder">
      <cl-button type="purple" class="edit-btn" @click="editInfo">
        수정하기
      </cl-button>
      <cl-button type="line-gray" class="withdrawal-btn" @click="withdrawalConfirm">
        회원탈퇴
      </cl-button>
    </div>
  </div>
</template>

<script>
import sadFaceIcon from '@/assets/imgs/icon/ico-sad-face.svg'
import Avatar from '@/components/common/Avatar'
import TextInput from '@/components/common/input/TextInput'
import ClButton from '@/components/common/ClButton'
import WithdrawalReasonModal from '@/components/mypage/modal/WithdrawalReasonModal'

export default {
  name: 'MypageAccount',
  components: { Avatar, TextInput, ClButton },
  data () {
    return {
      email: '',
      nickname: '',
      currentPassword: '',
      changePassword: '',
      confirmPassword: ''
    }
  },
  computed: {
    passwordCorrect () {
      if (this.changePassword && this.confirmPassword) {
        return this.changePassword === this.confirmPassword
      }

      return false
    }
  },
  methods: {
    async editInfo () {
      await this.$validate(this.$refs.validator)

      if (!this.passwordCorrect) {
        this.$toast('비밀번호가 일치하지 않습니다.', { type: 'fail' })
        return false
      }

      this.$toast('계정 정보가 변경되었습니다.', { type: 'success' })
    },
    async withdrawalConfirm () {
      const result = await this.$confirm({
        variant: 'withdrawal',
        icon: sadFaceIcon,
        title: '더셀럽을 탈퇴하시겠습니까?',
        message: '구매한 내역이 있을 경우작업이 완료될 때까지 탈퇴를 할 수 없습니다. 탈퇴 완료 후, 개인정보는 즉시 삭제됩니다.',
        button: {
          no: {
            text: '네, 탈퇴할게요',
            value: true
          },
          yes: {
            text: '아니오',
            value: false
          }
        }
      })

      if (result) {
        this.$modal(WithdrawalReasonModal)
      }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[mypage-account-page]{
  .tit { .mb(29); .fs(28,33); .c(@title-black); .semi-bold; }
  .setting-holder{ .clear;
    .left{ .fl; .w(393); .p(35); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      .profile-img{ .rel; .wh(105); .mh-c; .mb(69);
        [avatar] { .wh(100%); }
        .profile-img-edit-btn{ .abs; .rb(0,0); .z(1); .wh(28); .bgc(@strong-purple); .br(50%);
          >img{ .vam; }
        }
      }
    }
    .right{ .fl; .w(393); .ml(30); .p(35); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
      .sub-tit { .mb(36); .fs(24,29); .c(@title-black); .medium; }
    }
    .inp-box{
      >label { .block; .mb(9); .fs(18,21); .c(@title-black); }
      [text-input]{
        >input { .p(0,20); .fs(16); .c(@gray); }
      }
    }
  }
  .btn-holder{ .mt(32); .tr;
    [cl-button]{
      >button { .fs(20); }
      &.edit-btn {
        >button { .wh(192,60); }
      }
      &.withdrawal-btn { .ml(15);
        >button { .wh(113,60); }
      }
    }
  }
}
[confirm]{
  &.withdrawal{
    .btns{
      [cl-button]{
        &.btn-no{ width: calc(((100% / 3) * 1.3) - 16px);
          >button{ .fs(20); .c(#aaa); .bgc(#fff); .-a(#aaa); }
        }
        &.btn-yes{ width: calc(((100% / 3) * 1.7) - 16px); }
      }
    }
  }
}
</style>
