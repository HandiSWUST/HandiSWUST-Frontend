<template>
	<div id="grid1">
		<van-nav-bar 
		title="首页" 
		id="bar" 
		left-text="下载APP" 
		@click-left="downApp"
		right-text="关于"
		@click-right="about"/>
		
		<div id="row2">
			<van-progress :percentage="percent" :pivot-text="week" stroke-width="100%" id="progr" color="#2c2c2c"/>
		</div>
		<van-row align="bottom" id="row">
			<van-grid :column-num="2" id="g" :border="false" :clickable="true">
			  <van-grid-item v-on:click="login" v-if="!isLogin">
				<van-image
					src="/login.png" 
					class="img"
				/>
				<p class="text">登录</p>
			  </van-grid-item>
        <van-grid-item v-on:click="getLibrary" v-if="isLogin">
          <van-icon name="description" size="54"/>
          <p class="text">图书借阅信息</p>
        </van-grid-item>
			  <van-grid-item v-on:click="logout">
				<van-image
					src="/logout.png" 
					class="img"
				/>
				<p class="text">退出登录</p>
			  </van-grid-item>
			  <van-grid-item v-on:click="getCourses">
				<van-image
					src="/table.png" 
					class="img"
				/>
				<p class="text">课程表</p>
			  </van-grid-item>
			  <van-grid-item  v-on:click="getExam">
				  <van-image
					src="/exam.png" 
					class="img"
				  />
				  <p class="text">考试</p>
			  </van-grid-item  >
			  <van-grid-item v-on:click="getScore">
				  <van-image
					src="/score.png" 
					class="img"
				  />
				  <p class="text">成绩</p>
			  </van-grid-item>
			  <van-grid-item >
				  <van-image
					src="/date.png" 
					class="img"
				  />
				  <p class="text">校历</p>
			  </van-grid-item>
			</van-grid>
		</van-row>
	</div>
</template>

<script>
	import {START_TIME} from "/src/common/final.js"
	import {TOTAL_WEEK} from "/src/common/final.js"
	import {getExam} from "/src/api/getExam"
	import {captcha} from "/src/api/getCaptcha"
	import {logout} from "/src/api/logout"
	import { Toast } from "vant"
  import axios from "axios";
	export default {
		name: "indexPanel",
    mounted() {
      this.loginCheck();

    },
    data() {
			return {
				captcha: 0,
				imgUrl: "",
				curWeek: 0,
        isLogin:false
			}
		},
		computed: {
			week: function() {
				console.log(START_TIME);
				console.log(new Date().getTime())
				var cur = Math.ceil((new Date().getTime() - START_TIME) / (1000 * 60 * 60 * 24 * 7));
				this.curWeek = cur;
				return "第" + cur.toString() + "/" + TOTAL_WEEK + "周";
			},
			percent: function() {
				return (this.curWeek / TOTAL_WEEK)*100;
			}
		},
		methods: {
      loginCheck: function(){
        axios.defaults.withCredentials = true;
        return axios({
          method: "get",
          url: "/api/loginCheck",
          withCredentials: true
        }).then((resp)=>{
          if(resp.data=="3401 LOGOUT")this.isLogin=false;
          else this.isLogin=true;
        })

      },
			login: function() {
				this.$router.push("/login")
			},
			logout: function() {
        if(this.isLogin)
				logout().then((resp) => {
					Toast("退出成功");
          location.reload();
				})
        else Toast("未登录");
			},
      getLibrary:function () {
        Toast("开发中")
      },
			getCourses: function() {
				this.$router.push("/course")

			},
      getScore: function() {
        this.$router.push("/score")

      },
			getExam: function() {
				getExam();
			},
			getCaptcha: function() {
				captcha().then((res) => {
					// console.log(res.data);
					this.imgUrl = "data:image/png;base64," + res.data;
				})
			},
			downApp: function() {
				
			},
			about:function() {
				this.$router.push("/about");
			}
		},
	}
</script>

<style scoped>
	#progr {
		border-radius: 10px;
	}
	.img {
		max-width: 50%;
		max-height: 100%;
	}
	#bar {
		box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1), 0 3px 20px 0 rgba(0, 0, 0, 0.1)
	}
	#row {
		left: 5%;
		padding: 5%;
		max-width: 90%;
		position: absolute;
		bottom: 10%;
		border-radius: 15px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		background-color: white;
	}
	#row2 {
		left: 5%;
		padding: 0px;
		width: 90%;
		height: 20%;
		max-width: 90%;
		top:10%;
		position: absolute;
		border-radius: 15px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		background-color: white;
	}
	#bg {
		height: 100%;
	}
	.text {
		color: black;
	}
	#grid1 {
		position: relative;
		background-color: white;
		width: 100%;
		height: 100%;
	}
</style>