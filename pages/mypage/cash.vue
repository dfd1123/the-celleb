<template>
  <div mypage-cash-page>
    <nuxt-child />
    <div v-if="showCaution" class="caution-list">
      <p>
        <img src="~/assets/imgs/icon/ico-caution.svg" alt="caution">
        꼭 확인해주세요!
      </p>
      <div class="list-box">
        <span class="label">충전캐시</span>
        <ul>
          <li><span>01</span>회원이 직접 충전했거나 주문이 취소된 후 예치된 캐시입니다.</li>
          <li><span>02</span>유효기간은 충전일(결제일)로부터 5년이며, 서비스 구매 시 유효기간 만료일이 가까운 순서대로 사용됩니다.</li>
          <li><span>03</span>충전캐시는 전액 환불만 가능합니다.</li>
        </ul>
      </div>
      <div class="list-box">
        <span class="label">적립캐시</span>
        <ul>
          <li><span>01</span>각종 이벤트 참여 등에 따른 리워드로 적립된 캐시입니다.</li>
          <li><span>02</span>프로모션 성격에 따라 유효기간이 다를 수 있으며, 별도의 화면에 고지합니다.</li>
          <li><span>03</span>적립캐시는 서비스 구매 시 유효기간 만료일이 가까운 순서대로 사용됩니다.</li>
          <li><span>04</span>단, 캐시 충전 시 지급된 적립캐시의 경우 충전캐시가 모두 소진된 이후 사용됩니다.</li>
          <li><span>05</span>적립캐시는 비현금성으로 환불되지 않습니다.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MypageCashPage',
  beforeRouteEnter (to, from, next) {
    if (to.name === 'mypage-cash') {
      next('/mypage/cash/history')
    }
    next()
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    showCaution () {
      return this.routeName !== 'mypage-cash-refund'
    }
  },
  mounted () {
    if (this.routeName === 'mypage-cash') {
      this.$router.push('/mypage/cash/history')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[mypage-cash-page]{
  .caution-list{ .mt(80); .p(40); .br(7); .-a(#d7d1ff); .bgc(rgba(247, 246, 255, 0.7));
    p{ .mb(25); .fs(18,24); .c(@gray); .semi-bold; .vam;
      >img { .ib; .mr(10); .vam; }
    }
    .list-box{ .rel; .mt(23); .pl(65);
      .label{ .abs; .lt(0,0); .z(1); .fs(14,26); .c(@gray); .semi-bold; }
      ul{
        li{ .rel; .pl(10); .fs(14,26); .c(@gray);
          >span{ .mr(8); .c(#aaa); }
        }
      }
    }
  }
}
</style>
