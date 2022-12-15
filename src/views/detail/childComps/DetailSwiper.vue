<template>
  <swiper class="detail-swiper" ref="detailSwiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="" @load="imageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      loadImgCount: 0,
    }
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imageLoad() {
      if (++this.loadImgCount == this.topImages.length) {
        this.loadImgCount -= this.topImages.length;
        this.$refs.detailSwiper.handleDom();
        this.$refs.detailSwiper.startTimer();
      }
    }
  },
}
</script>

<style scoped>
.detail-swiper {
  height: 370px;
  overflow: hidden;
}
</style>
