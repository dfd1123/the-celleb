<template>
  <div brand-view-page>
    <div class="inner-holder">
      <div class="white-box">
        <div class="profile">
          <StoreAvatar />
          <div class="info">
            <h4>
              더셀럽
              <button>프로필 수정</button>
            </h4>
            <div>
              <RatingStar readonly />
              <span class="rating-score">5.0</span>
              <span class="review-cnt">(300개의 평가)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandViewPage'
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

</style>
