<template>
  <van-overlay :show="show" :z-index="999" style="height: 100%">
    <div id="loading">
      <van-loading color="#1989fa" size="20%"/>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: "LoadingView",
  props: ["show"]
}
</script>

<style scoped>
#loading {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
