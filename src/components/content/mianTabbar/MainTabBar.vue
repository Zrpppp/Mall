<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="#00a4ff">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home-fill.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="#00a4ff">
      <img slot="item-icon" src="~assets/img/tabbar/all.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/all-fill.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="#00a4ff">
      <img slot="item-icon" src="~assets/img/tabbar/cart-Empty.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/cart-Empty-fill.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#00a4ff">
      <img slot="item-icon" src="~assets/img/tabbar/bussiness-man.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/bussiness-man-fill.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar"
import TabBarItem  from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
