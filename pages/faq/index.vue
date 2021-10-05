<template>
  <div faq-page>
    <div class="inner-holder">
      <h2 class="page-tit">
        자주 묻는 질문
      </h2>
      <div class="search-holder">
        <div class="search-inp">
          <TextInput v-model="searchText" placeholder="검색어를 입력하세요." @enter="searchFaq" />
          <cl-button type="purple" @click="searchFaq">
            검색
          </cl-button>
        </div>
        <div class="top-question-list">
          <span>자주 묻는 질문</span>
          <ul>
            <li>구매는 어디서 하나요</li>
            <li>회원가입 이후 절차가 무엇인가요</li>
            <li>결제는 어떻게 하나요</li>
          </ul>
        </div>
      </div>
    </div>
    <SlideTabNav :menu-list="menuList" />
    <div class="inner-holder">
      <div v-if="resultSearchText" class="search-info">
        <p>'{{ resultSearchText }}'에 관한 자주 묻는 질문</p>
      </div>
      <NoData v-if="false" main-msg="검색 결과가 없습니다." sub-msg="다른 검색어로 검색해주세요. <br />더 많은 질문에 답변할 수 있도록 노력하겠습니다." />
      <template v-else>
        <accordion-view v-for="i in 8" :key="`faq-${i}`">
          <template #title>
            <div class="header">
              <span>서비스 안내</span>
              <p>
                더셀럽은 어떤 서비스인가요?
              </p>
            </div>
          </template>
          <div class="answer-box">
            더셀럽은 업종과 예산, 채널,마케팅 목적을 선택하면 업종에 맞는 인플루언서를 매칭해주는 서비스입니다.
            또한 각 분야의 업체가 제공하는 서비스와 상품을 거래할 수 있는 인플루언서 중개 플랫폼입니다.
            자세한 사항은 서비스의 소개 페이지에서 확인하실 수 있습니다.
          </div>
        </accordion-view>
      </template>
      <div class="control-box">
        <cl-button type="line">
          1:1 채팅 문의
        </cl-button>
        <cl-button type="line">
          고객센터 문의
        </cl-button>
      </div>
    </div>
    <Pagination :chunk-size="10" :total-count="100" />
  </div>
</template>

<script>
import TextInput from '@/components/common/input/TextInput'
import ClButton from '@/components/common/ClButton'
import SlideTabNav from '@/components/common/menu/SlideTabNav'
import AccordionView from '@/components/common/AccordionView'
import Pagination from '@/components/common/Pagination'
import NoData from '@/components/common/NoData'

export default {
  name: 'FAQPage',
  components: {
    TextInput,
    ClButton,
    SlideTabNav,
    AccordionView,
    Pagination,
    NoData
  },
  data () {
    return {
      searchText: '',
      resultSearchText: '',
      menuList: ['서비스 안내', '가입 / 인증 / 탈퇴', '로그인 / 계정정보', '구매 / 결제', '영수증 안내', '거래 중 문제', '패널티 제도']
    }
  },
  methods: {
    searchFaq () {
      console.log('enter')
      this.resultSearchText = this.searchText
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[faq-page] {
  .page-tit { .mt(57); .mb(31); .fs(28, 33); .c(@black); }
  .search-holder { .wh(100%, 160); .pt(34); .pb(32); .br(5); .-a(#D7D1FF); .bgc(#F9F8FF); box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.06);
    .search-inp { .rel; .w(516); .mh-c; .pr(116);
      [text-input] { .w(400);
        > input { .p(0, 20); .fs(18, 48); }
      }
      [cl-button] { .abs; .rt(0, 0); .z(1);
        > button { .wh(104, 48); .fs(24, 48); }
      }
    }
    .top-question-list { .tc; .mt(27);
      > span { .ib; .fs(16, 19); .c(@gray); .regular; .vam; }
      > ul { .crop; .ib; .ml(21); .vam;
        > li { .fl; .fs(16, 19); .c(#AAAAAA); .pointer;
          &::after { .cnt; .ib; .wh(1, 12); .m(0, 10); .bgc(#AAAAAA); .vam; }
          &:last-child {
            &::after { .hide; }
          }
        }
      }
    }
  }
  [slide-tab-nav] {
    .ca-nav-con { .mt(42);
      > span {
        > a { .p(25, 0); .fs(16, 19); }
      }
    }
  }
  [accordion-view] {
    label { .p(0, 0); .-b(#EEEEEE); }
    .header { .p(26, 0); .fs(18, 21);
      > span { .ib; .w(194); .c(#AAAAAA); .vam; }
      > p { .rel; .ib; width: calc(100% - 204px); .pr(27); .ellipsis; .vam;
        &::after { .cnt; .abs; .rt(0, 6); .z(1); .wh(17, 9); .contain('~/assets/imgs/icon/ico-angle.svg'); .bg-c; transition: transform 0.2s; }
      }
    }
    .context-box { .p(0, 0); .bgc(#FFFFFF);
      .answer-box { .pt(25); .pb(55); .pl(204); .pr(20); }
    }

    &.open {
      .header { .-b(#888888);
        > p {
          &::after { transform: rotate(180deg); }
        }
      }
    }
  }
  [no-data] { .-b(#eee); }
  .search-info { .mt(46); .pb(22); .fs(22, 27); .c(#888888); .semi-bold; .-b(#EEEEEE); }
  .control-box { .m(21, 0); .tr;
    [cl-button] { .ml(16);
      > button { .p(0, 27); .fs(16, 48); }
    }
  }
  [pagination] { .mt(73.6); .mb(181.2); }
}
</style>
