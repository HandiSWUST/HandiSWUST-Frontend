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
import {showDialog} from "vant"

export default {
    name: "PluginFramework",
    components: {LoadingView},
    props: ["src", "title"],
    mounted() {
        this.$refs.iframe.onload = () => {
            this.loading = false;
            if (this.title === "雨云" && this.firstLoad) {
              showDialog({
                message:
                    '建议复制以下链接到浏览器打开\n' +
                    '\nhttps://www.rainyun.com/aiyuyun_',
                confirmButtonColor: "#1989fa",
                confirmButtonText: "OK"
              });
            }
            this.firstLoad = false;
        };
    },
    data() {
        return {
            loading: true,
            show: false,
            firstLoad: true
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
