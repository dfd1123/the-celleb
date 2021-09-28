<template>
  <div main>
    <div class="bg-con">
      <img src="~/assets/imgs/bg/main-bg.jpg" alt="celleb main background">
    </div>
    <div class="wrapper inner-holder">
      <div class="container">
        <h1 class="main-tit">
          '진짜' 셀럽을 잇다, <em>더셀럽</em>
        </h1>
        <div class="search-con">
          <div class="select-box-con">
            <SelectBox v-wave placeholder="카테고리" />
            <SelectBox v-wave placeholder="예산" />
            <SelectBox v-wave placeholder="채널" />
            <SelectBox v-wave placeholder="목적" />
          </div>
          <button v-wave type="button" class="search-btn">
            <img src="~/assets/imgs/icon/ico-search.svg" alt="search">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectBox from '@/components/common/input/SelectBox'

export default {
  name: 'Main',
  components: { SelectBox }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[main] { .rel;
  .bg-con { .crop; .abs; .lt(0, 0); .z(1); height: calc(100vh - 131px);
    > img { object-fit: cover; .min-w(100%); .min-h(100%); }
    &::after { .cnt; .abs; .lt(0, 0); .z(1); .wh(100%); .o(0.65); background-image: linear-gradient(116deg, #8E2AE4 2%, #0901F3 100%); }
  }

  .wrapper { .rel; .z(2); display: table; height: calc(100vh - 131px);
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
  }
}

</style>
