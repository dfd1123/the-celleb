<template>
  <modal portfolio-modal close-btn @close="close">
    <div class="portfolio-info-holder">
      <div class="images">
        <swiper>
          <swiper-slide>
            <div class="pf-img">
              <img :src="portfolio.main_image" alt="awd">
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="info">
        <h2 class="name">
          {{ portfolio.title }}
        </h2>
        <p class="description" v-html="portfolio.description.replace(/\n/gi, '<br>')" />
        <cl-button type="purple" class="qna-btn" @click="qnaSubmitModalOpen">
          문의하기
        </cl-button>
        <div class="relation-service">
          <span class="subject">관련서비스</span>
          <div class="service">
            <router-link to="/product/instagram/5">
              <div class="image">
                <img src="/images/product5.jpg" alt="product">
              </div>
              <div class="prd-info">
                <p>검색광고 관리해 드립니다.</p>
                <span>네이버 검색광고</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Modal from '@/components/common/modal/Modal'
import ClButton from '@/components/common/ClButton'
import QnaSubmitModal from '@/components/product/modal/QnaSubmitModal'

export default {
  name: 'PortfolioModal',
  components: { Modal, Swiper, SwiperSlide, ClButton },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      store: null
    }
  },
  computed: {
    influencerId () {
      return this.$route.params.id
    },
    portfolio () {
      return this.options?.portfolio || {}
    }
  },
  mounted () {
    this.getStoreInfo()
  },
  methods: {
    async getStoreInfo () {
      this.store = await this.$api.get(`/users/${this.influencerId}`)
    },
    qnaSubmitModalOpen () {
      this.$modal(QnaSubmitModal, { store: this.store })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[portfolio-modal]{
  &[modal]{
    .panel{ .max-w(847);
      .contents{ .p(40); }
      .header{ .mb(0); }
      .body{
        .portfolio-info-holder{ .crop; .flex-center;
          .images{ .fl; .mt(34);
            .pf-img{  .wh(439);
              >img{ .wh(100%); object-fit: cover; object-position: center; }
            }
          }
          .info{ .fl; width:calc(100% - 439px); .mt(34); .pl(32);
            .name{ .mb(19); .fs(30,36); .c(@title-black); .medium; }
            .description{ .mt(19); .mb(39); .h(84); .fs(18,28); .c(@gray); .ellipsis(3); }
            .qna-btn{
              &[cl-button]{ .w(100%);
                >button{ .wh(100%,60); .fs(20); }
              }
            }
            .relation-service{ .mt(45);
              .subject{ .block; .mb(9); .fs(16,19); .c(@title-black); }
              .service{ .crop;
                .image{ .fl; .wh(94);
                  >img{ .wh(100%); object-fit: cover; object-position: center; }
                }
                .prd-info{ .fl; width: calc(100% - 94px); .p(25,0); .pl(20);
                  >p{ .mb(5); .fs(15,19); .c(@gray); }
                  >span{ .block; .fs(13,16); .c(@strong-purple); }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
