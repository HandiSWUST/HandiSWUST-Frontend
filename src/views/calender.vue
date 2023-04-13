<template>
  <div id="calender">
      <van-nav-bar title="校历"
                   style="box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05), 0 2px 6px 0 rgba(0, 0, 0, 0.05);"
                   left-text="首页"
                   left-arrow @click-left="this.$router.push('/');"/>
    <van-image
        src="/calender1.jpg"
        class="img"
    />
    <van-image
        src="/calender2.jpg"
        class="img"
    />
    <van-image
        src="/calender3.jpg"
        class="img"
    />
  </div>
</template>

<script>
export default {
  name: "calender"
}
</script>

<style scoped>
	#calender {
		height: 100%;
		width: 100%;
		overflow-y: auto;
		overflow-x: auto;
	}
</style>