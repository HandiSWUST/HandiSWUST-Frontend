<template>
	<div id="login">
		<van-overlay :show="show" :z-index="999">
			  <div id="loading_login">
			    <van-loading color="#1989fa" size="20%"/>
			  </div>
			
		</van-overlay>
		<van-nav-bar title="登录" id="bar"/>
		<van-form @submit="login" id="form">
		  <van-cell-group inset>
		    <van-field
		      v-model="username"
		      name="学号"
		      label="学号"
		      placeholder="学号"
		    />
		    <van-field
		      v-model="password"
		      type="password"
		      name="一站式密码"
		      label="一站式密码"
		      placeholder="一站式密码"
		    />
			<van-field 
			  v-model="captcha"
			  name="验证码"
			  label="验证码"
			  placeholder="验证码"
			  />
			  
			  <br/>
			  <div style="display: flex;">
				  <img v-bind:src="imgUrl" style="margin-left: 3%;"/>
				  <van-button plain type="primary" color="#2c2c2c" size="small" v-on:click="getCaptcha" style="margin-left: 3%;">获取验证码</van-button>
				  
			  </div>
			  <van-checkbox v-model="remember" checked-color="#2c2c2c" style="margin-top: 5%; margin-left: 3%;">记住密码</van-checkbox>
			  <p style="margin-top: 3%; margin-left: 3%; color: #2c2c2c;">登录即代表您同意我们的<a href="https://note.shirakawatyu.top/#/article/53">隐私政策</a></p>
		  </van-cell-group>
		
		  <div style="margin: 16px;">
		    <van-button round block color="#2c2c2c" type="primary" native-type="submit">
		      提交
		    </van-button>
		  </div>
		</van-form>
	</div>
</template>

<script>
import Cookies from 'js-cookie'
import { login } from '../api/login'
import axios from "axios"
import { Base64 } from "js-base64"
import {Toast} from "vant";
import { BASE_URL } from "../common/final.js"
	export default {
		name: "loginPanel",
		data() {
			return {
				username: "",
				password: "",
				captcha: "",
				imgUrl: "",
				remember: true,
				show: false
			}
		},
		mounted() {
			this.getPwd();
      this.getCaptcha();
		},
		methods: {
			login: function() {
				this.show = true;
				login(this.username, this.password, this.captcha, this.remember).then((response) => {
				  // console.log(response.data);
				  if(response.data == "1200 LOGIN SUCCESS") {
					if(this.remember) {
					  var pwd = Base64.encode(this.password);
					  var user = Base64.encode(this.username);
            window.localStorage.setItem("user", user);
            window.localStorage.setItem("pwd", pwd);
					  // console.log(this.remember)
					}else {
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("password");
					}
					this.$router.push("/");
				  }else {
					Toast.fail("登录失败，请检查账号密码及验证码是否正确");
					this.getCaptcha();
				  }
				}).finally(() => {
				  this.show = false;
				});
			},
			getCaptcha: function() {
				axios.defaults.withCredentials = true;
				axios({
					method: "get",
					url: BASE_URL+"/api/captcha",
					withCredentials: true
				}).then((res) => {
					// console.log(res.data);
					this.imgUrl = "data:image/png;base64," + res.data;
				})
			},
			getPwd() {
			  var pwd = window.localStorage.getItem("pwd");
			  var user = window.localStorage.getItem("user");
			  if(user != null && pwd != null) {
				  this.username = Base64.decode(user);
				  this.password = Base64.decode(pwd);
			  }
			},
		}
	}
</script>

<style>
	#loading_login {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	#box {
		justify-content: left;
		vertical-align: middle;
	}
	#login {
		position: relative;
		background-color: white;
		width: 100%;
		height: 100%;
	}
	#form {
		position: relative;
		top: 3%
	}
	#bar {
		box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1), 0 3px 20px 0 rgba(0, 0, 0, 0.1)
	}
</style>