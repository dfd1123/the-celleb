<template>
  <div product-store-box>
    <div class="store-profile">
      <img src="~/assets/imgs/sample/store-profile.jpg" alt="store-profile">
    </div>
    <p class="name">
      업체 이름
    </p>
    <cl-button type="line" class="qna-btn">
      문의 남기기
    </cl-button>
    <p class="introduce">
      안녕하세요. 업체명입니다. 스마트플레이스 최적화 관리 및 효과적인 공동구매 진행해 드립니다. 항상 노력하는 전문가가 되겠습니다.
      감사합니다. (연락처 : 문의 남기기를 클릭해주세요.)
    </p>
  </div>
</template>

<script>
import ClButton from '@/components/common/ClButton'

export default {
  name: 'ProductStoreBox',
  components: { ClButton }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-store-box] { .p(40); .bgc(#FFFFFF); .-a(#D9D9D9); .br(7);
  .store-profile { .wh(96); .mh-c; .br(50%);
    > img { .wh(100%); .vam; object-fit: cover; object-position: center; }
  }
  .name { .mt(19); .mb(31); .fs(24, 29); .c(@title-black); .tc; }
  [cl-button] { .w(100%);
    &.qna-btn {
      > button { .wh(100%, 60); .fs(20); .c(@gray); }
    }
  }
  .introduce { .m(24, 0); .fs(15, 23); .c(#999999); .regular; }
}

</style>
