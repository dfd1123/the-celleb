<template>
  <div main>
    <div class="main-container">
      <div class="bg-con">
        <img src="~/assets/imgs/bg/main-bg.jpg" alt="celleb main background">
      </div>
      <div class="wrapper inner-holder">
        <div class="container">
          <h1 v-que="{animation: 'fadeInUp', delay: 200, duration: 900}" class="main-tit">
            '진짜' 셀럽을 잇다, <em>더셀럽</em>
          </h1>
          <div v-que="{animation: 'fadeInUp', delay: 500, duration: 900}" class="search-con">
            <div class="select-box-con">
              <ValidationObserver ref="validator">
                <ValidationProvider rules="required" name="카테고리">
                  <SelectBox v-model="category" v-wave :list="topCategoryList" placeholder="카테고리" />
                </ValidationProvider>
                <ValidationProvider rules="required" name="예산">
                  <SelectBox v-model="priceRange" v-wave :list="priceRangeList" placeholder="예산" />
                </ValidationProvider>
                <ValidationProvider rules="required" name="채널">
                  <SelectBox v-model="channel" v-wave :list="bottomCategoryList" placeholder="채널" />
                </ValidationProvider>
                <ValidationProvider rules="required" name="목적">
                  <SelectBox v-model="purpose" v-wave :list="purposeList" placeholder="목적" />
                </ValidationProvider>
              </ValidationObserver>
            </div>
            <button v-wave type="button" class="search-btn" @click="search">
              <img src="~/assets/imgs/icon/ico-search.svg" alt="search">
            </button>
          </div>
        </div>
        <div class="scroll-down" @click="goDown">
          Scroll Down
        </div>
      </div>
    </div>
    <div id="service-statistics" class="service-statistics inner-holder">
      <h3 v-que="{animation: 'fadeInUp', delay: 100, duration:500}" class="tit">
        더셀럽의 <em>서비스</em>
      </h3>
      <ul class="context">
        <li v-que="{animation: 'fadeSlowInUp', delay: 200, duration:500}" class="item">
          <div class="item-box">
            <span>현재 이용한 고객수</span>
            <em>1,000명</em>
          </div>
        </li>
        <li v-que="{animation: 'fadeSlowInUp', delay: 300, duration:500}" class="item">
          <div class="item-box">
            <span>매출 성장</span>
            <em>80%</em>
          </div>
        </li>
        <li v-que="{animation: 'fadeSlowInUp', delay: 400, duration:500}" class="item">
          <div class="item-box">
            <span>고객만족도</span>
            <em>99%</em>
          </div>
        </li>
      </ul>
    </div>
    <div class="recommend-influencer">
      <h2 v-que="{animation: 'fadeInUp', delay: 0, duration:500}" class="tit">
        실시간 추천 인플루언서
      </h2>
      <div v-que="{animation: 'fadeInUp', delay: 150, duration:500}" class="context inner-holder">
        <SlideProductList />
      </div>
    </div>
    <div class="with-influencer">
      <div class="inner-holder">
        <p v-que="{animation: 'fadeInUp', delay: 0, duration:500}" class="description">
          더셀럽은 <em>1500명의 인플루언서</em>들과 함께 하고 있습니다.
        </p>
        <div class="tags">
          <span v-for="(tag, index) in tagList" :key="`tag-${index}`" v-que="{animation: 'fadeInUp', delay: (index*100) + 20, duration:1000}" :class="{'br': tag === 'br'}">@{{ tag }}</span>
          <div class="shadow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import que from '@/directives/que'
import SelectBox from '@/components/common/input/SelectBox'
import SlideProductList from '@/components/product/SlideProductList'

export default {
  name: 'MainPage',
  components: { SelectBox, SlideProductList },
  directives: { que },
  data () {
    return {
      topCategoryList: [{ label: '건강 기능식품', value: 1 }, { label: '일반식품', value: 2 }, { label: '가전제품', value: 3 }, { label: '화장품', value: 4 }, { label: '쥬얼리', value: 5 }, { label: '패션', value: 6 }, { label: '육아', value: 7 }],
      priceRangeList: [
        { label: '1만원~100만원', value: '10000|1000000' },
        { label: '100만원~300만원', value: '1000000|3000000' },
        { label: '300만원~500만원', value: '3000000|5000000' },
        { label: '500만원~1,000만원', value: '5000000|10000000' },
        { label: '1,000만원 이상', value: '10000000' }
      ],
      bottomCategoryList: [{ label: '인스타그램', value: 'instagram' }, { label: '유튜브', value: 'youtube' }, { label: '네이버 블로그', value: 'blog' }, { label: '네이버 카페', value: 'cafe' }, { label: '틱톡', value: 'tiktok' }, { label: '라이브커머스', value: 'liveCommerce' }],
      purposeList: [
        { label: '공동구매', value: 'groupBuy' },
        { label: '체험단', value: 'experienceGroup' },
        { label: '콘텐츠', value: 'contents' },
        { label: '홍보', value: 'marketing' }
      ],
      category: '',
      priceRange: '',
      channel: '',
      purpose: '',
      tagList: [
        '비글부부', '쏘', '반서진', '수지민', '바이주화', 'br', '위드니노', '성모닛', '고밤비', '젝시', '베이비지원', '쪼이', 'br', '베베로빈', '혜진', '산비아', '모드니마켓', '윤예지', 'br', '비비멜로', '마이숑', '주아민', '예릴리', '곰도리양', '리브인'
      ]
    }
  },
  methods: {
    async search () {
      await this.$validate(this.$refs.validator)
      const [min, max] = this.priceRange.split('|')
      this.$router.push({ path: `/product/${this.channel}/list`, query: { purpose: this.purpose, min, max } })
    },
    goDown (e) {
      const { target } = e
      window.scroll({ top: target.offsetTop + target.clientHeight, left: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[main] { .rel;
  .main-container{ .rel;
    .bg-con { .crop; .abs; .lt(0, 0); .z(1); .wh(100%);
      > img { object-fit: cover; .min-w(100%); .min-h(100%); }
      &::after { .cnt; .abs; .lt(0, 0); .z(1); .wh(100%); .o(0.65); background-image: linear-gradient(116deg, #8E2AE4 2%, #0901F3 100%); }
    }

    .wrapper { .rel; .z(2); display: table; height: calc(100vh - 84px);
      .container { display: table-cell; .vam; .mh-c;
        .main-tit { .mb(51); .fs(44, 53); .c(#FFFFFF); .regular; .tc;
          > em { .extra-bold; }
        }
        .search-con { .rel; .pr(60);
          .select-box-con { .rel; .z(2);
            [select-box] { .rel; .fl; .wh(25%, 64); .p(0, 8); box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.16);
              &:nth-of-type(1){ .z(4); }
              &:nth-of-type(2){ .z(3); }
              &:nth-of-type(3){ .z(2); }
              &:nth-of-type(4){ .z(1); }
              > input { .fs(16); .c(@black);
                &::placeholder{ .fs(16); }
              }
              >.angle{ .rt(18,21); }
            }
          }
          .search-btn { .abs; .rt(4,0); .z(1); .wh(64); .lh(70); .br(5); .bgc(#fff);
            > img { .ml(6); }
          }
        }
      }
      .scroll-down{ .pointer; .abs; .lb(0, 32); .r(0); z-index: 1; .w(100); .mh-c;  .fs(12, 16); .c(#fff); .tc; animation: wr-bounce 1.5s infinite;
        &::after{ .cnt; .wh(24,12); .mh-c; .mt(8); .contain('~assets/imgs/icon/Scrolldown.svg'); background-size: auto 12px; .bg-c; }
      }
    }
  }

  .service-statistics{ .pt(139); .pb(144);
    .tit{ .mb(72); .fs(44,53); .c(@title-black); .regular; .tc;
      >em{ .semi-bold; }
    }
    .context{ .mt(72); .tc;
      .item{ .ib; .w(308);
        .item-box{ .flex-center; flex-direction:column; .wh(260); .mh-c; .-a(#8c55ff); .br(50%);
          >span{ .block; .fs(20,24); .c(@title-black); }
          >em{ .block; .mt(5); .fs(42, 51); .c(#5d12fa); .semi-bold; }
        }
      }
    }
  }

  .recommend-influencer{ .pt(111); .pb(150); .bgc(#f7f7f7);
    .tit{ .fs(44,53); .c(@title-black); .semi-bold; .tc; }
    .context{
      [slide-product-list]{ .pt(42); .pb(0);
        .subject{ .hide; }
      }
    }
  }

  .with-influencer{ .pt(126); .pb(166); .bgc(#7534fd);
    .description{ .mb(57); .fs(36,43); .c(#fff); .tc;
      >em{ .semi-bold; }
    }

    .tags{ .crop; .rel; .tc;
      >span{ .ib; .m(0, 6.5, 22); .p(0,23); .fs(22,48); .c(#5d12fa); .semi-bold; .tc; .br(24); .bgc(#fff);
        &.br{ .h(0); .mb(0); visibility: hidden !important; .block; }
      }
      .shadow { .abs; .lb(0,0); .z(1); .wh(100%,179); background-image: linear-gradient(to bottom, rgba(117, 52, 253, 0.01), rgba(117, 52, 253, 0.77) 71%, #7534fd); }
    }
  }

  @keyframes wr-bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }
}

</style>
