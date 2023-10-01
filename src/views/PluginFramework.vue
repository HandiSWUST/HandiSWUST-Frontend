<template>
  <div>
      <LoadingView :show="loading"/>
      <van-nav-bar
              :title="title"
              class="bar"
              left-text="首页"
              left-arrow @click-left="this.$router.push('/')"
      />
      <iframe ref="iframe" :src="src" id="iframe"/>
  </div>
</template>

<script>
import LoadingView from "@/components/LoadingView.vue";

export default {
    name: "PluginFramework",
    components: {LoadingView},
    props: ["src", "title"],
    mounted() {
        this.$refs.iframe.onload = () => {
            this.loading = false;
        }
    },
    data() {
        return {
            loading: true,
            show: false
        }
    }
}
</script>

<style scoped>
  #iframe {
      height: 95vh;
      width: 100vw;
      overflow: scroll;
      border: 0;
  }
</style>