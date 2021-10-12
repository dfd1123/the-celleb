<template>
  <modal qna-submit-modal @close="close" @resolve="resolve">
    <template #title>
      문의하기
    </template>
    <div class="store-info">
      <div class="store-profile">
        <img src="~/assets/imgs/sample/store-profile-img.jpg" alt="store image">
      </div>
      <div class="main-info">
        <h6 class="name">
          더셀럽
        </h6>
        <span class="average-response-time">평균응답시간 : 10분 이내</span>
        <p class="description">
          안녕하세요. 스마트플레이스 최적화 관리 및 효과적인 공동구매 진행해 드립니다. 항상 노력하는 전문가가 되겠습니다. 감사합니다.
        </p>
      </div>
    </div>
    <div class="textarea-holder">
      <p class="caution">
        요구사항을 가능한 상세하게 알려주세요 (준비상황, 기한, 예산 등)
      </p>
      <TextAreaBox
        placeholder="- 보다 정확한 진행 및 견적을 위해 기능을 상세하게 작성부탁드립니다. - 문서, 이미지, 기획서 등 참고자료가 있다면 첨부해주세요. (500 mb이하, 최대 3개까지 첨부가능)"
      />
    </div>
    <div class="btn-holder">
      <div v-if="fileName" class="file-data">
        {{ fileName }}
        <button @click="deleteFile">
          <img src="~/assets/imgs/icon/ico-close.svg" alt="delete">
        </button>
      </div>
      <cl-button v-else type="line-purple" class="file-upload-btn" @click="uploadClickHandler">
        파일 첨부
      </cl-button>
      <cl-button type="purple" class="submit-btn" @click="resolve">
        견적문의 작성완료
      </cl-button>
    </div>
    <p class="sub-intro">
      * 5초 마케팅을 통해 결제하면 거래 완료 시까지 에스크로 방식으로 대금을 안전하게
      보호 받을 수 있습니다.
    </p>
    <input v-show="false" ref="fileUploader" type="file" @change="fileUploadHandler">
  </modal>
</template>

<script>
import Modal from '@/components/common/modal/Modal'
import TextAreaBox from '@/components/common/input/TextAreaBox'
import ClButton from '@/components/common/ClButton'
import { fileUpload } from '@/utils/fileUtils'

export default {
  name: 'QnaSubmitModal',
  components: { Modal, TextAreaBox, ClButton },
  data () {
    return {
      fileName: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    resolve () {
      this.$emit('resolve')
      this.$alert({ title: '문의 접수 완료', message: '견적문의 작성완료되었습니다.' })
    },
    async fileUploadHandler (e) {
      const { file } = await fileUpload(e)

      this.fileName = file.name
    },
    uploadClickHandler () {
      this.$refs.fileUploader.click()
    },
    deleteFile () {
      this.fileName = ''
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[qna-submit-modal] {
  .store-info{ .rel;
    .store-profile { .abs; .lt(0,0); .z(1); .wh(77); .br(50%);
      > img { .wh(100%); .vam; object-fit: cover; object-position: center; }
    }
    .main-info { .pl(100); .min-h(77);
      .name{ .mb(10); .fs(20, 24); .c(@title-black); .medium; }
      .average-response-time{ .block; .mt(10); .mb(7); .fs(16,19); .c(@gray); .regular; }
      .description { .mb(27); .fs(15,22); .c(#999); .light; .ellipsis(2);  }
    }
  }
  .textarea-holder{ .mb(34);
    .caution { .mb(15); .fs(16, 19); .c(@gray); }
    [text-area-box] { .h(206); }
  }
  .btn-holder{
    .file-data{ .rel; .p(0,15); .fs(15,60); .c(#555); .-a(#d9d9d9); .br(5);
      > button { .abs; .rt(15,17); .z(1);
        >img{ .vam; }
      }
    }
    [cl-button] { .block; .wh(100%, 60); .m(16,0);
      > button  { .wh(100%); .fs(20); }
      &.file-upload-btn {

      }
    }
  }
  .sub-intro { .fs(15,24); .c(#999); }
}
</style>
