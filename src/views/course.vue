<template>
	<div id="grid1">
<!--  加载效果  -->
		<van-overlay :show="show" :z-index="999">
      <div id="loading">
        <van-loading color="#1989fa" size="20%"/>
      </div>
		</van-overlay>
<!--  导航栏  -->
		<van-nav-bar
		title="课程表"
		:border="false"
		left-text="返回"
		left-arrow
		@click-left="goBack"
    style="height: 5%">
      <template #right>
        <van-pagination v-model="week" :page-count="totalWeek" mode="simple" @change="getSelect">
          <template #prev-text>
            <van-icon name="arrow-left" />
          </template>
          <template #next-text>
            <van-icon name="arrow" />
          </template>
        </van-pagination>
      </template>
    </van-nav-bar>
<!--  导航栏底下的星期条  -->
		<van-row id="table">
      <van-col span="3"><p class="time">{{ curWeek }}周</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[1] }">周一</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[2] }">周二</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[3] }">周三</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[4] }">周四</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[5] }">周五</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[6] }">周六</p></van-col>
      <van-col span="3"><p class="time" :class="{ active: activeDay[0] }">周日</p></van-col>
		</van-row>

		<van-row id="row-table">
<!--  课表左侧的课程序号  -->
			<van-col span="3" style="max-height: 100%;">
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
			</van-col>
<!--  渲染课表   -->
			<van-col span="21" style="max-height: 100%;">
				<van-row>
          <lesson
            v-for="l in lessons"
            :course_name="l.jw_course_name"
            :base_room_name="l.base_room_name"
            :week="l.week"
            :teacher="l.base_teacher_name"
            :week_day="l.week_day"
            :start="l.section_start"
            :end="l.section_end"
            :style='{ "top": computeTop(l.section_start), "left": computeLeft(l.week_day), "background-color": randomColor()}'>
					</lesson>
				</van-row>
			</van-col>
		</van-row>

	</div>
</template>

<script>
	import { START_TIME } from "/src/common/final.js"
  import { TOTAL_WEEK } from "/src/common/final.js"
  import {Dialog, Toast} from "vant";
	import lesson from "../components/class.vue"
  import {selectedCourse, useLocalCourse, getCourse} from "/src/api/getCourse";
	export default {
		name: "courseTable",
		components: {
			lesson
		},
		data() {
			return {
				lessons: [],
				cur: true,
        week: 0,
				show: false,
        local: false,
        activeDay: [false, false, false, false, false, false, false],
			}
		},
		computed: {
			curWeek: function() {
				return Math.ceil((new Date().getTime() - START_TIME) / (1000 * 60 * 60 * 24 * 7));
			},
      totalWeek: function () {
        return TOTAL_WEEK;
      },
		},
		methods: {
      // 返回按钮跳转
			goBack: function() {
				this.$router.push("/");
			},

      // 获取课表的默认方法
			get: function() {
        if (Number(this.curWeek) > Number(this.totalWeek)) {
          localStorage.setItem("cur", this.totalWeek.toString())
          localStorage.setItem("lessons", "[]");
          return;
        }
				this.show = true;
        let temp = localStorage.getItem("lessons");
        if(temp != null && localStorage.getItem("cur") == this.curWeek.toString()) {
          this.lessons = JSON.parse(temp);
          this.show = false;
        }else {
          getCourse(this.cur).then((response) => {
            if(response.status === 200) {
              if(response.data.code === 3401) {
                this.useLocal(false);
              }else {
                this.lessons = JSON.parse(response.data.data);
                console.log(this.lessons)
                localStorage.setItem("cur", this.curWeek.toString())
                localStorage.setItem("lessons", response.data.data);
              }
            } else {
              this.week = Number(localStorage.getItem("cur"))
              this.useLocal(true);
            }
            this.show = false;
          })
        }
			},

      // 获取所选周课表
      getSelect: function() {
        this.show = true;
        if (new Date().getHours() >= 0 && new Date().getHours() <= 6) {
          this.useLocal(true);
        } else {
          selectedCourse(this.week).then((response) => {
            if(response.status === 200) {
              if(response.data.code === 3401) {
                // 询问是否使用本地缓存
                this.useLocal(false);
              }else {
                this.lessons = JSON.parse(response.data.data);
                if(this.week == this.curWeek) {
                  localStorage.setItem("lessons", response.data.data)
                }
              }
            } else {
              this.useLocal(true);
            }
            this.show = false;
          })
        }
      },

      // 使用本地缓存查询，未登录使用本地缓存请传入false，否则传入true
      useLocal: function (isLogin) {
        let courseData = localStorage.getItem("raw");
        if (isLogin) {
          if (courseData != null) {
            useLocalCourse(this.week, courseData).then((response) => {
              if(response.status === 200 && response.data != null) {
                this.lessons = JSON.parse(response.data.data);
                Toast.fail("一站式无连接，尝试使用本地数据");
              } else {
                this.week = this.curWeek;
                Toast.fail("获取课表失败");
              }
              this.show = false;
            })
          } else {
            Toast.fail("本地没有缓存哦");
          }
        } else {
          let beforeClose = (action) => {
            if (action === "confirm") {
              this.local = true;
              this.show = true;
              Dialog.close();
              if (courseData != null) {
                useLocalCourse(this.week, courseData).then((response) => {
                  if (response.status === 200 && response.data != null) {
                    this.lessons = JSON.parse(response.data.data);
                    this.show = false;
                  }
                })
              } else {
                Toast.fail("本地没有缓存哦");
                this.$router.push("/login");
              }
            } else {
              Dialog.close();
              this.$router.push("/login");
            }
          };
          if (this.local) {
            beforeClose("confirm");
          } else {
            Dialog.confirm({
              message: "未登录，是否尝试使用本地缓存？",
              confirmButtonColor: "#1989fa",
              beforeClose,
            });
          }
        }
      },

      // 高亮当前星期数
      setActiveDay: function () {
        let weekday = new Date().getDay();
        this.activeDay = [false, false, false, false, false, false, false];
        this.activeDay[weekday] = true;
      },

      // 计算课程方块的位置
			computeTop: function(num) {
				return (num * 7.5 + 2.5).toString() + "%";
			},
			computeLeft: function(num) {
				return (num * 12.5).toString() + "%";
			},

      // 随机课程方块的颜色
			randomColor: function() {
        var colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#795548", "#607d8b"];
        return colors[Math.ceil(Math.random() * colors.length)];
			}
		},
		mounted() {
      this.setActiveDay();
			this.get();
      this.week = Math.ceil((new Date().getTime() - START_TIME) / (1000 * 60 * 60 * 24 * 7));
		}
	}
</script>

<style scoped>
	#loading {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;

	}
	#grid1 {
		position: relative;
		background-color: white;
		width: 100%;
		height: 100%;
		max-height: 100%;
	}
	#table {
		height: 5%;
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
		height: 7.65%;
		color: black;
		text-align: center;
	}
	#noTable {
    border-right: solid #ebedf0;
    border-width: 1px;
    height: 100%;
		width: 100%;
		max-height: 100%;
	}
	#row-table {
		height: 100%;
		max-height: 100%;
	}
	
</style>