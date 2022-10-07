<template>
	<div id="grid1">
		<van-overlay :show="show" :z-index="999">
			  <div id="loading">
			    <van-loading color="#1989fa" size="20%"/>
			  </div>
			
		</van-overlay>
		<van-nav-bar 
		title="课程表" 
		:border="false" 
		left-text="返回" 
		left-arrow 
		@click-left="goBack"
		:right-text="lessonType"
		@click-right="get"
		style="height: 5%;"/>
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
	import { Toast } from "vant";
	import lesson from "../components/class.vue"
	import { getCourse } from "/src/api/getCourse"
	export default {
		name: "courseTable",
		components: {
			lesson
		},
		data() {
			return {
				lessons: [],
				lessonType: "当前周课程",
				cur: true,
				show: false,
			}
		},
		computed: {
			curWeek: function() {
				return Math.ceil((new Date().getTime() - START_TIME) / (1000 * 60 * 60 * 24 * 7));
			}
		},
		methods: {
      onRefresh: function() {
        getCourse(this.cur).then((response) => {
          if(response.data == "3401 LOGOUT") {
            Toast.fail("未登录");
            this.$router.push("/login");
          }else {
            this.lessons = response.data;
          }
      })
      },
			goBack: function() {
				this.$router.push("/");
			},
			get: function() {
				this.show = true;
				getCourse(this.cur).then((response) => {
					if(response.data == "3401 LOGOUT") {
						Toast.fail("未登录");
						this.$router.push("/login");
					}else {
						// console.log(response.data);
						this.lessons = response.data;
					}
					this.show = false;
				})
				if(this.cur) {
					this.lessonType = "所有课程";
					this.cur = false;
				}else {
					this.lessonType = "当前周课程";
					this.cur = true;
				}
			},
			computeTop: function(num) {
				return (num * 7.5 + 2.5).toString() + "%";
			},
			computeLeft: function(num) {
				return (num * 12.5).toString() + "%";
			},
			computeHeight: function(num, num1) {
				return ((num - num1 + 1) * 7.5).toString() + "%";
			},
			randomColor: function() {
				var a = Math.ceil(Math.random() * 200);
				var b = Math.ceil(Math.random() * 200);
				var c = Math.ceil(Math.random() * 200);
				return "#" + a.toString(16) + b.toString(16) + c.toString(16);
			}
		},
		mounted() {
			this.get();
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
		box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1), 0 3px 20px 0 rgba(0, 0, 0, 0.1);
	}
	.time {
		text-align: center;
		color: black;
	}
	.no {
		padding-top: 25%;
		margin-left: 45%;
		height: 7.65%;
		text-align: center;
	}
	.num {
		padding-top: 25%;
		height: 7.65%;
		color: black;
		text-align: center;
	}
	#noTable {
		box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1), 0 3px 20px 0 rgba(0, 0, 0, 0.1);
		height: 100%;
		width: 100%;
		max-height: 100%;
	}
	#row-table {
		height: 100%;
		max-height: 100%;
	}
	
</style>