<template>
  <div influencer-sector-info>
    <div class="inp-box">
      <p class="label">
        전문 분야
      </p>
      <div class="inp">
        <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="전문 분야">
          <radio-box v-model="form.specialtySector" label="온라인 광고" val="온라인 광고" button />
          <radio-box v-model="form.specialtySector" label="오프라인 광고" val="오프라인 광고" button />
          <ValidationErrors :errors="errors" />
        </ValidationProvider>
      </div>
    </div>
    <div v-if="form.specialtySector" class="inp-box">
      <p class="label">
        상세 분야
        <span>(복수선택 가능)</span>
      </p>
      <div class="inp">
        <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="상세 분야">
          <check-box v-model="form.detailSector" label="검색 광고" val="검색 광고" button />
          <check-box v-model="form.detailSector" label="배너 광고" val="배너 광고" button />
          <check-box v-model="form.detailSector" label="홈페이지 광고" val="홈페이지 광고" button />
          <check-box v-model="form.detailSector" label="디스플레이 광고" val="디스플레이 광고" button />
          <ValidationErrors :errors="errors" />
        </ValidationProvider>
      </div>
    </div>
    <div v-if="form.detailSector.length > 0" class="inp-box">
      <p class="label">
        주요 업종
        <span>(복수선택 가능)</span>
      </p>
      <div class="inp">
        <ValidationProvider v-slot="{errors}" rules="requiredSelect" name="주요 업종">
          <check-box v-model="form.services" label="교육" val="교육" button />
          <check-box v-model="form.services" label="문화" val="문화" button />
          <check-box v-model="form.services" label="스포츠" val="스포츠" button />
          <check-box v-model="form.services" label="예술 / 문화" val="예술 / 문화" button />
          <ValidationErrors :errors="errors" />
        </ValidationProvider>
      </div>
    </div>
    <div v-if="form.specialtySector" class="field-holder">
      <span class="label">{{ form.specialtySector }}</span>
      <div class="field-area">
        <div class="field-list main-field-list">
          <span class="sub-label">전문분야</span>
          <ul>
            <li v-for="sector in form.detailSector" :key="sector">
              {{ sector }}
            </li>
          </ul>
        </div>
        <div class="field-list sub-field-list">
          <span class="sub-label">주요업종</span>
          <ul>
            <li v-for="service in form.services" :key="service">
              {{ service }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from '@/components/common/input/CheckBox'
import RadioBox from '@/components/common/input/RadioBox'

export default {
  name: 'InfluencerSectorInfo',
  components: {
    CheckBox,
    RadioBox
  },
  props: {
    form: {
      type: Object,
      default: () => ({
        specialtySector: '',
        detailSector: [],
        services: []
      })
    }
  },
  watch: {
    'form.detailSector' () {
      if (this.form.detailSector.length === 0) {
        this.form.services = []
      }
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[influencer-sector-info] { .min-h(300);
  .inp-box {
    .label { .mb(21); .fs(18, 21); .c(@title-black); .medium;
      > span { .ml(5); .c(#AAAAAA); .regular; }
    }
    .inp {
      [check-box], [radio-box] { .mr(7); }
    }
  }
  .field-holder { .crop; .mb(49); .p(18); .bgc(#F0F0F0); .br(5);
    .label { .fl; .w(120); .fs(15, 29); .c(@title-black); .medium; }
    .field-area { .fl; width: calc(100% - 120px);
      .field-list { .crop;
        .sub-label { .fl; .w(80); .fs(15, 29); .c(@gray); }
        > ul { .fl; width: calc(100% - 80px);
          > li { .fl; .mr(8); .mb(8); .p(0, 13); .fs(13, 27); .c(#999999); .bgc(#FFFFFF); .-a(#AAAAAA); .br(5); }
        }
        &.main-field-list { .mb(20);
          > ul > li { .c(@purple); .-a(@purple); }
        }
      }
    }
  }
}
</style>
