<template>
  <div my-page-container>
    <div class="inner-holder my-page-holder">
      <MypageNav :user-info="userInfo" />
      <div class="container">
        <nuxt-child :user-info="userInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import MypageNav from '@/components/mypage/MypageNav'

export default {
  name: 'MyPageContainer',
  components: { MypageNav },
  computed: {
    userInfo () {
      return this.$store.state.auth?.myInfo
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[my-page-container]{ .pt(84); .pb(204); .bgc(#fafbff);
  .my-page-holder{ .clear;
    .container{ .fr; .w(816);
     [order-card] { transform: scale(1); .pointer; transition: transform 0.2s;
      &:hover{ transform: scale(1.01); }
     }
    }
  }
}
</style>
