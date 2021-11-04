<template>
  <div product-image-info>
    <div class="inp-image-box">
      <span class="label">메인 이미지 등록</span>
      <span class="limit-cnt">{{ mainImageCnt }}/1</span>
      <div class="preview-images main">
        <ValidationProvider rules="selectedImage" name="메인 이미지">
          <ImageUploader v-model="imageInfo.mainImage" />
        </ValidationProvider>
      </div>
    </div>
    <div class="inp-image-box">
      <span class="label">상세 이미지 등록</span>
      <span class="limit-cnt">{{ subImageCnt }}/9</span>
      <div class="preview-images detail">
        <ValidationProvider rules="imageMinLength:1" name="상세 이미지">
          <ImageUploader v-model="imageInfo.subImages" :max="9" />
        </ValidationProvider>
      </div>
    </div>
  </div>
</template>

<script>
import ImageUploader from '@/components/common/input/ImageUploader'

export default {
  name: 'ProductImageInfo',
  components: { ImageUploader },
  props: {
    imageInfo: {
      type: Object,
      default: () => ({
        mainImage: null,
        subImages: []
      })
    }
  },
  computed: {
    mainImageCnt () {
      return this.imageInfo.mainImage ? 1 : 0
    },
    subImageCnt () {
      return this.imageInfo.subImages.length
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[product-image-info]{
  .inp-image-box{ .fl; .w(419); .min-h(479); .p(40); .bgc(#fff); .br(7); box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.08);
    &:last-child { .ml(30); }
    .preview-images{ .mt(38);
      &.main{
        [image-uploader]{
          .image-li{ .wh(339); }
          .add .image-box > img{ .max-w(38); .max-h(40); }
        }
      }
      &.detail{
        [image-uploader] {
          .image-li { .wh(107); .mr(8); .mb(8);
            &:nth-of-type(3n){ .mr(0); }
          }
        }
      }
    }
  }
}
</style>
