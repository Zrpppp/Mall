<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <detail-bottom-bar @addCart="addToCart"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>

</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll"
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from "components/common/toast/Toast";


import {debounce} from 'common/utils.js'
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
import {itemListenerMixin, backTopMixin} from "common/mixin";
import detailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";

import {mapActions} from 'vuex';

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    // Toast,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // ItemImgListener: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShow: false,
      // message: '',
      // show:false,

    }
  },
  created() {
    //???????????????iid
    this.iid = this.$route.params.iid

    //??????iid??????????????????
    getDetail(this.iid).then(res => {
      // console.log(res)
      const data = res.result;

      //1.??????????????????????????????
      this.topImages = data.itemInfo.topImages;

      //2.??????????????????
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3.??????????????????
      this.shop = new Shop(data.shopInfo)

      //4.????????????????????????
      this.detailInfo = data.detailInfo;

      //5.??????????????????
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //6.??????????????????
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      //dom?????????????????????????????????????????????????????????
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //
      //   console.log(this.themeTopYs);
      // })
    })

    //7.??????????????????
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    //???getThemeTopY??????
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 25);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 50);
      this.themeTopYs.push(Number.MAX_VALUE)

      // console.log(this.themeTopYs);
    }, 100)
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 340);
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length

      for (let i = 0; i < length - 1; i++) {
        //????????????
        // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
        //   || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i]
          && positionY <= this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //????????????????????????
      this.listenShowBackTop(position)
    },
    addToCart() {
      //???????????????????????????????????????
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //??????????????????????????????
      this.addCart(product).then(res =>{
        // this.show = true;
        // this.message = res;
        //
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '';
        // },1500)

        this.$toast.show(res,2000)
      })

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.ItemImgListener)
    },
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
