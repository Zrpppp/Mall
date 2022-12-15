<template>
  <div class="user">
    <div class="user-img">
      <img src="~assets/img/profile/avatar.svg" alt="">
      <div class="load-info">
          登录/注册
      </div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span class="text">暂无绑定手机号</span>
      </div>
    </div>
    <div class="more">
      <img src="~assets/img/profile/arrow-right.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo"
}
</script>

<style scoped>
.user {
  display: flex;
  background: var(--color-tint);
  height: 90px;
  /* text-align: center; */
  justify-content: space-evenly;
  align-items: center;
  padding: 0 10px;
  color: #fff;
}
.user-img {
  display: flex;
  align-items: center;
  width: 350px;
}
.user-img img {
  width: 60px;
}
.phone {
  /* text-align: center; */
  display: flex;
  align-items: center;
  margin-left: 25px;
}
.phone img {
  width: 20px;
}
.more img {
  width: 20px;
}
</style>
