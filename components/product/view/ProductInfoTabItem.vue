<template>
  <div product-info-tab-item>
    <div v-show="value === 0" class="contents-holder">
      <p class="box">
        {{ item.description }}
      </p>
    </div>
    <div v-show="value === 1" class="contents-holder">
      <div class="price-table-holder">
        <h2 class="sec-tit">
          가격정보
        </h2>
        <table class="price-table">
          <tbody>
            <tr>
              <th />
              <th v-for="option in options" :key="`detail-prd-th-${option.id}`">
                <span>{{ option.id }}</span>
                <b>{{ option.commaPrice }} 원</b>
              </th>
            </tr>
            <tr>
              <td>설명</td>
              <td v-for="option in options" :key="`detail-prd-td-${option.id}`">
                {{ option.intro }}
              </td>
            </tr>
            <tr>
              <td>A/S 보증기간</td>
              <td v-for="option in options" :key="`detail-prd-as-${option.id}`">
                {{ option.as_term }}일
              </td>
            </tr>
            <tr>
              <td>수정횟수</td>
              <td v-for="option in options" :key="`detail-prd-edit-${option.id}`">
                {{ option.edit_cnt }}회
              </td>
            </tr>
            <tr>
              <td>작업일</td>
              <td v-for="option in options" :key="`detail-prd-work-${option.id}`">
                {{ option.work_day }}일
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="value === 2" class="contents-holder">
      <p class="box">
        동영상 및 녹취록
        <br><br><br>
        - 문서 양식 : 한글HWP / 워드<br>
        * 타임코드 작성 가능 (반드시 주문시 요청)<br>
        - 10분당 6,000원 (화자 2인 기준)<br>
        * 화자가 1인이 추가될 경우, 기본 10분 6,000원에서 1인당 +2,000원 비용 추가.<br>
        <br><br>
        - 파일 음질이 매우 좋지 않을 경우 작업 불가 혹은 추가 요금 발생이 됩니다.<br>
        - 작업은 의뢰 들어온 순차적으로 작업. * 급건일 경우 추가요금 발생.<br>
        <br><br>
        * 주말 작업 요청시 추가요금 발생<br>
      </p>
    </div>
    <div v-show="value === 3" class="contents-holder">
      <p class="box">
        가. 기본 환불 규정<br>
        1. 작업 진행 전일 경우 전문가와 의뢰인 상호 협의하에 청약 철회 및 환불이 가능합니다.<br>
        2. 작업 진행 후 의뢰인의 단순 변심으로 인한 환불 요청은 제한될 수 있습니다.<br>
        3. 작업이 완료된 이후 또는 자료, 문서 등 서비스가 제공된 이후에는 환불이 불가합니다.<br>
        (소비자 호법 17조 2항의 5조. 용역 또는 「문화산업진흥 기본법」 제2조제5호의 디지털콘텐츠의 제공이 개시된 경우에 해당)
        <br><br>
        나. 전문가 책임 사유<br>
        1. 전문가의 귀책사유로 당초 약정했던 서비스 미이행 혹은 보편적인 관점에서 심각하게 잘못
        이행한 경우 결제 금액 전체 환불이 가능합니다.<br><br>

        다. 의뢰인 책임 사유<br>
        1. 서비스 진행 도중 의뢰인의 귀책사유로 인해 환불을 요청할 경우, 사용 금액을 아래와 같이
        계산 후 총 금액의 10%를 공제하여 환불합니다.<br>
        - 총 작업 진행량의 1/3 경과 전 : 이미 납부한 요금의 2/3해당액<br>
        - 총 작업 진행량의 1/2 경과 전 : 이미 납부한 요금의 1/2해당액<br>
        - 총 작업 진행량의 1/2 경과 후 : 반환하지 않음<br>
        2. 작업 진행 중 의뢰인의 폭언, 욕설 등이 있을 경우 작업은 종료될 수 있으며 환불이 제한될 수 있습니다.<br>
      </p>
    </div>
  </div>
</template>

<script>
import { numberFormat } from '@/utils/numberUtils'

export default {
  name: 'ProductInfoTabItem',
  props: {
    value: { type: Number, default: 0 },
    item: { type: Object, default: () => ({}) }
  },
  computed: {
    options () {
      if (this.item.options) {
        return Object.keys(this.item.options).map(option => ({
          ...this.item.options[option],
          id: option,
          commaPrice: numberFormat(this.item.options[option].price)
        }))
      }
      return []
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-info-tab-item] {
  .contents-holder { .p(27, 10, 56);
    > .box { .pb(60); .mb(40); .fs(16, 30); .c(#888); .-b(#D9D9D9, 2); }
    .price-table-holder { .mt(66);
      table.price-table { .w(100%); border-collapse: collapse; .-t(#AAA, 2); .-b(#AAA, 2);
        th { .h(87); .bgc(#F9F8FF); .vam;
          > span { .block; .mb(8); .fs(16); .c(#777); .regular; text-transform: uppercase; }
          > b { .block; .fs(18); .c(@title-black); }
        }
        td { .h(70); .p(0, 20); .vam; .fs(15, 19.5); .c(#888); .tc; .-t(#EFEFEF, 2);
          &:first-child { .c(@gray); .medium; }
        }
      }
    }
  }
}
</style>
