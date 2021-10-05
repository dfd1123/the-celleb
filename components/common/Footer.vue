<template>
  <footer footer>
    <div class="inner-holder ft-top">
      <div class="logo">
        <img src="~/assets/imgs/icon/logo-gray.svg">
      </div>
      <div class="info">
        <span>
          <em>TEL:</em>
          02-1234-5678
        </span>
        <span>
          <em>FAX:</em>
          02-1234-5678
        </span>
        <br>
        <span>
          <em>E-mail:</em>
          THE_CELEBRITY@theseleb.co.kr
        </span>
        <br>
        <span>
          <em>Address:</em>
          서울특별시 강서구 마곡동 757 두산더랜드파크
        </span>
      </div>
      <div class="contact">
        <b>1544-1544</b>
        <span>평일 09:00 ~ 18:00 (점심시간 12:00~13:00)</span>
      </div>
    </div>
    <div class="ft-bottom">
      <div class="inner-holder">
        <div class="left">
          <router-link to="#">
            고객지원
          </router-link>
          <router-link to="#">
            개인정보처리방침
          </router-link>
          <router-link to="#">
            서비스약관
          </router-link>
        </div>
        <div class="right">
          <router-link to="#">
            서비스소개
          </router-link>
          <router-link to="#">
            등록문의
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[footer]{ .pt(48); .pb(37); .bgc(#f9f9f9);
  .inner-holder{ .rel; }
  .ft-top { .mb(45); }
  .logo{ .abs; .lt(10,0); .z(1); }
  .info{ .pl(276); .pr(332);
    >span{ .fs(15,24); .c(#888);
      &:nth-of-type(1) {
        &::after{ .cnt; .ib; .wh(1,10); .m(0, 5); vertical-align: baseline; .bgc(#888); }
      }
      >em{ .bold; }
    }
  }
  .contact{ .abs; .rt(10,0); .z(1);
    >b{ .block; .mb(9); .fs(32); .semi-bold; .c(@gray); }
    >span{ .block; .fs(18,21); .c(#888); }
  }
  .ft-bottom{ .crop; .pt(18.4); .-t(#dbdbdb);
    .left{ .fl; }
    .right{ .fr; }
    a { .p(0, 20.5); .fs(16,19); .c(@middle-gray); }
  }
}
</style>
