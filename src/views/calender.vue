<template>
<div id="calender">
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