<template>
	<div id="login">
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
	export default {
		name: "loginPanel",
		data() {
			return {
				username: "",
				password: "",
				captcha: "",
				imgUrl: "",
				remember: false
			}
		},
		mounted() {
			this.getCookie();
		},
		methods: {
			login: function() {
				login(this.username, this.password, this.captcha, this.remember);
			},
			getCaptcha: function() {
				axios.defaults.withCredentials = true;
				axios({
					method: "get",
					url: "/api/captcha",
					withCredentials: true
				}).then((res) => {
					console.log(res.data);
					this.imgUrl = "data:image/png;base64," + res.data;
				})
			},
			getCookie() {
			  var pwd = Cookies.get("pwd");
			  var user = Cookies.get("user");
			  if(user != undefined && pwd != undefined) {
				  this.username = Base64.decode(user);
				  this.password = Base64.decode(pwd);
			  }
			},
		}
	}
</script>

<style>
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