<script setup>
defineProps(["text", "image"])
</script>

<template>
  <van-grid-item>
    <van-image
        :src="image"
        class="img"
    />
    <p class="text">{{ text }}</p>
  </van-grid-item>
</template>

<style scoped>
.img {
  max-width: 35%;
  max-height: 100%;
  margin-bottom: 5%;
}
</style>