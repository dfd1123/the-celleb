<template>
  <div brand-view-page>
    <div class="inner-holder">
      <div class="hd-box">
        <div class="profile">
          <StoreAvatar />
          <div class="info">
            <h4 class="name">
              더셀럽
              <button>프로필 수정</button>
            </h4>
            <div class="rating-info">
              <RatingStar :value="5.0" active-color="#f87676" :star-size="14" readonly />
              <em class="score">5.0</em>
              <span>(300개의 평가)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StoreAvatar from '../../components/common/StoreAvatar'
import RatingStar from '@/components/common/RatingStar'

export default {
  name: 'BrandViewPage',
  components: { StoreAvatar, RatingStar }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[brand-view-page]{
  .hd-box{ .clear; .p(48,40); .bgc(#fff); .br(7); box-shadow: 3px 3px 12px 0 rgba(0, 0, 0, 0.04);
    .profile{ .rel; .fl; .h(53); .p(2, 0);
      [store-avatar] { .abs; .lt(0, 0); .z(1); .wh(110); }
      .info { .pl(134);
        .name { .block; .mb(5); .fs(30, 36); .c(@title-black); .medium; }
        .rating-info {
          [rating-star] { .mb(0); .ml(-2); .vam; cursor: default;
            .score { .hide; }
            .rating-star-holder { .vam;
              > div { .m(0, 1); .p(0, 1); cursor: default; }
            }
          }
        }
      }
    }
  }
}
</style>
