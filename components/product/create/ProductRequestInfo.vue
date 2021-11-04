<template>
  <div product-request-info>
    <div v-for="(requestInfo, index) in requestInfoList" :key="`requestInfo-${index}`" class="white-box request-box">
      <div class="tit">
        <h2>{{ `${index + 1}. ` }}작업 전 요청 사항</h2>
        <span>(선택)</span>
        <button class="remove-btn" @click="removeList(index)">
          <img src="~/assets/imgs/icon/ico-close.svg" alt="remove">
        </button>
      </div>
      <div class="request-inp-area">
        <div class="inp-box">
          <div class="left">
            <i>Q.</i>
            <TextInput v-model="requestInfo.question" placeholder="의뢰인에게 요청할 질문을 입력해주세요" />
          </div>
          <div class="right">
            <CheckBox v-model="requestInfo.required" label="필수 입력 항목" />
          </div>
        </div>
        <div class="inp-box">
          <div class="left">
            <i>A.</i>
            <TextInput placeholder="답변 유형을 선택해주세요" readonly disabled />
          </div>
          <div class="right">
            <SelectBox v-model="requestInfo.answerType" :list="['서술형', '파일첨부']" placeholder="선택해주세요" />
          </div>
        </div>
      </div>
    </div>
    <div class="white-box add-btn-box">
      <div v-if="!requestInfoList.length" class="tit">
        <h2>작업 전 요청 사항</h2>
      </div>
      <button v-wave class="add-btn" @click="addRequest">
        <img src="~/assets/imgs/icon/ico-plus-black.svg" alt="plus-black">
        요청사항 추가
      </button>
      <p class="caution">
        * 작업 시작 전 의뢰인으로부터 전달받아야 하는 정보 및 파일들을 미리 작성해두면 빠른 거래가 가능합니다.
      </p>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/common/input/TextInput'
import CheckBox from '@/components/common/input/CheckBox'
import SelectBox from '@/components/common/input/SelectBox'

export default {
  name: 'ProductRequestInfo',
  components: { TextInput, CheckBox, SelectBox },
  props: {
    requestInfoList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addRequest () {
      this.requestInfoList.push({
        question: '',
        answerType: '',
        required: false
      })
    },
    removeList (index) {
      this.requestInfoList.splice(index, 1)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-request-info]{
  .white-box{ .mb(32); .p(40); .bgc(#fff); .br(7); box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.08);
    .tit{ .rel; .mb(31);
      h2{  .ib; .fs(22,27); .c(@title-black); .medium; }
      span { .ib; .ml(7); .fs(20,24); .c(#aaa); }
      .remove-btn{ .abs; .rt(10,5); .z(1);
        >img{ .vam; }
      }
    }
    &.add-btn-box{
      .add-btn{ .w(100%); .p(27.5, 20); .fs(20); .c(@gray); .tl; .-a(#d9d9d9); .br(5);
        >img{ .vam; .mr(10); }
      }
      .caution{ .mt(17); .fs(16,19); .c(#aaa); }
    }
    &.request-box{
      .request-inp-area{
        .inp-box{ .crop;
          &:first-child{ .mb(16); }
          .left{ .rel; .fl; width:calc(100% - 205px); .pr(12);
            >i{ .abs; .lt(0,0); .z(1); .pl(20); .fs(18,48); .c(@gray); .medium; }
            [text-input]{
              >input{ .p(0,20); .pl(45); }
            }
          }
          .right{ .fl; .w(193);
            [check-box]{ .m(14,0);
              label > span { .fs(16,20); .c(#999); }
            }
            [select-box] { .wh(100%,48); .vam; .-a(#d9d9d9); .br(5);
              .show-value{  .fs(16);
                &.placeholder{ .c(#ccc); .light; }
              }
              .angle{ .t(15);
                svg path { fill:#aaa; }
              }
            }
          }
        }
      }
    }
  }
}
</style>
