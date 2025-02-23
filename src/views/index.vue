<template>
  <div id="mask">
    <div id="grid1">
      <!--  导航栏及公告栏  -->
      <div style="height: 10vh">
        <van-nav-bar
            title="首页"
            class="bar"
            right-text="关于"
            @click-right="$router.push('/about')">
          <template #left>
            <van-badge :dot="update">
              <p @click="downApp" style="color: #1989fa;">{{ appText }}</p>
            </van-badge>
          </template>
        </van-nav-bar>

        <van-notice-bar
            style="height: 50%; min-height: 40px"
            id="notice"
            left-icon="volume-o"
            speed="30"
            :text="getNotice()"
        />
      </div>

      <van-swipe :show-indicators="false" @drag-end="updateIdx" ref="swipe">
        <!--  主页  -->
        <van-swipe-item>
          <div class="page blurred-theme">
            <!--  时间、周数、一言  -->
            <van-row style="width: 100%">
              <van-col span="12">
                <digital-clock/>
                <div>
                  <van-progress :percentage="percent" :pivot-text="week" stroke-width="100%" id="progr"
                                color="#00bcd4"/>
                </div>
              </van-col>

              <van-col span="12">
                <hitokoto-panel/>
              </van-col>
            </van-row>

            <!--  按钮面板  -->
            <van-col span="24" style="font-family:'Douyin Sans';">
              <index-grid>
                <index-button v-if="!isLogin" @click="$router.push('/login')" image="/login.svg" text="登录"/>
                <index-button v-if="!isLogin" @click="$router.push('/exam')" image="/exam.svg" text="考试"/>
                <index-button v-if="isLogin" @click="$router.push('/library')" image="/lib.svg" text="图书借阅信息"/>
                <index-button v-if="isLogin" @click="logout" image="/logout.svg" text="退出登录"/>
              </index-grid>
              <index-grid>
                <index-button @click="$router.push('/course')" image="/table.svg" text="课程表"/>
                <index-button @click="$router.push('/calender')" image="/date.svg" text="校历"/>
              </index-grid>
              <index-grid v-if="isLogin">
                <index-button @click="$router.push('/score')" image="/score.svg" text="成绩"/>
                <index-button @click="$router.push('/exam')" image="/exam.svg" text="考试"/>
              </index-grid>
            </van-col>
          </div>
        </van-swipe-item>

        <!--  应用页  -->
        <van-swipe-item>
          <div class="page blurred-theme">
            <AppCard category="实用工具">
              <AppButton text="作业查询" title="对分易作业查询" src="https://swust.devin.cool/plugins/dfy"
                         icon="/plugins/duifene.svg"/>
              <AppButton text="对分易小帮手" title="对分易小帮手" sty src="https://dfe.ivresse.top/"
                         icon="/plugins/dfe-help.svg"/>
              <AppButton text="新生指南" title="新生指南" src="http://xszn.qfcdn.icu/" icon="/plugins/guide.svg"/>
              <AppButton text="一卡通服务" title="" @click="gotoYKT" :placeholder="true" icon="/plugins/ykt.svg"/>
            </AppCard>
            <AppCard category="语言大模型">
              <AppButton text="DeepSeek" title="DeepSeek SCNet" src="https://chat.scnet.cn/"
                         icon="/plugins/deepseek.png"/>
            </AppCard>
            <AppCard category="校友优秀项目">
              <AppButton text="RISC-V仿真框架" title="RISC-V仿真框架" src="https://blkrv.moeyuki.net/"
                         icon="/plugins/os.svg"/>
              <AppButton text="西科通" title="西科通" src="https://swust.link.yudream.online/" icon="/plugins/xkt.png"/>
            </AppCard>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="page blurred-theme">
            <div style="display: flex;justify-content:center;font-family:'Douyin Sans';">敬请期待</div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <van-tabbar v-model="active" @change="changePage">
        <van-tabbar-item icon="home-o"></van-tabbar-item>
        <van-tabbar-item icon="more-o"></van-tabbar-item>
        <van-tabbar-item icon="logistics"></van-tabbar-item>
      </van-tabbar>
      <!--  提前加载课程表  -->
      <course-table v-if="isLogin" style="display: none"/>
    </div>
  </div>
</template>

<script>
import {NOTICE, START_TIME, WEB_VERSION} from "/src/common/final.js"
import {TOTAL_WEEK} from "/src/common/final.js"
import {VERSION} from "/src/common/final.js"
import {showDialog, showNotify, showToast} from "vant"
import {checkLogin} from "@/api/loginCheck";
import {logOut} from "@/api/logout";
import AppCard from "@/components/AppCard.vue";
import AppButton from "@/components/AppButton.vue";
import IndexButton from "@/components/IndexButton.vue";
import IndexGrid from "@/components/IndexGrid.vue";
import DigitalClock from "@/components/DigitalClock.vue";
import HitokotoPanel from "@/components/HitokotoPanel.vue";
import {getWebVersion} from "@/api/webInfoApi";
import CourseTable from "@/views/course.vue";

export default {
  name: "indexPanel",
  components: {CourseTable, HitokotoPanel, DigitalClock, IndexGrid, IndexButton, AppButton, AppCard},
  mounted() {
    // ACG模式
    if (localStorage.getItem('ACG_MODE') === 'true') {
      const el = document.querySelector('#mask')
      const custBg = localStorage.getItem('customBg');
      if (custBg !== "" && custBg != null) {
        el.style.cssText += `background-image: url("${custBg}");`
      } else {
        let bgUrl = `/sercet/${Math.floor(Math.random() * 5) + 1}.jpg`;
        localStorage.setItem("ramdonBg", bgUrl);
        el.style.cssText += `background-image: url("${bgUrl}");`;
      }
      const opacity = "0.7";
      document.documentElement.style.setProperty("--van-background-2", "rgba(255, 255, 255, " + opacity + ")");
      document.documentElement.style.setProperty("--van-grid-item-content-background", "none");
      document.documentElement.style.setProperty("--van-grid-item-content-active-color", "rgba(242, 243, 245, " + opacity + ")");
      document.documentElement.style.setProperty("--van-tabbar-item-active-background", "none");
      document.getElementById("progr").style.opacity = opacity;
      document.getElementById("notice").style.opacity = opacity;
    }

    // 更新检查
    this.updateCheck();
    // 登录检查
    this.loginCheck();
    // 0点后提示
    if (new Date().getHours() >= 0 && new Date().getHours() <= 6) {
      showNotify({type: 'primary', message: '每晚0:00一站式认证接口维护'});
    }
  },
  data() {
    return {
      // 是否需要更新, 为true表示需要
      update: true,
      // 当前周数
      curWeek: 0,
      // 登录状态
      isLogin: false,
      // tabber
      active: 0,
      appText: "下载APP",
      themeVars: {NavBarHeight: "5.5vh"}
    }
  },
  computed: {
    // 计算当前周数
    week: function () {
      let cur = Math.ceil((new Date().getTime() - START_TIME) / (1000 * 60 * 60 * 24 * 7));
      if (cur > TOTAL_WEEK) {
        cur = TOTAL_WEEK;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.curWeek = cur;
      return "第" + cur.toString() + "/" + TOTAL_WEEK + "周";
    },
    // 计算进度条百分比
    percent: function () {
      return (this.curWeek / TOTAL_WEEK) * 100;
    }
  },
  methods: {
    gotoYKT() {
      window.location = 'http://ykt.swust.edu.cn/plat/shouyeUser'
    },
    getNotice() {
      return NOTICE
    },
    // 检查更新
    updateCheck: function () {
      // 检查APP更新
      let ver = localStorage.getItem("version");
      if (ver != null) {
        if (Number(ver) === VERSION) {
          this.appText = "已是最新版";
          this.update = false;
        } else {
          this.appText = "有新版本";
        }
      }
      // 检查WEB更新
      getWebVersion().then((resp) => {
        console.log(resp.data)
        if (resp.status === 200 && Number(resp.data) !== Number(WEB_VERSION)) {
          // location.reload();
        }
      })
    },
    // 检查登录
    loginCheck: function () {
      this.isLogin = localStorage.getItem("isLogin") === "true";
      checkLogin().then((resp) => {
        if (resp.data.code === 3401) {
          this.isLogin = false;
          localStorage.setItem("isLogin", "false");
        }
        // 已经登录的话就顺便更新下课表
        else {
          this.isLogin = true;
          localStorage.setItem("isLogin", "true");
        }
      })
    },
    // 登出
    logout: function () {
      if (this.isLogin)
        logOut().then(() => {
          showToast("退出成功");
          location.reload();
        })
      else showToast("未登录");
    },
    // 下载App按钮跳转
    downApp: function () {
      showDialog({
        message:
            '2024.6.25\n' +
            '服务端升级，为防止无法使用请尽快更新\n' +
            '增加了启动等待画面，更新访问地址\n' +
            '\n下载链接: https://update.devin.cool',
        confirmButtonColor: "#1989fa",
      })
    },
    updateIdx: function (o) {
      this.active = Number(o.index);
    },
    changePage: function (index) {
      this.$refs.swipe.swipeTo(index);
    }
  },
}
</script>

<style scoped>
#progr {
  font-family: 'Smiley Sans Oblique';
  font-weight: 400;
  font-size: 1.5rem;
  margin-left: 10%;
  height: 0;
  padding-bottom: 20%;
  width: 85%;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
}

#grid1 {
  display: flex;
  flex-flow: column;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.page {
  padding-top: 6%;
  padding-bottom: 6%;
  max-height: 100vh;
  overflow: auto;
}

#notice {
  background: rgb(236, 249, 255);
  color: rgb(25, 137, 250)
}

#mask {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  height: 100%;
  width: 100%;
}
</style>
