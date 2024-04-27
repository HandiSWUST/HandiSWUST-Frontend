<template>
    <van-divider style="margin: 0; color: #2c2c2c">{{ category }}</van-divider>
    <div class="app-card miku-theme">
        <van-grid square :clickable="true" :border="false">
            <slot/>
        </van-grid>
    </div>
</template>

<script>
export default {
    name: "AppCard",
    props: ["category"]
}
</script>

<style scoped>
.app-card {
  border-radius: 15px;
  //background-color: white;
  padding: 1%;
  margin: 3%
}
</style>