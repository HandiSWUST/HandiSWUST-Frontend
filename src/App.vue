<script>
</script>


<template>
	<div id="app">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path" style="--van-nav-bar-height: 5.5vh;"/>
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

@media (max-height: 600px) {
    .van-nav-bar__content {
        position: absolute;
        top: -999px;
    }
    .van-nav-bar {
        position: absolute;
        top: -999px;
    }
    #bar {
        position: absolute;
        top: -999px;
    }
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
