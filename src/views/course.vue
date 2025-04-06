<template>
  <div id="grid1" ref="grid1">
    <!--  加载效果  -->
    <LoadingView :show="show"/>
    <!--  导航栏  -->
    <van-nav-bar
        title="课程表"
        :border="false"
        left-text="返回"
        left-arrow
        @click-left="goBack">
      <template #title>
        <div id="refresh" @click="refreshCourse">
          <div>课程表</div>
          <van-icon name="replay" />
        </div>
      </template>
      <template #right>
        <van-pagination v-model="week" :page-count="totalWeek" mode="simple" id="pagination">
          <template #prev-text>
            <van-icon name="arrow-left" @click="pagePrev"/>
          </template>
          <template #next-text>
            <van-icon name="arrow" @click="pageNext"/>
          </template>
        </van-pagination>
      </template>
    </van-nav-bar>
    <!--  导航栏底下的星期条  -->
    <van-row class="week-bar">
      <van-col span="3"><p class="time">{{ curWeek }}周</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[1] }">一</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[2] }">二</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[3] }">三</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[4] }">四</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[5] }">五</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[6] }">六</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[0] }">日</p></van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <van-swipe ref="swipe" :loop="false" :initial-swipe="initial" :show-indicators="false" style="margin-top: 1%"
                   @change="getRound">
          <van-swipe-item v-for="lessons in lessonsList" :key="lessons">
            <van-row id="row-table">
              <!--  课表左侧的课程序号  -->
              <div style="max-height: 100%; width: 12.5vw">
                <div id="noTable">
                  <p class="num">1</p>
                  <p class="num">2</p>
                  <p class="num">3</p>
                  <p class="num">4</p>
                  <p class="num">5</p>
                  <p class="num">6</p>
                  <p class="num">7</p>
                  <p class="num">8</p>
                  <p class="num">9</p>
                  <p class="num">10</p>
                  <p class="num">11</p>
                  <p class="num">12</p>
                </div>
              </div>
              <div style="max-height: 100%; width: 85.75vw; margin-left: 1%">
                <!--  渲染课表   -->
                <lesson
                    v-for="l in lessons"
                    :course_name="l.jw_course_name"
                    :acg-mode="acgMode"
                    :base_room_name="l.base_room_name"
                    :week="l.week"
                    :key="l.jw_task_book_no"
                    :teacher="l.base_teacher_name"
                    :week_day="l.week_day"
                    :start="l.section_start"
                    :end="l.section_end"
                    :course_code="l.jw_course_code"
                    :blur="lessonBlur"
                >
                </lesson>
              </div>
            </van-row>
          </van-swipe-item>
        </van-swipe>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {START_TIME, TOTAL_WEEK} from "/src/common/final.js"
import {showFailToast, showSuccessToast} from "vant";
import lesson from "../components/class.vue"
import LoadingView from "@/components/LoadingView.vue";
import simpleSelectWeek, {refreshExpCourse, refreshNormalCourse} from "@/js/CourseUtils";
import {checkLogin} from "@/api/loginCheck";

export default {
  name: "courseTable",
  components: {
    LoadingView,
    lesson
  },
  mounted() {
    let grid1 = this.$refs.grid1;
    const opacity = 0.7;
    this.acgMode = localStorage.getItem('ACG_MODE') === 'true';
    if (this.acgMode && grid1.offsetWidth > 0) {
      let custBg = localStorage.getItem('customBg');
      if (custBg !== "" && custBg != null) {
        grid1.style.cssText = `background-image: url("${custBg}");`
      } else {
        let bgUrl = localStorage.getItem("ramdonBg");
        grid1.style.cssText = `background-image: url("${bgUrl}");`;
      }
      document.querySelector(".week-bar").style.cssText += `background-color: rgba(255, 255, 255, ${opacity});`
      document.documentElement.style.setProperty("--van-pagination-background", "none");
      document.documentElement.style.setProperty("--van-pagination-item-disabled-background", "none");
    }
    // 删掉边框
    let items = document.getElementsByTagName("ul");
    for (const item of items) {
      item.setAttribute("style", "margin: -1px !important;")
    }

    for (let i = 0; i <= this.totalWeek; i++) {
      this.lessonsList.push([]);
    }
    // 缓存验证
    this.validateLocalCache();
    refreshExpCourse();
    refreshNormalCourse();
    this.setActiveDay();
    this.get();
    this.week = this.curWeek;
    this.$nextTick(() => {
      this.initial = this.curWeek;
    })
  },
  data() {
    return {
      lessonsList: [[]],
      cur: true,
      week: 0,
      oldWeek: 0,
      show: false,
      local: false,
      activeDay: [false, false, false, false, false, false, false],
      initial: 0,
      acgMode: false,
      lessonBlur: localStorage.getItem('lessonBlur') === 'true'
    }
  },
  computed: {
    curWeek: function () {
      let w = Math.ceil((new Date().getTime() - START_TIME) / (1000 * 60 * 60 * 24 * 7));
      return w > 0 ? w : 0;
    },
    totalWeek: function () {
      return TOTAL_WEEK;
    },
  },
  methods: {
    // 返回按钮跳转
    goBack: function () {
      this.$router.push("/");
    },
    handleErrorCode(code, moduleName) {
      switch (code) {
        case 3401:
          showFailToast("登录状态失效，刷新" + moduleName + "失败，建议重登");
          break;
        case 1502:
        case 5501:
          showFailToast("一站式故障，刷新" + moduleName + "失败 (如课程正确可忽略)");
          break;
        case 3403:
          showFailToast("您的教务系统欠费，刷新" + moduleName + "失败");
          break;
        default:
          showFailToast("刷新" + moduleName + "失败");
      }
    },
    // 获取课表的默认方法
    get: function () {
      if (Number(this.curWeek) > Number(this.totalWeek)) {
        localStorage.setItem("cur", this.totalWeek.toString())
        localStorage.setItem("lessons", "[]");
      } else {
        localStorage.setItem("cur", this.curWeek.toString());
        this.getRound(this.curWeek, true);
        localStorage.setItem("lessons", JSON.stringify(this.lessonsList[this.curWeek]));
      }
    },
    // 获取所选周前后一周的课程
    getRound: function (index, force=false) {
      let setCourse = () => {
        let expStr = localStorage.getItem("exp");
        let normStr = localStorage.getItem("norm");
        let exp = (expStr == null ? [] : JSON.parse(expStr));
        let norm = (normStr == null ? [] : JSON.parse(normStr));
        const fillCourse = async (w) => {
          if (force || this.lessonsList[w].length === 0) {
            this.lessonsList[w] = simpleSelectWeek(w, exp.concat(norm));
          }
        }
        fillCourse(index);
        fillCourse(index - 1);
        fillCourse(index + 1);
        setTimeout(() => {
          this.week = index;
        }, 500);
      }

      if (localStorage.getItem("exp") == null) {
        this.show = true;
        refreshExpCourse((response) => {
          if (response.status !== 200) {
            showFailToast("后端服务器错误");
          } else if (response.data.code !== 0) {
            this.handleErrorCode(response.data.code, "实验课表")
          }
          this.show = false;
          setCourse();
        });
      }
      if (localStorage.getItem("norm") == null) {
        this.show = true;
        refreshNormalCourse((response) => {
          if (response.status !== 200) {
            showFailToast("后端服务器错误");
          } else if (response.data.code !== 0) {
            this.handleErrorCode(response.data.code, "普通课表")
          }
          this.show = false;
          setCourse();
        });
      }

      if (index === 0) {
        this.$refs.swipe.next();
      } else if (index > this.totalWeek) {
        this.$refs.swipe.prev();
      } else {
        setCourse();
      }
    },
    pageNext: function () {
      if (this.week < this.totalWeek)
        this.$refs.swipe.next();
    },
    pagePrev: function () {
      if (this.week > 1)
        this.$refs.swipe.prev();
    },
    // 高亮当前星期数
    setActiveDay: function () {
      let weekday = new Date().getDay();
      this.activeDay = [false, false, false, false, false, false, false];
      this.activeDay[weekday] = true;
    },
    validateLocalCache: function () {
      let normStamp = localStorage.getItem("normStamp");
      let expStamp = localStorage.getItem("expStamp");
      if (normStamp !== START_TIME.toString() || expStamp !== START_TIME.toString()) {
        localStorage.removeItem("refresh");
        localStorage.removeItem("lessons");
        this.show = true;
      }
      if (normStamp !== START_TIME.toString()) {
        localStorage.removeItem("norm");
      }
      if (expStamp !== START_TIME.toString()) {
        localStorage.removeItem("exp");
      }
    },
    refreshCourse: async function () {
      this.show = true;
      let resp = await checkLogin()
      if (resp.data.code === 3401) {
        showFailToast("登录状态失效, 请登录后重试");
        this.$router.push('/login');
      } else {
        refreshExpCourse((response) => {
          if (response.status !== 200) {
            showFailToast("后端服务器错误");
          } else if (response.data.code !== 0) {
            this.handleErrorCode(response.data.code, "实验课表")
          } else {
            refreshNormalCourse(() => {
              if (response.status !== 200) {
                showFailToast("后端服务器错误");
              } else if (response.data.code !== 0) {
                this.handleErrorCode(response.data.code, "普通课表")
              } else {
                this.get();
                showSuccessToast("更新成功");
              }
              this.show = false;
            });
          }
        });
      }
    }
  }
}
</script>

<style scoped>
#grid1 {
  position: relative;
  background-color: white;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.week-bar {
  height: 4.5vh;
  padding: 1vw;
  top: 0;
  background-color: white;
  border: 0 solid var(--van-border-color);
  border-bottom-width: 0.5px;
}

.time {
  text-align: center;
  color: black;
}

.active {
  color: #1989fa;
}

.num {
  padding-top: 25%;
  height: 8.33%;
  color: black;
  text-align: center;

}

#noTable {
  height: 100%;
  width: 100%;
  max-height: 100%;
}

#row-table {
  height: 90vh;
  max-height: 100%;
  width: 100vw;
}

#pagination {
  border-radius: 20px;
  overflow: hidden;
  border: 0.5px solid var(--van-border-color);
}

#refresh {
  display: flex;
  align-items: baseline;
}
</style>