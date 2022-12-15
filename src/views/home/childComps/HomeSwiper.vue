<template>
  <swiper ref="homeSwiper">
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="轮播图片" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
  name: "HomeSwiper",
  props:{
    banner:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return{
      isLoaded:false,
      loadImgCount:0,
    }
  },
  components:{
    Swiper,
    SwiperItem,
  },
  methods:{
    imageLoad(){
      if(!this.isLoaded){
        this.$emit('swiperImageLoad')
        this.isLoaded = true
      }
      if(++this.loadImgCount == this.banner.length) {
        this.loadImgCount -= this.banner.length;
        this.$refs.homeSwiper.handleDom();
        this.$refs.homeSwiper.startTimer();
      }

    }
  }
}
</script>

<style scoped>

</style>
