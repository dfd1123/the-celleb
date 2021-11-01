<template>
  <div image-uploader>
    <div class="uploader-holder">
      <ul>
        <li
          v-for="(image, index) in images"
          :key="`image-${index}`"
          :class="[
            'image-li',
            { single: max <= 1, add: !image.dataUrl && !image.src },
          ]"
        >
          <button
            v-if="image.dataUrl || image.src"
            class="remove-btn"
            @click="removeImage(index)"
          >
            X
          </button>
          <label class="image-box">
            <template v-if="!image.dataUrl && !image.src">
              <input
                type="file"
                accept="image/jpeg,image/png"
                :multiple="multi && !fix"
                @change="imgUpload(index, $event, multi)"
              >
              <img src="~/assets/imgs/icon/ico-image-plus.svg" alt="add image">
            </template>
            <template v-else>
              <input
                type="file"
                accept="image/jpeg,image/png"
                @change="imgUpload(index, $event)"
              >
              <img
                v-if="image"
                :src="image.dataUrl || image.src"
                alt="preview image"
              >
            </template>
          </label>
        </li>
        <li v-if="!fix && max > images.length" class="image-li add">
          <label class="image-box">
            <input
              type="file"
              accept="image/jpeg,image/png"
              :multiple="multi && !fix"
              @change="imgUpload(images.length, $event, multi)"
            >
            <img src="~/assets/imgs/icon/ico-image-plus.svg" alt="add image">
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { multiImageUpload } from '@/utils/fileUtils'

export default {
  name: 'App',
  props: {
    value: { type: [Array, Object], default: () => null },
    max: { type: Number, default: 1 },
    multi: { type: Boolean, default: false },
    fix: { type: Boolean, default: false }
  },
  data () {
    return {
      images: []
    }
  },
  computed: {
    hasFileImages () {
      return this.fix
        ? this.images.filter(image => image.dataUrl && image.src)
        : this.images
    },
    addLength () {
      const length =
        this.max - this.hasFileImages.length < 0
          ? 0
          : this.max - this.hasFileImages.length
      if (this.fix) {
        return length
      }

      return length > 0 ? 1 : length
    }
  },
  watch: {
    value: 'update'
  },
  mounted () {
    if (!this.max) {
      throw new Error(
        'It is impossible for the max value of props data to be less than 1.'
      )
    }

    this.update()
  },
  methods: {
    async imgUpload (index, e, multi = false) {
      const files = await multiImageUpload(e)

      if (!files.length) { return }

      if (this.images.length > index || this.fix) {
        this.images[index] = files[0]
        this.images = this.images.map(image => image)
      } else {
        if (this.max < this.images.length + files.length) {
          alert(`최대 ${this.max}까지 업로드가 가능합니다.`)
          return
        }
        this.images = [...this.images, ...files]
      }

      const emitData = !Array.isArray(this.value)
        ? files.length > 1
          ? files
          : files[0]
        : this.images

      this.$emit('change', emitData)
      this.$emit('input', emitData)
    },
    removeImage (index) {
      if (this.fix) {
        this.images = this.images.map((image, idx) =>
          index !== idx ? image : {}
        )
      } else {
        this.images = this.images.filter((_, idx) => index !== idx)
      }

      this.$emit('change', this.images)
      this.$emit('input', !Array.isArray(this.value) ? null : this.images)
    },
    update () {
      if (this.fix && this.max > 1) {
        if (!Array.isArray(this.value)) { this.images = Array.from({ length: this.max }).map(() => ({})) } else {
          this.images = Array.from({ length: this.max }).map((_, index) =>
            this.value && this.value[index] ? this.value[index] : {}
          )
        }
      } else if (!Array.isArray(this.value)) { this.images = this.value ? [this.value] : [] } else { this.images = this.value || [] }
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/proj.less';

[image-uploader] {
  .uploader-holder {
    > ul { .clear;
      > li {
        > label {
          > input { .hide; }
        }
      }
    }
  }
  .image-li { .rel; .fl; .wh(100); .mb(10); .mr(10); .bgc(#fff); .-a(#ebebeb);
    &.add { .bgc(rgba(247, 246, 255, 0.8)); }
    &.single { float: none; }
  }
  .remove-btn { .abs; .rt(-10,-10); .z(1); .wh(20); .p(0); .fs(11); .bgc(#fff); .-a(#ddd); .br(50%); .pointer; }
  .image-box { .wh(100%); .pointer;
    > img { .wh(100%); object-fit: cover; object-position: center; }
  }

  .add{
    .image-box { .flex;
      > img { .max-w(17); .max-h(17); .wh(15%); }
    }
  }
}
</style>
