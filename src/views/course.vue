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
		  <van-col span="3"><p class="time">周一</p></van-col>
		  <van-col span="3"><p class="time">周二</p></van-col>
		  <van-col span="3"><p class="time">周三</p></van-col>
		  <van-col span="3"><p class="time">周四</p></van-col>
		  <van-col span="3"><p class="time">周五</p></van-col>
		  <van-col span="3"><p class="time">周六</p></van-col>
		  <van-col span="3"><p class="time">周日</p></van-col>
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
	import { Toast } from "vant";
	import lesson from "../components/class.vue"
	import { getCourse } from "/src/api/getCourse"
  import {selectedCourse} from "@/api/getCourse";
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
				this.show = true;
        var temp = window.localStorage.getItem("lessons");
        if(temp != null && window.localStorage.getItem("cur") == this.curWeek.toString()) {
          this.lessons = JSON.parse(temp);
          this.show = false;
        }else {
          getCourse(this.cur).then((response) => {
            if(response.status == 200) {
              if(response.data == "3401 LOGOUT") {
                Toast.fail("未登录");
                this.$router.push("/login");
              }else {
                this.lessons = response.data;
                window.localStorage.setItem("cur", this.curWeek.toString())
                window.localStorage.setItem("lessons", JSON.stringify(response.data));
              }
            } else {
              this.week = Number(window.localStorage.getItem("cur"))
              Toast.fail("获取课表失败");
            }
            this.show = false;
          })
        }
			},
      // 获取所选周课表
      getSelect: function() {
        this.show = true;
        selectedCourse(this.week).then((response) => {
          if(response.status == 200) {
            if(response.data == "3401 LOGOUT") {
              Toast.fail("未登录");
              this.$router.push("/login");
            }else {
              this.lessons = response.data;
              if(this.week == this.curWeek) {
                window.localStorage.setItem("lessons", JSON.stringify(response.data))
              }
            }
          } else {
            this.week = this.curWeek;
            Toast.fail("获取课表失败");
          }
          this.show = false;
        })
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
		top: 0%;
		background-color: white;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05), 0 2px 6px 0 rgba(0, 0, 0, 0.05);
	}
	.time {
		text-align: center;
		color: black;
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