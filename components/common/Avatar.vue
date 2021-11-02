<template>
  <div avatar>
    <img :src="image" :alt="alt">
    <label v-if="edit" class="profile-img-edit-btn">
      <img src="~/assets/imgs/icon/ico-camera.svg" alt="edit porfile">
      <input type="file" accept="image/*" @change="profileImageChange">
    </label>
    <div v-if="tootip" class="my-menu">
      <span />
      <ul>
        <li>
          <router-link to="/mypage/account">
            계정설정
          </router-link>
        </li>
        <li>
          <router-link to="/login">
            로그아웃
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import defaultProfileImg from '@/assets/imgs/default/account.png'
import { imageFileUpload } from '@/utils/fileUtils'

export default {
  name: 'Avatar',
  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: 'profile-image' },
    tootip: { type: Boolean, default: false },
    edit: { type: Boolean, default: false }
  },
  data () {
    return {
      uploadImage: null
    }
  },
  computed: {
    image () {
      if (this.uploadImage) {
        return this.uploadImage.dataUrl
      } else if (!this.src) {
        return defaultProfileImg
      }

      return this.src
    }
  },
  methods: {
    async profileImageChange (e) {
      this.uploadImage = await imageFileUpload(e)

      this.$emit('change', this.uploadImage)
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
  .profile-img-edit-btn{ .abs; .rb(2,2); .z(1); .ib; .wh(28); .bgc(@strong-purple); .br(50%); .pointer;
    >img{ .wh(20); .m(4); .vam; }
    >input{ .hide; }
  }
  &:hover{
    .my-menu{ visibility: visible; .o(1); }
  }
}
</style>
