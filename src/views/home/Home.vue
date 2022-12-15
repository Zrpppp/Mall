<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommend="recommend"/>
      <feature-view></feature-view>
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top><!-- @click.native 监听原生的修饰符，可用于监听组件 -->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView"

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll";


import {getHomeMultiData, getHomeGoods} from "network/home";
import {debounce} from "@/common/utils";
import {itemListenerMixin,backTopMixin} from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    saveY: 0,
    // ItemImgListener:null,
  },
  mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      tabOffsetTop: 619,
      isTabFixed: false,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated () {
    // 进入时滚动到离开时的位置this.saveY
    // this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh() // 进入时再刷新，避免出现小问题
  },
  deactivated () {
    // 保存离开时的位置信息到this.saveY
    // this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
    // 2.取消全局事件监听（主页图片加载的监听）因为此时设置了keep-alive，所以离开时调用的是deactivated()
    this.$bus.$off('itemImageLoad',this.ItemImgListener)
  },
  created() {
    //请求多个数据
    this.getHomeMultiData()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //监听item中图片加载完成

    // this.$bus.$on('itemImageLoad', () => {
    //   console.log(this.$refs.scroll.refresh());
    // })

    // const refresh = debounce(this.$refs.scroll.refresh, 100)
    // this.ItemImgListener = () => {refresh();}
    // this.$bus.$on('itemImageLoad', this.ItemImgListener)
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //判断backtop是否显示
      this.listenShowBackTop(position)

      //决定tabcontrol是否吸顶（position：fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh();
      // console.log('加载更多的方法')
    },
    swiperImageLoad() {
      //获取tabControl的offsetTop
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // console.log(res)
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  /*height: 300px;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/
</style>
