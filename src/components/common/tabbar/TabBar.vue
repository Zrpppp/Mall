<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
#tab-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  /*box-shadow: 0 -1px 1px rgba(100, 100, 100, .1);*/
  display: flex;
  background-color: #f2f2f2;

}
</style>
