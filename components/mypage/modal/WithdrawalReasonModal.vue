<template>
  <modal withdrawal-reason-modal @close="close" @resolve="resolve">
    <template #title>
      탈퇴하려는 사유를 선택해주세요.
    </template>
    <div class="reason-list">
      <ValidationObserver ref="validator">
        <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="탈퇴 사유">
          <RadioBox v-model="reason" label="다른 계정으로 사용하기 위해서" val="diffrentAccount" />
          <RadioBox v-model="reason" label="사용빈도가 낮고, 개인정보 유출이 우려되서" val="useRatio" />
          <RadioBox v-model="reason" label="사이트 이용시 장애가 많아서" val="test3" />
          <RadioBox v-model="reason" label="서비스의 질에 대한 불만이 있어서" val="test4" />
          <RadioBox v-model="reason" label="사이트 이용시 고객응대가 나빠서" val="test5" />
          <RadioBox v-model="reason" label="기타" val="test6" />
          <ValidationErrors v-if="!reason" :errors="errors" />
        </ValidationProvider>
        <div v-if="reason === 'test6'" class="direct-reason">
          <ValidationProvider v-slot="{errors}" rules="required" vid="탈퇴 사유1" name="탈퇴 사유">
            <TextInput v-model="directReason" :class="{'error':errors.length > 0}" />
            <ValidationErrors :errors="errors" />
          </ValidationProvider>
        </div>
      </ValidationObserver>
    </div>
    <div class="btn-holder">
      <cl-button type="line-gray" @click="resolve">
        탈퇴하기
      </cl-button>
      <cl-button type="purple" @click="close">
        취소
      </cl-button>
    </div>
  </modal>
</template>

<script>
import sadFaceIcon from '@/assets/imgs/icon/ico-sad-face.svg'
import Modal from '@/components/common/modal/Modal'
import RadioBox from '@/components/common/input/RadioBox'
import TextInput from '@/components/common/input/TextInput'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'WithdrawalReasonModal',
  components: { Modal, RadioBox, TextInput, ClButton },
  data () {
    return {
      reason: '',
      directReason: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    async resolve () {
      await this.$validate(this.$refs.validator)

      this.$emit('resolve')
      this.$alert({
        icon: sadFaceIcon,
        title: '탈퇴가 완료되었습니다.',
        message: '더셀럽을 이용해주셔서 감사합니다.'
      })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[withdrawal-reason-modal] {
  &[modal] {
    .panel{ .max-w(472);
      .header{ .mb(32.7);
        .title{ .fs(26,31); }
      }
      .body {
        .reason-list{
          [radio-box]{ .block; .m(17,0);
            >label{
              >span{ .fs(18,21); .c(@gray); }
            }
          }
        }
        .btn-holder{ .clear; .mt(44);
          [cl-button]{ .fl; width:calc((100% / 2) - 7px);
            &:nth-of-type(2){ .ml(14); }
            >button{ .wh(100%,60); .fs(20); }
          }
        }
      }
    }
  }
}
</style>
