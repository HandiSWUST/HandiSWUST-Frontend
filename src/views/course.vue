<template>
	<div id="grid1">
		<van-nav-bar 
		title="课程表" 
		:border="false" 
		left-text="返回" 
		left-arrow 
		@click-left="goBack"
		right-text="刷新"
		@click-right="get"/>
		<van-row id="table">
		  <van-col span="3"><p class="time">5周</p></van-col>
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
					:style='{ "top": computeTop(l.section_start), "left": computeLeft(l.week_day)}'>
					</lesson>
				</van-row>
			</van-col>
		</van-row>
	</div>
</template>

<script>
	import { Toast } from "vant";
	import lesson from "../components/class.vue"
	import {getCourse} from "/src/api/getCourse"
	export default {
		name: "courseTable",
		components: {
			lesson
		},
		data() {
			return {
				lessons: []
			}
		},
		methods: {
			goBack: function() {
				this.$router.push("/");
			},
			get: function() {
				getCourse().then((response) => {
					if(response.data == "3401 LOGOUT") {
						Toast.fail("未登录");
						this.$router.push("/login");
					}else {
						console.log(response.data);
						this.lessons = response.data;
					}
				})
			},
			computeTop: function(num) {
				return (num * 7.5 + 1).toString() + "%";
			},
			computeLeft: function(num) {
				return (num * 12.5).toString() + "%";
			},
			computeHeight: function(num, num1) {
				return ((num - num1 + 1) * 7.5).toString() + "%";
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
	#table {
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