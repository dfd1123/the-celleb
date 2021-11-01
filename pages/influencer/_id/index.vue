<template>
  <div brand-view-page>
    <div class="inner-holder">
      <div class="white-box hd-box">
        <div class="profile">
          <StoreAvatar />
          <div class="info">
            <div class="name">
              <h4>
                더셀럽
              </h4>
              <button>프로필 수정</button>
            </div>
            <div class="rating-info">
              <RatingStar :value="5.0" active-color="#f87676" :star-size="18" readonly />
              <em class="score">5.0</em>
              <span>(300개의 평가)</span>
            </div>
          </div>
        </div>
        <ul class="store-info">
          <li>
            <b>150개</b>
            <span>작업 수</span>
          </li>
          <li>
            <b>100%</b>
            <span>만족도</span>
          </li>
          <li>
            <b>30분 이내</b>
            <span>평균응답시간</span>
          </li>
        </ul>
      </div>
      <div class="white-box introduce-box">
        <h5 class="sub-tit">
          소개
        </h5>
        <p class="intro">
          지금 우리는 제품 & 서비스 배포 및 판매에 어려움을 겪고 있는 모든 기업들을 지원하여 Creative로 변화된 세상의 중심으로 이끌어 가기 위해
          열정적인 컨설팅 서비스를 제공하고 있습니다.  주식회사 케이씨에이미디어는 미디어서비스, 정보기술서비스, 유통서비스를 사업영역으로 가진
          젊은 기업입니다. 열정을 확신으로 만들어가는 기업으로 종합광고대행 및 광고마케팅 분야의 선두주자가 되겠습니다.
          <br><br>
          퍼포먼스 마케팅과 성과형 광고를 중심으로 연간 300퍼센트 이상의 매출성장을 기록하고 있으며, 폭넓은 온라인 네트워크와 오프라인 네트워크
          확장을 통해 PON 이라는 O2O 광고플랫폼의 주요 플레이어 회사이기도 합니다. 광고에 대한 끊임없는 고민과 탐구를 통해 종합 크리에이티브 그룹으로
          성장하고 있습니다.
        </p>
      </div>
      <div v-if="itemList.length" class="white-box service-box">
        <h5 class="sub-tit">
          서비스
        </h5>
        <div class="item-list-holder">
          <ProductCardWrap :list="itemList" />
        </div>
        <div class="more-btn">
          <cl-button type="line">
            <img src="~/assets/imgs/icon/ico-plus.svg" alt="plus">
            <span>더보기</span>
          </cl-button>
        </div>
      </div>
      <div class="white-box portfolio-box">
        <h5 class="sub-tit">
          포트폴리오
        </h5>
        <div class="portfolio-list-holder">
          <div v-for="i in 4" :key="`portfolio-${i}`" class="small-portfolio-thumb" @click="portfolioModalOpen">
            <img :src="`/images/portfolio${i}.jpg`" :alt="`portfolio${i}`">
          </div>
        </div>
        <div class="more-btn">
          <cl-button type="line">
            <img src="~/assets/imgs/icon/ico-plus.svg" alt="plus">
            <span>더보기</span>
          </cl-button>
        </div>
      </div>
      <div class="white-box career-box">
        <h5 class="sub-tit">
          경력
        </h5>
        <ul class="career-list">
          <li>
            <span class="date">2016.03 ~ 2020.09</span>
            <div class="position">
              <span><b>업체명</b> 마케팅팀</span><span>디자이너(담당업무: 브랜딩, 마케팅)</span>
            </div>
          </li>
          <li>
            <span class="date">2016.03 ~ 2020.09</span>
            <div class="position">
              <span><b>업체명</b> 디자인팀</span><span>디자이너(담당업무: 브랜딩, 마케팅)</span>
            </div>
          </li>
          <li>
            <span class="date">2016.03 ~ 2020.09</span>
            <div class="position">
              <span><b>업체명</b> 총괄팀</span><span>디자이너(담당업무: 브랜딩, 마케팅)</span>
            </div>
          </li>
          <li>
            <span class="date">2016.03 ~ 2020.09</span>
            <div class="position">
              <span><b>업체명</b> 마케팅팀</span><span>디자이너(담당업무: 브랜딩, 마케팅)</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="white-box specialty-box">
        <h5 class="sub-tit">
          전문분야
        </h5>
        <div class="field-holder">
          <span class="label">온라인 광고</span>
          <div class="field-area">
            <div class="field-list main-field-list">
              <span class="sub-label">전문분야</span>
              <ul>
                <li>검색광고</li>
                <li>배너광고</li>
                <li>검색광고</li>
              </ul>
            </div>
            <div class="field-list sub-field-list">
              <span class="sub-label">주요업종</span>
              <ul>
                <li>교육</li>
                <li>문화</li>
                <li>스포츠</li>
                <li>예술 / 디자인</li>
                <li>스포츠</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="field-holder">
          <span class="label">오프라인 광고</span>
          <div class="field-area">
            <div class="field-list main-field-list">
              <span class="sub-label">전문분야</span>
              <ul>
                <li>검색광고</li>
                <li>배너광고</li>
                <li>검색광고</li>
                <li>배너광고</li>
                <li>검색광고</li>
              </ul>
            </div>
            <div class="field-list sub-field-list">
              <span class="sub-label">주요업종</span>
              <ul>
                <li>교육</li>
                <li>문화</li>
                <li>스포츠</li>
                <li>예술 / 디자인</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StoreAvatar from '../../../components/common/StoreAvatar'
import RatingStar from '@/components/common/RatingStar'
import ProductCardWrap from '@/components/product/ProductCardWrap'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'BrandViewPage',
  components: { StoreAvatar, RatingStar, ProductCardWrap, ClButton },
  data () {
    return {
      itemList: []
    }
  },
  mounted () {
    this.getProductList()
  },
  methods: {
    async getProductList () {
      this.itemList = (await this.$api.get('/products')).slice(0, 4)
    },
    portfolioModalOpen () {

    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[brand-view-page]{ .pt(61); .pb(175);
  .white-box{ .m(32,0); .p(40); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .sub-tit{ .mb(35); .fs(26,31); .c(@title-black); .medium; }
    .more-btn{ .mt(40); .tc;
      [cl-button]{ .max-w(340); .wh(100%, 66); .mh-c;
        >button { .wh(100%,66); .fs(20); .c(#999);
          span{ .ib; .vam; .ml(10); }
        }
      }
    }
  }
  .hd-box{ .clear; .mb(32); .p(48,40); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .profile{ .rel; .fl; .w(50%); .p(2, 0);
      [store-avatar] { .abs; .lt(0, 0); .z(1); .wh(110); }
      .info { .p(10,0); .pl(134);
        .name { .rel; .block;
          >h4{ .ib; .vam; .fs(30, 36); .c(@title-black); .medium; }
          >button{ .ib; .vam; .h(31); .ml(16); .p(0,12); .fs(16); .c(#888); .bgc(#f1f1f1); .br(5); }
        }
        .rating-info { .mt(23);
          [rating-star] { .ib; .vam; .mb(0); .ml(-2); .vam; cursor: default;
            .score { .hide; }
            .rating-star-holder { .vam;
              > div { .m(0, 1); .p(0, 1); cursor: default; }
            }
          }
          .score{ .ib; .vam; .ml(10); .mr(12); .fs(24,24); .c(@gray); .medium; }
          >span{ .ib; .vam; .fs(18,24); .c(#aaa); }
        }
      }
    }
    .store-info{ .crop;
      >li{ .fl; width:calc(100% / 3); .h(96); .m(7,0); .p(16,0); .tc; .-l(#ebebeb);
        >b{ .block; .fs(30,36); .c(@title-black); .ls(-0.6); }
        >span { .block; .mt(7); .fs(18,21); .c(#999); }
      }
    }
  }

  .introduce-box{ .m(32,0); .p(40,40); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .intro { .mb(29); .fs(18,28); .c(@gray); }
  }

  .service-box{ .p(40); }

  .portfolio-box{ .p(40);
    .portfolio-list-holder{ .flex; flex-wrap:wrap; justify-content: space-between;
      .small-portfolio-thumb { .wh(260,229); .mb(32); .pointer; }
    }
  }

  .career-box{
    .career-list{
      >li{ .mb(23);
        .date{ .ib; .vam; .w(216); .fs(18, 21); .c(#aaa); }
        .position{ .ib; .vam;
          >span{ .fs(18, 21); .c(@gray);
            >b{ .mr(6); }
            &:first-child{
              &::after{ .cnt; .ib; .vam; .wh(1,18); .m(0,13); .bgc(#d9d9d9); }
            }
          }
        }
      }
    }
  }

  .specialty-box{
    .field-holder{ .crop; .mb(49);
      .label{ .fl; .w(136); .fs(20,24); .c(@title-black); .medium; }
      .field-area{ .fl;
        .field-list{ .crop;
          .sub-label{ .fl; .w(90); .fs(18,30); .c(@gray); }
          >ul{ .fl;
            >li { .fl; .mr(8); .p(0,13); .fs(16,30); .c(#999); .-a(#aaa); .br(5); }
          }
          &.main-field-list{ .mb(20);
            >ul > li{ .c(@purple); .-a(@purple); }
          }
        }
      }
    }
  }
}
</style>
