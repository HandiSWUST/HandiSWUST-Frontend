<template>
  <div id="grid1">
<!--  导航栏及公告栏  -->
    <van-row style="margin-bottom: 6%">
      <van-col span="24" style="height: 86px;">
        <van-nav-bar
            title="首页"
            id="bar"
            right-text="关于"
            @click-right="about">
          <template #left>
            <van-badge :dot="update">
              <p @click="downApp" style="color: #1989fa;">下载APP</p>
            </van-badge>
          </template>
        </van-nav-bar>

        <van-notice-bar
            color="#1989fa"
            background="#ecf9ff"
            left-icon="volume-o"
            speed="100"
            text="考试查询功能上线！遇到bug请在右上角“关于页面”联系作者，感激不尽！"
            mode="closeable"
        />
      </van-col>
    </van-row>

<!--  时间、周数、一言  -->
    <van-row style="width: 100%">
      <van-col span="12">
        <div id="clock-container">
          <p id="clock1">北京时间</p>
          <p id="clock2">{{time}}</p>
          <p id="clock3">{{day}}</p>
        </div>
        <div>
          <van-progress :percentage="percent" :pivot-text="week" stroke-width="100%" id="progr" color="#00bcd4"/>
        </div>
      </van-col>

      <van-col span="12">
        <div id="hitokoto">
          <div style="padding-left: 10%; padding-top: 10%; margin-bottom: 5%">
            <van-image
                src="/hitokoto.svg"
                style="width: 15%; float: left"
            />
            <p style="margin-left: 5%; float: left;">一言</p>
          </div>
          <br/>
          <p id="sentence">{{sentence}}</p>
        </div>
      </van-col>
    </van-row>

<!--  按钮面板  -->
    <van-col span="24">
      <div id="row">
        <van-grid :column-num="2" id="g" :border="false" :clickable="true">
          <van-grid-item v-on:click="login" v-if="!isLogin">
            <van-image
                src="/login.svg"
                class="img"
            />
            <p class="text">登录</p>
          </van-grid-item>
          <van-grid-item v-on:click="getLibrary" v-if="isLogin">
            <van-image
                src="/lib.svg"
                class="img"
            />
            <p class="text">图书借阅信息</p>
          </van-grid-item>
          <van-grid-item v-on:click="logout" v-if="isLogin">
            <van-image
                src="/logout.svg"
                class="img"
            />
            <p class="text">退出登录</p>
          </van-grid-item>
        </van-grid>
      </div>
      <div id="row">
        <van-grid :column-num="2" id="g" :border="false" :clickable="true">
          <van-grid-item v-on:click="getCourses">
            <van-image
                src="/table.svg"
                class="img"
            />
            <p class="text">课程表</p>
          </van-grid-item>
          <van-grid-item v-on:click="getExam">
            <van-image
                src="/exam.svg"
                class="img"
            />
            <p class="text">考试</p>
          </van-grid-item>
        </van-grid>
      </div>
      <div id="row">
        <van-grid :column-num="2" id="g" :border="false" :clickable="true">
          <van-grid-item v-on:click="getScore">
            <van-image
                src="/score.svg"
                class="img"
            />
            <p class="text">成绩</p>
          </van-grid-item>
          <van-grid-item v-on:click="calendar">
            <van-image
                src="/date.svg"
                class="img"
            />
            <p class="text">校历</p>
          </van-grid-item>
        </van-grid>
      </div>
    </van-col>

  </div>
</template>

<script>
import {START_TIME} from "/src/common/final.js"
import {TOTAL_WEEK} from "/src/common/final.js"
import {VERSION} from "/src/common/final.js"
import {getExam} from "/src/api/getExam"
import {getCourse} from "/src/api/getCourse";
import {Dialog, Notify, Toast} from "vant"
import {checkLogin} from "../api/loginCheck";
import {logOut} from "../api/logout";
import {hitokoto} from "../api/hitokotoApi";

export default {
  name: "indexPanel",
  mounted() {
    // 获取一言
    this.getSentence();
    // 更新一次时间，之后每10s更新一次时钟组件的数据
    this.date();
    setInterval(this.date, 10000);
    // 更新检查
    this.updateCheck();
    // 登录检查
    this.loginCheck();
    // 0点后提示
    if (new Date().getHours() >= 0 && new Date().getHours() <= 6) {
      Notify({type: 'primary', message: '每晚0:00一站式认证接口维护'});
    }
  },
  data() {
    return {
      // 时间、日期
      time: "0:00",
      day: "24TH 10月",
      // 是否需要更新, 为true表示需要
      update: true,
      // 当前周数
      curWeek: 0,
      // 登录状态
      isLogin: false,
      // 一言
      sentence: "世上本没有路，走的人多了也便成了路",
    }
  },
  computed: {
    // 计算当前周数
    week: function () {
      var cur = Math.ceil((new Date().getTime() - START_TIME) / (1000 * 60 * 60 * 24 * 7));
      this.curWeek = cur;
      return "第" + cur.toString() + "/" + TOTAL_WEEK + "周";
    },
    // 计算进度条百分比
    percent: function () {
      return (this.curWeek / TOTAL_WEEK) * 100;
    }
  },
  methods: {
    // 获取一言
    getSentence: function () {
      hitokoto("", "json").then((resp) => {
        console.log(resp.data);
        var fromWho = resp.data.from_who;
        if(fromWho == null) {
          fromWho = "";
        }
        this.sentence = resp.data.hitokoto + "\n ——" + resp.data.from + " " + fromWho;
      });
    },
    // 获取日期
    date: function () {
      var date = new Date();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      if(hour < 10) {
        hour = "0" + hour.toString();
      }else {
        hour = hour.toString();
      }
      if(minutes < 10) {
        minutes = "0" + minutes.toString();
      }else {
        minutes = minutes.toString();
      }
      this.time = hour + ":" + minutes;
      this.day = date.getDate().toString() + "TH " +  (date.getMonth() + 1).toString() + "月";
    },
    // 检查更新
    updateCheck: function () {
      var ver = window.localStorage.getItem("version");
      if(ver != null && ver == VERSION.toString()) {
        this.update = false;
      }
    },
    // 检查登录
    loginCheck: function () {
      checkLogin().then((resp) => {
        if (resp.data == "3401 LOGOUT") {
          this.isLogin = false;
          window.localStorage.setItem("isLogin", "false");
        }
        else{
          this.isLogin = true;
          window.localStorage.setItem("isLogin", "true");
          getCourse(true).then((response) => {
            window.localStorage.setItem("lessons", JSON.stringify(response.data));
          })
        }
      })
    },
    // 登录按钮跳转
    login: function () {
      this.$router.push("/login")
    },
    // 登出
    logout: function () {
      if (this.isLogin)
        logOut().then(() => {
          Toast("退出成功");
          location.reload();
        })
      else Toast("未登录");
    },
    // 图书馆按钮跳转
    getLibrary: function () {
      this.$router.push("/library")
    },
    // 课程表按钮跳转
    getCourses: function () {
      this.$router.push("/course")
    },
    // 成绩按钮跳转
    getScore: function () {
      this.$router.push("/score")

    },
    // 考试按钮跳转(还没做)
    getExam: function () {
      this.$router.push("/exam");
    },
    // getCaptcha: function () {
    //   captcha().then((res) => {
    //     this.imgUrl = "data:image/png;base64," + res.data;
    //   })
    // },

    // 下载App按钮跳转
    downApp: function () {
      Dialog.alert({
        message:
            '已修复华为设备小部件BUG\n' +
            '更新了安卓课程表小部件，欢迎下载体验！\n' +
            '从无小部件版本更新建议先卸载\n' +
            '下载链接: https://wwn.lanzoul.com/b0419zkwh\n' +
            '提取码: 2333',
      })
    },
    // 关于按钮跳转
    about: function () {
      this.$router.push("/about");
    },
    // 校历按钮跳转
    calendar: function () {
      this.$router.push("/calender")
    }
  },
}
</script>

<style scoped>
#progr {
  margin-left: 10%;
  height: 0;
  padding-bottom: 20%;
  width: 85%;
  border-radius: 15px;
  background-color: white;
}

.img {
  max-width: 35%;
  max-height: 100%;
  margin-bottom: 5%;
}

#bar {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05), 0 2px 6px 0 rgba(0, 0, 0, 0.05);
}

#row {
  left: 5%;
  padding: 1%;
  max-width: 90%;
  margin-bottom: 5%;
  border-radius: 15px;
  background-color: white;
}

#hitokoto {
  margin-bottom: 10%;
  height: 0;
  padding-bottom: 90%;
  width: 85%;
  border-radius: 15px;
  margin-right: 10%;
  margin-left: 5%;
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
  background-color: white;
}

#clock-container {
  margin-bottom: 10%;
  margin-left: 10%;
  height: 0;
  padding-bottom: 60%;
  width: 85%;
  border-radius: 15px;
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
  background-color: white;
}

#clock1 {
  margin-left: 10%;
  padding-top: 10%;
  color: #03a9f4;
  font-size: 2.5vw;
}
#clock2 {
  margin-left: 10%;
  color: black;
  font-size: 7vw;
}
#score{
  background-color: #f2f2f2;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
#clock3 {
  margin-left: 10%;
  color: gray;
  font-size: 3vw;
}
#sentence {
  font-size: small;
  margin-left: 10%;
  margin-right: 10%;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
.text {
  color: black;
}

#grid1 {
  position: relative;
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>