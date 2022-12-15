<template>
  <div>
    <nav-bar class="nav-bar">
        <div slot="center">我的档案</div>
    </nav-bar>
    <user-info/>
    <list-view/>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";

export default {
  name: "Profile",
  components:{
    NavBar,
    UserInfo,
    ListView,
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
