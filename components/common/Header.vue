<template>
  <header header>
    <div class="top-hd">
      <ul class="inner-holder">
        <li>
          <router-link to="#">
            브랜드사 전용 서비스
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-hd inner-holder">
      <div class="logo">
        <router-link to="/">
          <img :src="colorLogo" alt="the celleb logo">
        </router-link>
      </div>
      <nav>
        <router-link to="#">
          메시지
        </router-link>
        <router-link to="#">
          업체검색
        </router-link>
        <router-link to="#">
          마이페이지
        </router-link>
        <router-link to="#">
          <div class="profile" />
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import colorLogo from '@/assets/imgs/icon/color-logo.svg'

export default {
  name: 'Header',
  data () {
    return {
      colorLogo
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[header] { box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.08);
  .top-hd { .crop; .p(14, 0); .-b(#EEEEEE, 2);
    > ul {
      > li { .fr; .vam;
        > a { .ib; .mr(2); .fs(14,17); .c(@gray); .vam; }
        &::after{ .cnt; .ib; .wh(15); .vam; .bg('@{icon}/ico-small-arrow.svg'); .no-repeat; .bg-c; .bg-sx(4.5); }
      }
    }
  }
  .main-hd { .crop; .pt(19); .pb(20);
    .logo { .fl; .p(10,0); }
    nav { .fr;
      > a { .ib; .m(0, 2.5); .p(0, 12); .fs(16, 42); .c(@gray); }
    }
  }
}

</style>
