<template>
  <div>
    <van-nav-bar id="bar" title="课程推送" left-text="返回" left-arrow @click-left="goBack"/>
    <div style="margin: 5%">
      <p>使用此功能代表您同意我们将您的课程及学号、QQ信息存储在我们的数据库中，请放心，这些数据仅用于课程推送</p>
      <p>此功能目前还处于非常早期的阶段，请勿过度依赖此功能，遇到任何问题请及时反馈</p>
      <br/>
      <p>使用说明：</p>
      <p> 1. 添加 1400070301 这个QQ号</p>
      <p> 2. 添加成功后在下方提交你的QQ号</p>
      <p> 3. 提示提交成功后可点击下方的测试按钮测试推送，此后每到上课时间就会提前20分钟提醒</p>
      <br/>
      <van-field v-model="qq" label="QQ" style="border-radius: 6px" placeholder="请输入你的QQ号" />
      <br/>
      <van-button block color="#1989fa" type="primary" style="border-radius: 6px;" @click="submitCourseData">
        提交
      </van-button>
      <van-button plain color="#1989fa" type="primary" style="border-radius: 6px;width: 100%;margin-top: 2%" @click="testPushService" v-if="submit">
        测试
      </van-button>
      <van-button plain color="#1989fa" type="primary" style="border-radius: 6px;width: 100%;margin-top: 2%" @click="delPushData">
        删除
      </van-button>
    </div>
  </div>

</template>

<script>
import {save, test, del} from "@/api/pushApi";
import {Dialog, Toast} from "vant";
import md5 from "blueimp-md5"

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
    // 用于提交课程数据
    submitCourseData: function () {
      let item = localStorage.getItem("raw");
      if (item != null) {
        let lmd5 = md5(item);
        save(item, this.qq).then((resp) => {
          if (resp.status == 200 && resp.data=="3401 LOGOUT") {
            Toast.fail("请先登录");
          }
          if (resp.status == 200 && resp.data == "5200 SUCCESS") {
            Toast.success("提交成功！");
            this.submit = true;
            window.localStorage.setItem("submit", "true");
            window.localStorage.setItem("lmd5", lmd5);
          } else {
            Toast.fail("提交失败...");
          }
        })
      } else {
        Toast.fail("本地没有缓存，提交失败...")
      }
    },
    // 用于测试推送的方法
    testPushService: function () {
      test().then((resp) => {
        if (resp.status == 200 && resp.data == "5200 SUCCESS") {
          Toast.success("测试请求发送成功！");
        } else {
          Toast.fail("测试请求发送失败，可能我们的服务器炸了");
        }
      })
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
    }
  }
}
</script>

<style scoped>

</style>