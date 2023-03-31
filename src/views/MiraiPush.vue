<template>
  <div>
    <van-nav-bar id="bar" title="课程推送" left-text="返回" left-arrow @click-left="goBack"/>
    <div style="margin: 5%">
      <br/>
      <p> 嘛，因为来自麻花疼的神秘力量影响，现在只能先暂停服务了 </p>
      <p> 如果需要手动删除账号信息点击下方按钮删除即可，即使不手动删除，所有的数据也将在三天后清空 </p>
      <br/>
      <van-field v-model="qq" label="QQ" style="border-radius: 6px" placeholder="请输入你的QQ号" />
      <br/>
      <van-button plain color="#1989fa" type="primary" style="border-radius: 6px;width: 100%;margin-top: 2%" @click="delPushData">
        删除
      </van-button>
    </div>
  </div>

</template>

<script>
import {del} from "@/api/pushApi";
import {Dialog, Toast} from "vant";

export default {
  name: "MiraiPush",
  data() {
    return {
      qq: null,
      submit: false
    }
  },
  mounted() {
    let sub = window.localStorage.getItem("submit");
    if (sub != null && sub == "true") {
      this.submit = true;
    }
  },
  methods: {
    goBack: function() {
      this.$router.push("/");
    },
    // 用于删除数据的方法
    delPushData: function () {
      let beforeClose = (action) => {
        if (action == "confirm") {
          del().then((resp) => {
            if (resp.status == 200 && resp.data=="3401 LOGOUT") {
              Toast.fail("请先登录");
            }
            Toast.success("删除成功");
            window.localStorage.removeItem("submit");
            window.localStorage.removeItem("lmd5");
            Dialog.close();
          })
        } else {
          Dialog.close();
        }
      }
      Dialog.confirm({
        message: "删掉了咯？",
        confirmButtonColor: "#1989fa",
        beforeClose,
      });
    },
  }
}
</script>

<style scoped>

</style>