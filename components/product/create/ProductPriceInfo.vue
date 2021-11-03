<template>
  <div product-price-info>
    <div class="price-table-holder">
      <table :class="['price-table', {'package': isPackage}]">
        <tbody>
          <tr>
            <th />
            <th>MICRO</th>
            <th v-if="isPackage">
              MEGA
            </th>
            <th v-if="isPackage">
              STAR
            </th>
          </tr>
          <tr>
            <th>제목</th>
            <td>
              <ValidationProvider v-slot="{errors}" rules="required" name="제목" vid="제목1">
                <TextAreaBox v-model="priceInfo.micro.title" :max="20" placeholder="제목을 입력해주세요." />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
            <td v-if="isPackage">
              <ValidationProvider v-slot="{errors}" rules="required" name="제목" vid="제목2">
                <TextAreaBox v-model="priceInfo.mega.title" :max="20" placeholder="제목을 입력해주세요." />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
            <td v-if="isPackage">
              <ValidationProvider v-slot="{errors}" rules="required" name="제목" vid="제목3">
                <TextAreaBox v-model="priceInfo.star.title" :max="20" placeholder="제목을 입력해주세요." />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <th>상세설명</th>
            <td>
              <ValidationProvider v-slot="{errors}" rules="required" name="설명" vid="설명1">
                <TextAreaBox v-model="priceInfo.micro.description" :max="50" placeholder="설명을 입력해주세요." />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
            <td v-if="isPackage">
              <ValidationProvider v-slot="{errors}" rules="required" name="설명" vid="설명2">
                <TextAreaBox v-model="priceInfo.mega.description" :max="50" placeholder="설명을 입력해주세요." />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
            <td v-if="isPackage">
              <ValidationProvider v-slot="{errors}" rules="required" name="설명" vid="설명3">
                <TextAreaBox v-model="priceInfo.star.description" :max="50" placeholder="설명을 입력해주세요." />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <th>금액(VAT포함)</th>
            <td>
              <div class="inp-box">
                <ValidationProvider v-slot="{errors}" rules="required" name="금액" vid="금액1">
                  <TextInput v-model="priceInfo.micro.price" type="number" placeholder="금액을 입력해주세요." />
                  <span class="won">원</span>
                  <ValidationErrors v-if="errors.length > 0" :errors="errors" />
                </ValidationProvider>
              </div>
            </td>
            <td v-if="isPackage">
              <div class="inp-box">
                <ValidationProvider v-slot="{errors}" rules="required" name="금액" vid="금액2">
                  <TextInput v-model="priceInfo.mega.price" type="number" placeholder="금액을 입력해주세요." />
                  <span class="won">원</span>
                  <ValidationErrors v-if="errors.length > 0" :errors="errors" />
                </ValidationProvider>
              </div>
            </td>
            <td v-if="isPackage">
              <div class="inp-box">
                <ValidationProvider v-slot="{errors}" rules="required" name="금액" vid="금액3">
                  <TextInput v-model="priceInfo.star.price" type="number" placeholder="금액을 입력해주세요." />
                  <span class="won">원</span>
                  <ValidationErrors v-if="errors.length > 0" :errors="errors" />
                </ValidationProvider>
              </div>
            </td>
          </tr>
          <tr>
            <th>작업 기간</th>
            <td>
              <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="작업기간" vid="작업기간1">
                <SelectBox v-model="priceInfo.micro.workDay" :list="workDayList" placeholder="선택해주세요" />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
            <td v-if="isPackage">
              <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="작업기간" vid="작업기간2">
                <SelectBox v-model="priceInfo.mega.workDay" :list="workDayList" placeholder="선택해주세요" />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
            <td v-if="isPackage">
              <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="작업기간" vid="작업기간3">
                <SelectBox v-model="priceInfo.star.workDay" :list="workDayList" placeholder="선택해주세요" />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <th>수정 횟수</th>
            <td>
              <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="수정횟수" vid="수정횟수1">
                <SelectBox v-model="priceInfo.micro.editCnt" :list="editCntList" placeholder="선택해주세요" />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
            <td v-if="isPackage">
              <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="수정횟수" vid="수정횟수2">
                <SelectBox v-model="priceInfo.mega.editCnt" :list="editCntList" placeholder="선택해주세요" />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
            <td v-if="isPackage">
              <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="수정횟수" vid="수정횟수3">
                <SelectBox v-model="priceInfo.star.editCnt" :list="editCntList" placeholder="선택해주세요" />
                <ValidationErrors v-if="errors.length > 0" :errors="errors" />
              </ValidationProvider>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="check-include-box">
      <div class="hd">
        <span>빠른 작업</span>
        <check-box v-model="quickWork" :val="true" />
      </div>
      <div v-if="quickWork" class="body">
        <div class="select-inp-li">
          <em class="name">MICRO</em>
          <div class="select-area">
            <ValidationProvider v-slot="{errors}" rules="required" name="금액" class="select-inp">
              <TextInput v-model="priceInfo.micro.quickWork.addPrice" type="number" :class="['add-price', {'error': errors.length > 0}]" placeholder="최소 1,000" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>

            <span>원 추가시</span>

            <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="작업일수" class="select-inp">
              <SelectBox v-model="priceInfo.micro.quickWork.workDay" :list="workDayList" :class="{'error': errors.length > 0}" placeholder="선택해주세요" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>

            <span>안에 작업</span>
          </div>
        </div>
        <div v-if="isPackage" class="select-inp-li">
          <em class="name">MEGA</em>
          <div class="select-area">
            <ValidationProvider v-slot="{errors}" rules="required" name="금액" class="select-inp">
              <TextInput v-model="priceInfo.mega.quickWork.addPrice" type="number" :class="['add-price', {'error': errors.length > 0}]" placeholder="최소 1,000" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>

            <span>원 추가시</span>

            <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="작업일수" class="select-inp">
              <SelectBox v-model="priceInfo.mega.quickWork.workDay" :list="workDayList" :class="{'error': errors.length > 0}" placeholder="선택해주세요" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>

            <span>안에 작업</span>
          </div>
        </div>
        <div v-if="isPackage" class="select-inp-li">
          <em class="name">STAR</em>
          <div class="select-area">
            <ValidationProvider v-slot="{errors}" rules="required" name="금액" class="select-inp">
              <TextInput v-model="priceInfo.star.quickWork.addPrice" type="number" :class="['add-price', {'error': errors.length > 0}]" placeholder="최소 1,000" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>

            <span>원 추가시</span>

            <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="작업일수" class="select-inp">
              <SelectBox v-model="priceInfo.star.quickWork.workDay" :list="workDayList" :class="{'error': errors.length > 0}" placeholder="선택해주세요" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>

            <span>안에 작업</span>
          </div>
        </div>
      </div>
    </div>
    <div class="check-include-box">
      <div class="hd">
        <span>추가 수정</span>
        <check-box v-model="addEditCnt" :val="true" />
      </div>
      <div v-if="addEditCnt" class="body">
        <div v-for="(addEdit, index) in priceInfo.addEdit" :key="`addEdit${index}`" class="select-inp-li">
          <em class="name" />
          <div class="select-area">
            <ValidationProvider v-slot="{errors}" rules="required" name="금액" class="select-inp">
              <TextInput v-model="addEdit.addPrice" type="number" :class="['add-price', {'error': errors.length > 0}]" placeholder="최소 1,000" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>

            <span>원 추가시</span>

            <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="작업일수" class="select-inp">
              <SelectBox v-model="addEdit.editCnt" :list="editCntList" :class="{'error': errors.length > 0}" placeholder="선택해주세요" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>

            <span>추가</span>
          </div>
        </div>
      </div>
    </div>
    <div class="check-include-box">
      <div class="hd">
        <span>맞춤 옵션</span>
        <check-box v-model="customOption" :val="true" />
      </div>
      <div v-if="customOption" class="body">
        <div v-for="(option, index) in priceInfo.customOption" :key="`custom-option${index}`" class="option-box">
          <div class="inp-box">
            <span class="label">제목</span>
            <ValidationProvider v-slot="{errors}" rules="required" name="맞춤옵션 제목" :vid="`optionTitle${index}`" class="inp">
              <TextInput v-model="option.title" :class="{'error': errors.length > 0}" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
          <div class="inp-box">
            <span class="label">설명</span>
            <ValidationProvider v-slot="{errors}" rules="required" name="맞춤옵션 설명" :vid="`optionDes${index}`" class="inp">
              <TextInput v-model="option.description" :class="{'error': errors.length > 0}" />
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
          <div class="inp-box">
            <span class="label">추가금액</span>
            <ValidationProvider v-slot="{errors}" rules="required" name="맞춤옵션 추가금액" :vid="`optionPrice${index}`" class="inp">
              <TextInput v-model="option.addPrice" type="number" :class="['add-price', {'error': errors.length > 0}]" placeholder="최소 1,000" /><span>원 추가시</span>
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
          <div class="inp-box">
            <span class="label">추가 작업일</span>
            <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="맞춤옵션 추가 작업일" :vid="`optionWorkDay${index}`" class="inp">
              <SelectBox v-model="option.workDay" :list="workDayList" :class="{'error': errors.length > 0}" placeholder="선택해주세요" /><span>추가</span>
              <ValidationErrors :errors="errors" />
            </ValidationProvider>
          </div>
        </div>
      </div>
    </div>
    <div v-if="customOption" class="add-btn">
      <cl-button type="white" @click="addCustomOption">
        <img src="~/assets/imgs/icon/ico-plus.svg" alt="plus">
        <span>맞춤 옵션 추가</span>
      </cl-button>
    </div>
  </div>
</template>

<script>
import TextAreaBox from '@/components/common/input/TextAreaBox'
import TextInput from '@/components/common/input/TextInput'
import SelectBox from '@/components/common/input/SelectBox'
import CheckBox from '@/components/common/input/CheckBox'
import ClButton from '@/components/common/ClButton'

export default {
  name: 'ProductPriceInfo',
  components: { TextAreaBox, TextInput, SelectBox, CheckBox, ClButton },
  props: {
    isPackage: { type: Boolean, default: false },
    priceInfo: {
      type: Object,
      default: () => (
        {
          micro: {
            title: '',
            description: '',
            price: null,
            workDay: null,
            editCnt: null,
            quickWork: {
              addPrice: null,
              workDay: null
            }
          },
          mega: {
            title: '',
            description: '',
            price: null,
            workDay: null,
            editCnt: null,
            quickWork: {
              addPrice: null,
              workDay: null
            }
          },
          star: {
            title: '',
            description: '',
            price: null,
            workDay: null,
            editCnt: null,
            quickWork: {
              addPrice: null,
              workDay: null
            }
          },
          addEdit: [{
            addPrice: null,
            editCnt: null
          },
          {
            addPrice: null,
            editCnt: null
          }],
          customOption: [{
            title: '',
            description: '',
            addPrice: null,
            workDay: null
          }]
        })
    }
  },
  data () {
    return {
      quickWork: false,
      addEditCnt: false,
      customOption: false
    }
  },
  computed: {
    workDayList () { return Array.from({ length: 10 }).map((_, index) => ({ label: `${index + 1}일`, value: index + 1 })) },
    editCntList () { return Array.from({ length: 10 }).map((_, index) => ({ label: `${index}회`, value: index })) }
  },
  methods: {
    addCustomOption () {
      this.priceInfo.customOption.push({
        title: '',
        description: '',
        addPrice: null,
        workDay: null
      })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-price-info]{
  .price-table-holder{ .pt(29); .bgc(#fff); .br(7); box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.08);
    .price-table{ border-collapse: collapse;
      &.package{
        tr{
          td{ .w; }
        }
      }
      tr{
        &:first-child{
          >th{ .w; .p(16,0); .fs(24); .c(@title-black); .semi-bold; .bgc(#fff); }
        }
        th{ .w(203); .pl(28); .fs(22,24); .c(@gray); .regular; .tl; .vam; .bgc(#f8f8ff);
          &:first-child{ .-r(#fff,24); }
        }

        &:nth-child(2), &:nth-child(3){
          th{ .pt(18); .vat; }
        }

        td{ .wh(76%,74); .pr(20); .vam; .-t(#efefef,2);
          .inp-box{
            [text-input]{  .ib; .vam; width:calc(100% - 25px);  .max-w(170); }
            >span{ .ib; .vam; .w(18); .fs(16); .c(@gray); .tc; }
          }
          [select-box]{ .w(100%); .max-w(200);
            .show-value{  .fs(16);
              &.placeholder{ .c(#ccc); .light; }
            }
            .angle{ .t(15);
              svg path { fill:#aaa; }
            }
          }
          [text-area-box]{ .p(16,0);
            textarea { .h(100); .p(10); .fs(16); .-a !important;
              &::placeholder{ .c(#ccc); .light; }
            }
            .char-length{ .fs(14); .c(#ccc); }
          }
          [text-input]{ .p(10); .-a !important;
            >input{ .fs(16);
              &::placeholder{ .c(#ccc); .light; }
            }
          }
        }
      }
    }
  }
  .check-include-box{ .mt(40); .bgc(#fff); .br(7); box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.08);
    .hd{ .crop; .block; .p(21, 28);
        >span{ .fl; .ib; .vam; .fs(20,24); .c(@gray); }
        [check-box] { .fr; }
    }
    .body{ .p(30,28,40); .-t(#efefef,2);
      [text-input]{
        &.add-price{ .ib; .vam; .max-w(185); .mr(12); }
      }
      .select-inp-li{ .crop;
        &:last-child { .mb(0); }
        .name{ .fl; .w(156); .min-h(10); .fs(20,48); .c(@gray); .semi-bold; }
        .select-area{ .fl;
          .select-inp{ .ib; .vam;
            [select-box] { .w(185); .vam; .-a(#d9d9d9); .br(5);
              .show-value{  .fs(16);
                &.placeholder{ .c(#ccc); .light; }
              }
              .angle{ .t(15);
                svg path { fill:#aaa; }
              }
            }
          }
          >span{ .ib; .vat; .ml(12); .fs(18,50); .c(@gray);
            &:nth-of-type(1){ .mr(23); }
          }
        }
      }
      .option-box{ .mt(40); .pt(70); .-t(#efefef);
        &:first-child { .mt(0); .pt(0); .-t; }
      }
      .inp-box{ .crop;
        .label{ .fl; .w(156); .fs(20,48); .c(@gray); }
        .inp { .fl; width:calc(100% - 156px);
          >span{ .fs(18); .c(@gray); }
          [select-box] { .w(185); .mr(12); .vam; .-a(#d9d9d9); .br(5);
            .show-value{  .fs(16);
              &.placeholder{ .c(#ccc); .light; }
            }
            .angle{ .t(15);
              svg path { fill:#aaa; }
            }
          }
          [text-input]{
            >input{ .fs(16);
              &::placeholder{ .c(#ccc); .light; }
            }
          }
        }
      }
    }
  }
  .add-btn{ .mt(40); .tc;
    [cl-button]{ .wh(100%, 66); box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.08);
      >button { .wh(100%,66); .fs(20); .c(@gray);
        span{ .ib; .vam; .ml(10); }
      }
    }
  }
}
</style>
