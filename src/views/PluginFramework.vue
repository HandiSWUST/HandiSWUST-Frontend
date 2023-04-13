<template>
  <div>
      <van-popup v-model:show="show" round="true" style="padding: 20px">
          <p>{{"插件名: " + info.name}}</p>
          <p>{{"作者: " + info.author}}</p>
          <p>{{"简介: " + info.description}}</p>
      </van-popup>
      <LoadingView :show="loading"/>
      <van-nav-bar
              :title="title"
              style="box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05), 0 2px 6px 0 rgba(0, 0, 0, 0.05);"
              left-text="首页"
              left-arrow @click-left="this.$router.push('/')"
              right-text="插件信息"
              @click-right="show = true"
      />
      <iframe ref="iframe" :src="url" id="iframe"/>
  </div>
</template>

<script>
import LoadingView from "@/components/LoadingView.vue";
import axios from "axios";

export default {
    name: "PluginFramework",
    components: {LoadingView},
    props: ["src", "title"],
    mounted() {
        this.url = "https://plugin.aliceblog.co/" + this.src + "/index.html";
        axios.get("/plugins/info/" + this.src + "/plugin-info.json").then((resp) => {
            this.info = resp.data;
        })
    },
    updated() {
        this.$refs.iframe.onload = () => {
            this.loading = false;
        }
    },
    data() {
        return {
            url: "",
            loading: true,
            show: false,
            info: {
                name: "",
                author: "",
                description: ""
            }
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