<template>
  <div id="grid1">
    <!--  加载效果  -->
    <LoadingView :show="show"/>
    <!--  导航栏  -->
    <van-nav-bar
        title="课程表"
        :border="false"
        left-text="返回"
        left-arrow
        @click-left="goBack">
      <template #right>
        <van-pagination v-model="week" :page-count="totalWeek" mode="simple">
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
      <van-col span="3"><p class="time" :class="{ active: activeDay[1] }">周一</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[2] }">周二</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[3] }">周三</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[4] }">周四</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[5] }">周五</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[6] }">周六</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[0] }">周日</p></van-col>
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
              <div style="max-height: 100%; width: 87.5vw;">
                <!--  渲染课表   -->
                <lesson
                    v-for="l in lessons"
                    :course_name="l.jw_course_name"
                    :base_room_name="l.base_room_name"
                    :week="l.week"
                    :key="l.jw_task_book_no"
                    :teacher="l.base_teacher_name"
                    :week_day="l.week_day"
                    :start="l.section_start"
                    :end="l.section_end"
                    :course_code="l.jw_course_code"
                    :style='{ "top": computeTop(l.section_start), "left": computeLeft(l.week_day), "background-color": randomColor(l.section_start + l.week_day)}'>
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
import {showFailToast} from "vant";
import lesson from "../components/class.vue"
import LoadingView from "@/components/LoadingView.vue";
import simpleSelectWeek, {refreshExpCourse, refreshNormalCourse} from "@/js/CourseUtils";

export default {
  name: "courseTable",
  components: {
    LoadingView,
    lesson
  },
  mounted() {
    for (let i = 0; i <= this.totalWeek; i++) {
      this.lessonsList.push([]);
    }
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
      initial: 0
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
          showFailToast("无法连接到一站式，刷新" + moduleName + "失败");
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
        return;
      }
      localStorage.setItem("cur", this.curWeek.toString());
      this.getRound(this.curWeek);
      localStorage.setItem("lessons", JSON.stringify(this.lessonsList[this.curWeek]));
    },
    // 获取所选周前后一周的课程
    getRound: function (index) {
      let exp = localStorage.getItem("exp");
      let norm = localStorage.getItem("norm");
      let setCourse = () => {
        exp = exp == null ? [] : JSON.parse(exp);
        norm = norm == null ? [] : JSON.parse(norm);
        const fillCourse = async (w) => {
          if (this.lessonsList[w].length === 0) {
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

      if (exp == null) {
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
      if (norm == null) {
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

    // 计算课程方块的位置
    computeTop: function (num) {
      return ((num - 1) * 8.3).toString() + "%";
    },
    computeLeft: function (num) {
      return ((num - 1) * 14.2857).toString() + "%";
    },

    // 随机课程方块的颜色
    randomColor: function (num) {
      const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#795548", "#607d8b"];
      return colors[num % colors.length];
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
}

.week-bar {
  height: 4.5vh;
  padding: 1%;
  top: 0;
  background-color: white;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05), 0 2px 6px 0 rgba(0, 0, 0, 0.05);
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

</style>