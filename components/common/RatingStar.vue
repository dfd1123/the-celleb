<template>
  <div rating-star :class="{readonly,disabled}" @mouseleave="resetSubRating">
    <em class="score">{{ rating.toFixed(1) }}</em>
    <div class="rating-star-holder">
      <div
        v-for="n in maxScore"
        :key="'star-rating' + String(n)"
        :class="{'active': activeRating >= n - 1}"
        :style="`width:${starSize}px; height:${starSize}px;`"
        @click="changeRating(n, $event)"
        @mouseover="hoverStar(n, $event)"
        @mousemove="hoverStar(n, $event)"
      >
        <div v-if="!activeColor" ref="starHolder" class="star-holder" :style="`background-image:url(${inactiveIcon});`">
          <span
            class="active-star"
            :style="`width:${activeRating >= n ? 100 : starRemainWidthRatio}%;`"
          >
            <img
              :src="activeIcon"
              class="active-star"
              :style="`width:${starSize}px; height:${starSize}px;`"
              alt="active"
            >
          </span>
        </div>
        <div v-else ref="starHolder" class="star-holder">
          <svg
            id="color"
            :style="`width:${starSize}px; height:${starSize}px;`"
            enable-background="new 0 0 24 24"
            height="512"
            viewBox="0 0 24 24"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36 5.494-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z"
              :fill="inactiveColor"
            />
          </svg>
          <span
            class="active-star"
            :style="`width:${activeRating >= n ? 100 : starRemainWidthRatio}%;`"
          >
            <svg
              id="color"
              :style="`width:${starSize}px; height:${starSize}px;`"
              enable-background="new 0 0 24 24"
              height="512"
              viewBox="0 0 24 24"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36 5.494-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z"
              :fill="activeColor"
            /></svg>
          </span>
        </div>
      </div>
      <input
        v-model="rating"
        type="range"
        :step="step || 1"
        :min="0"
        :max="maxScore"
        class="range"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'RatingStar',
  props: {
    value: { type: Number, default: 1 }, // 별 점수
    maxScore: { type: Number, default: 5 }, // 최고 점수 (5이면 별 5개가 최고)
    step: { type: Number, default: 0 }, // 몇점 단위로 분할 할 것인지를 정하는 prop
    activeIcon: { type: String, default: '/img/icon/icon-star-active.svg' },
    inactiveIcon: { type: String, default: '/img/icon/icon-star-inactive.svg' },
    activeColor: { type: String, default: '' }, // 별 활성화시 내부 색 (색이 있을 경우 이미지가 아닌 색으로 표출 됩니다.)
    inactiveColor: { type: String, default: '#FFF' }, // 별 비활성화시 내부 색 (색이 있을 경우 이미지가 아닌 색으로 표출 됩니다.)
    starSize: { type: Number, default: 20 }, // 별 사이즈
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      clickValue: 1,
      rating: 1,
      subRating: 0,
      starWith: 100,
      subStarWidth: 100
    }
  },
  computed: {
    activeRating () {
      if (this.subRating > this.rating) { return this.subRating } else { return this.rating }
    },
    starRemainWidthRatio () {
      if (this.subRating > this.rating) { return this.subStarWidth } else { return this.starWith }
    }
  },
  watch: {
    value: 'update',
    rating () {
      this.rating = Number(this.rating)
      this.starWith = Math.round((this.rating % 1) * 100)
    },
    subRating () {
      this.subRating = Number(this.subRating)
      this.subStarWidth = Math.round((this.subRating % 1) * 100)
    }
  },
  mounted () {
    this.update()
  },
  methods: {
    hoverStar (n, e) {
      if (this.readonly) { return }

      const { rating } = this.calculation(n, e)

      this.subRating = rating
    },
    resetSubRating () {
      this.subRating = 0
    },
    update () {
      this.rating = this.value
    },
    changeRating (n, e) {
      if (this.readonly) { return }

      this.clickValue = n

      const { rating } = this.calculation(n, e)

      this.rating = rating

      this.$emit('input', this.rating)
    },
    calculation (n, e) {
      let val = n - 1 + this.step
      const targetWitdh = e.target.clientWidth || this.$refs.starHolder[0].clientWidth
      const clickPointRatio = (e.layerX / targetWitdh)

      while (val < n - 1 + clickPointRatio) {
        val += this.step || 1
      }

      const rating = Number((val).toFixed(1))

      return { rating }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[rating-star] { .pointer;
  * {user-select: none;}
  .rating-star-holder { .rel; .ib;
    &.readonly, &.disabled { .o(0.5); cursor: not-allowed;
      > div { cursor: not-allowed; }
    }
    > .score { .vam; }
    > div { .rel; .ib; .m(0, 2); .p(0,3); .vam; .pointer; box-sizing: content-box;
      .star-holder { .rel; .wh(100%); .bg-c; .cover; .no-repeat;
        .active-star { .crop; .abs; .lt(0, 0); .z(1); .wh(100%); .o(0); transition: opacity 0s, width 0s;
          svg {}
        }
      }
      &.active {
        .star-holder {
          .active-star { .o(1); transition: opacity 0.15s, width 0.1s; }
        }
      }
    }
  }
  .range{ .abs; .lt(0,0); .z(1); .wh(100%); .o(0); .pointer; }

  @media (min-width: 1024px){
    .range{ .hide; }
  }
}
</style>
