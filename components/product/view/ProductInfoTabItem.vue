<template>
  <div product-info-tab-item>
    <div v-show="value === 0" class="contents-holder">
      <p class="box">
        수정 1회는 무료입니다.
        의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과 동일하게 취급이 됩니다.
        수정 1회는 무료입니다. 의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과
        동일하게 취급이 됩니다. 수정 1회는 무료입니다.

        의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과 동일하게 취급이 됩니다.
        수정 1회는 무료입니다.
        의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과 동일하게 취급이 됩니다.
        수정 1회는 무료입니다. 의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과
        동일하게 취급이 됩니다.
      </p>
    </div>
    <div v-show="value === 1" class="contents-holder">
      <p class="box">
        수정 1회는 무료입니다.
        의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과 동일하게 취급이 됩니다.
        수정 1회는 무료입니다. 의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과
        동일하게 취급이 됩니다. 수정 1회는 무료입니다.

        의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과 동일하게 취급이 됩니다.
        수정 1회는 무료입니다.
        의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과 동일하게 취급이 됩니다.
        수정 1회는 무료입니다. 의뢰시 요청사항이 아닌 경우에 대하여 수정을 요청할 경우 재작업과
        동일하게 취급이 됩니다.
      </p>
      <div class="price-table-holder">
        <h2 class="sec-tit">
          가격정보
        </h2>
        <table class="price-table">
          <tr>
            <th />
            <th>
              <span>MICRO</span>
              <b>1,000,000 원</b>
            </th>
            <th>
              <span>MICRO</span>
              <b>1,000,000 원</b>
            </th>
            <th>
              <span>MICRO</span>
              <b>1,000,000 원</b>
            </th>
          </tr>
          <tr>
            <td>설명</td>
            <td>
              공동구매 도와드립니다.
            </td>
            <td>
              공동구매 도와드립니다.
            </td>
            <td>
              공동구매 도와드립니다.
            </td>
          </tr>
          <tr>
            <td>A/S 보증기간</td>
            <td>
              30일
            </td>
            <td>
              30일
            </td>
            <td>
              30일
            </td>
          </tr>
          <tr>
            <td>수정횟수</td>
            <td>
              1회
            </td>
            <td>
              1회
            </td>
            <td>
              1회
            </td>
          </tr>
          <tr>
            <td>작업일</td>
            <td>
              30일
            </td>
            <td>
              30일
            </td>
            <td>
              30일
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductInfoTabItem',
  props: {
    value: { type: Number, default: 0 }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-info-tab-item]{
  .contents-holder{ .p(27, 10, 56);
    > .box{ .pb(60); .mb(40); .fs(16, 30); .c(#888); .-b(#d9d9d9, 2); }
    .price-table-holder{ .mt(66);
      table.price-table{ .w(100%); border-collapse: collapse; .-t(#aaa,2); .-b(#aaa,2);
        th{ .h(87); .bgc(#f9f8ff); .vam;
          >span{ .block; .mb(8); .fs(16); .c(#777); .regular; }
          >b{ .block; .fs(18); .c(@title-black); }
        }
        td{ .h(70); .p(0, 20); .vam; .fs(15, 19.5); .c(#888); .tc; .-t(#efefef,2);
          &:first-child{ .c(@gray); .medium; }
        }
      }
    }
  }
}
</style>
