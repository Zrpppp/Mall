<template>
  <div class="wrapper">
    <nav-bar class="nav-bar">
      <template #center>商品分类</template>
    </nav-bar>
    <div class="content">
      <category-menu :categories='categories' @selectItem='selectItem'/>
      <scroll class="tab-content"
              ref="scroll"
              :data='[categoryData]'
              :probe-type='3'
              @scroll="scroll">
        <div>
          <menu-detail :subcategories='showSubcategory' @imageLoad="imageLoad"/>
          <tab-control :title="['综合','新品','销量']" @tabClick='tabClick' class="tabContent"/>
          <content-detail :content-detail='showContentDetail' @imageLoad="imageLoad"/>
        </div>
      </scroll>
    </div>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CategoryMenu from "./childComps/CategoryMenu";
import MenuDetail from "./childComps/MenuDetail";
import ContentDetail from './childComps/ContentDetail'
import TabControl from "components/content/tabControl/TabControl";
// import BSsrcoll from 'better-scroll';
import Scroll from "components/common/scroll/Scroll";


import {backTopMixin} from "common/mixin";
import {getCategory, getsubcategory, getContentDetail} from "network/category"

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    CategoryMenu,
    MenuDetail,
    ContentDetail,
    TabControl
  },
  data() {
    return {
      categories: [],
      categoryData: [],
      currentIndex: -1,
      currentType: 'pop'
    }
  },
  mixins: [backTopMixin],
  created() {
    this._getCategory()
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showContentDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  // mounted() {
  //   this.scroll = new BSsrcoll(".wrapper", {
  //     /*0和1都是不侦测实时位置，2手指滚动的过程中侦测，手指离开后不侦测，3只要滚动都侦测*/
  //     probeType: 3,
  //     pullUpLoad: true,
  //     // click:ture,
  //   })
  //
  //   // this.scroll.on('scroll', (position) => {
  //   //   console.log(position);
  //   // })
  //   // this.scroll.on('pullingUp', () => {
  //   //   console.log('上拉加载更多');
  //   // })
  // },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // console.log(res);
        //1.获取分类数据
        this.categories = res.data.category.list

        //初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        //主数据请求到之后才能接着请求后面的子数据
        this._getsubcategory(0)
      })
    },
    _getsubcategory(index) {
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey
      getsubcategory(mailKey).then(res => {
        console.log(res);
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getContentDetail('pop')
        this._getContentDetail('new')
        this._getContentDetail('sell')
        // console.log(this.categoryData);
      })
    },
    _getContentDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getContentDetail(miniWallkey, type).then(res => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    selectItem(index) {
      this._getsubcategory(index)
    },
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
    },
    scroll(position) {
      const positionY = -position.y
      // console.log(positionY);
      this.isShow = positionY > 1000
    },
    imageLoad(){
      this.$refs.scroll.refresh();
    }
  },

}
</script>

<style scoped>
.wrapper {
  /* background: chartreuse; */
  height: 100vh;
}

.nav-bar {
  background: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  /*top: 44px;*/
  /*bottom: 49px;*/
  display: flex;

}

.tab-content {
  height: 100%;
  flex: 1;
  position: absolute;
  left: 100px;
}

.tabContent {
  width: 100%;
  /*z-index:10;*/
}
</style>
