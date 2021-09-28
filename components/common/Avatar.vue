<template>
  <div avatar>
    <img :src="image" :alt="alt">
    <div class="my-menu">
      <span />
      <ul>
        <li>
          <router-link to="/">
            계정설정
          </router-link>
        </li>
        <li>
          <router-link to="/">
            로그아웃
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import defaultProfileImg from '@/assets/imgs/default/account.png'

export default {
  name: 'Avatar',
  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: 'profile-image' }
  },
  computed: {
    image () {
      if (!this.src) { return defaultProfileImg } else { return this.src }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[avatar]{ .rel; .wh(42); .no-drag;
  >img{ .wh(100%); object-fit: cover; .br(50%); }
  .my-menu { visibility: hidden; .abs; .lt(-30.5,45); .z(1); .w(103); .pt(10); .mt(-10); .o(0); transition: opacity 0.2s;
    span{ .abs; .lt(0,-5); .z(1); .w(100%); .tc;
      &::after { .cnt; .ib; .-b(#fff,5); .-l(transparent,5); .-r(transparent,5); }
    }
    ul{ .crop; .p(5, 0); .bgc(#fff); .br(10); box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
      >li{
        >a{ .block; .fs(15, 40); .c(#333); .tc; transition: background-color 0.2s;
          &:hover{ .bgc(#eee); }
        }
      }
    }
  }
  &:hover{
    .my-menu{ visibility: visible; .o(1); }
  }
}
</style>
