<script setup>

</script>

<template>
  <van-grid class="row miku-theme" :column-num="2" :border="false" :clickable="true">
    <slot/>
  </van-grid>
</template>

<style scoped>
.row {
  left: 5%;
  padding: 1%;
  max-width: 90%;
  margin-bottom: 5%;
  border-radius: 15px;
  //background-color: white;
  //-webkit-backdrop-filter: blur(5px);
  //backdrop-filter: blur(8px);
  //background: var(--app-grid-background);
}
</style>