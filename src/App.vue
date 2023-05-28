<script>
  export default {
      mounted() {
          window.addEventListener("resize", () => {
              if (document.body.clientHeight < (window.screen.height / 5 * 4)) {
                  this.navBarHeight = "0";
                  this.navBarZIndex = "-1";
              } else {
                  this.navBarHeight = "5.5vh"
                  this.navBarZIndex = "999";
              }
          })
      },
      data() {
          return {
              navBarHeight: "5.5vh",
              navBarZIndex: "999"
          }
      }
  }
</script>


<template>
	<div id="app">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path"
                   :style="{ '--van-nav-bar-height': navBarHeight, '--van-nav-bar-z-index': navBarZIndex }"/>
      </transition>
    </router-view>
	</div>
</template>


<style>
#app {
	padding: 0;
	max-width: 100%;
	position: fixed;
  background-color: #f2f2f2;
  height: 100%;
	width: 100%;
	margin: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.35s, transform 0.35s;
}

.slide-enter-from{
  opacity: 0;
  transform: translateX(30%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
