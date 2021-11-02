<template>
  <div influencer-basic-info>
    <div class="profile-img">
      <Avatar edit />
    </div>
    <div class="inp-holder">
      <div class="inp-box">
        <ValidationProvider v-slot="{errors}" rules="required" name="이름">
          <span class="label">이름</span>
          <div class="inp">
            <TextInput v-model="form.name" :class="{'error': errors.length > 0}" />
            <ValidationErrors :errors="errors" />
          </div>
        </ValidationProvider>
      </div>
      <div class="inp-box">
        <ValidationProvider v-slot="{errors}" rules="required" name="자기소개">
          <span class="label">자기소개</span>
          <div class="inp">
            <TextAreaBox v-model="form.introduce" :class="{'error': errors.length > 0}" />
            <ValidationErrors :errors="errors" />
          </div>
        </ValidationProvider>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/common/Avatar'
import TextInput from '@/components/common/input/TextInput'
import TextAreaBox from '@/components/common/input/TextAreaBox'

export default {
  name: 'InfluencerBasicInfo',
  components: {
    Avatar,
    TextInput,
    TextAreaBox
  },
  props: {
    form: {
      type: Object,
      default: () => ({
        image: null,
        name: '',
        introduce: ''
      })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[influencer-basic-info] { .rel; .mt(46); .pl(185);
  .profile-img { .abs; .lt(0, 0); .z(1); .wh(131);
    [avatar] { .wh(100%); }
  }
  .inp-holder {
    .inp-box { .crop;
      .label { .fl; .w(91); .fs(18, 48); .c(@title-black); }
      .inp { .fl; width: calc(100% - 91px);
        [text-area-box] { .h(161);
          textarea { .p(10); }
        }
      }
    }
  }
}
</style>
