<template>
  <footer footer>
    <div class="inner-holder ft-top">
      <div class="logo">
        <img src="~/assets/imgs/icon/logo-gray.svg">
      </div>
      <div class="info">
        <span class="dl">
          <em>상호</em>
          주식회사 라르크 인터내셔널
        </span>
        <span class="dl">
          <em>대표</em>
          정민준
        </span>
        <span>
          <em>사업자등록번호</em>
          822-88-02158
        </span>
        <br>
        <span class="dl">
          <em>통신판매업 신고</em>
          제2021-서울강남-03773호 <a href="#">[사업자정보확인]</a>
        </span>
        <span>
          <em>전화</em>
          070-7733-5799
        </span>
        <br>
        <span>
          <em>주소</em>
          서울특별시 강남구 압구정로8길 20 (신사동) 4층
        </span>
        <br>
        <span>
          <em>개인정보관리책임자</em>
          주식회사 라르크인터내셔널 (hellodolarc-int.com)
        </span>
      </div>
      <div class="contact">
        <b>070-7733-5799</b>
        <span>평일 09:00~18:00  주말 및 공휴일 휴무</span>
        <div class="sm-link">
          <a href="#">개인정보처리방침</a>
          <a href="#">서비스약관</a>
        </div>
      </div>
    </div>
    <div v-show="false" class="ft-bottom">
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
      &.dl {
        &::after{ .cnt; .ib; .wh(1,10); .m(0, 5); vertical-align: baseline; .bgc(#888); }
      }
      >em{ .bold; }
    }
  }
  .contact{ .abs; .rt(10,0); .z(1);
    >b{ .block; .mb(9); .fs(32); .medium; .c(@gray); }
    >span{ .block; .fs(18,21); .c(#888); }
    .sm-link{ .mt(16.4);
      >a { .ib; .mr(16); .fs(13,16); .c(#999); }
    }
  }
  .ft-bottom{ .crop; .pt(18.4); .-t(#dbdbdb);
    .left{ .fl; }
    .right{ .fr; }
    a { .p(0, 20.5); .fs(16,19); .c(@middle-gray); }
  }
}
</style>
