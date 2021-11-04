<template>
  <div product-description>
    <div class="description-write-box">
      <h2 class="box-tit">
        서비스 설명 작성
      </h2>
      <ValidationProvider v-slot="{errors}" rules="required" name="서비스 설명">
        <TextAreaBox v-model="descriptionInfo.description" :class="{'error': errors.length > 0}" :placeholder="placeholder" />
        <ValidationErrors :errors="errors" />
      </ValidationProvider>
    </div>
    <div class="cancel-refund-term">
      <button @click="cancelRefundTermModal">
        취소 및 환불 규정
      </button>
    </div>
  </div>
</template>

<script>
import TextAreaBox from '@/components/common/input/TextAreaBox'
import CancelRefundTermModal from '@/components/product/modal/CancelRefundTermModal'

export default {
  name: 'ProductDescription',
  components: { TextAreaBox },
  props: {
    descriptionInfo: {
      type: Object,
      default: () => ({ description: '' })
    }
  },
  data () {
    return {
      description: '',
      placeholder: '* 아래 내용을 참고하여 작성 해 주세요.\n' +
        '\n' +
        '1. 서비스 소개\n' +
        '- 제공 가능한 서비스 상세 설명\n' +
        '(포스팅 목적, 포스팅 방식, 포함·불포함 사항, 작업 방식, 진행 절차 등)\n' +
        '- 증빙할 수 있는 수치(조회수, 팔로워, 도달 등)를 [서비스 이미지] 항목에 반드시 넣어주세요.\n' +
        '- 작업 특화, 불가 업종 ( 예: 맛집 전문, 도박 등 사행성 업종 작업불가)\n' +
        '- (선택) 타 서비스와 차별점\n' +
        '- (선택) 구매시 주의사항\n' +
        '- (선택) 자주 묻는 질문에 대한 답변\n' +
        '\n' +
        '2. 전문가 소개\n' +
        ' - 경력, 레퍼런스, 보유 기술, 수상 내역, 자격증,  진행했던 광고주 등\n' +
        ' - 실제 작업했던 결과물을 [서비스 이미지] 항목에 등록 해 주시면 서비스 신뢰도가 높아집니다.\n' +
        '\n' +
        '3. 기재 불가 내용 (아래 내용 기재시 서비스 승인 거절될 수 있습니다)\n' +
        '- 외부연락처 (전화번호, 카카오톡ID, 이메일, 홈페이지 링크, 보유계정이름 등 접속가능한 모든 링크)\n' +
        '- 어뷰징성 서비스(매크로, 프로그램 등을 사용하는 불법 서비스 등)'
    }
  },
  methods: {
    cancelRefundTermModal () {
      this.$modal(CancelRefundTermModal)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-description]{
  .description-write-box{ .p(40); .bgc(#fff); .br(7); box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.08);
    .box-tit{ .mb(30); .fs(26,31); .c(@title-black); .medium; }
    [text-area-box]{  .h(509); }
  }

  .cancel-refund-term{ .m(32, 0); .p(21,28); .bgc(#fff); .br(7); box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.08);
    >button { .rel; .fs(20,24); .c(@gray); .medium;
      &::after{ .cnt; .abs; .lb(0,1); .z(1); .wh(100%, 1); .bgc(@gray); }
    }
  }
}
</style>
