<template>
  <van-grid-item :text="text" @click="click">
    <template #icon>
      <van-image :src="icon" style="width: var(--van-grid-item-icon-size);"/>
    </template>
  </van-grid-item>
</template>

<script>
export default {
  name: "AppButton",
  props: ["text", "title", "src", "icon", 'placeholder'],
  methods: {
    click() {
      if (!this.placeholder) {
        this.$router.push('/plugin/' + encodeURIComponent(this.src) + '/' + this.title)
      }
    }
  }
}
</script>

<style scoped>

</style>
