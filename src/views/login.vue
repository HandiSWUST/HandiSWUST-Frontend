<template>
	<div id="login">
		<van-nav-bar title="登录" id="bar"/>
		<van-form @submit="login" id="form">
		  <van-cell-group inset>
		    <van-field
		      v-model="username"
		      name="用户名"
		      label="用户名"
		      placeholder="用户名"
		      :rules="[{ required: true, message: '请填写用户名' }]"
		    />
		    <van-field
		      v-model="password"
		      type="password"
		      name="密码"
		      label="密码"
		      placeholder="密码"
		      :rules="[{ required: true, message: '请填写密码' }]"
		    />
			<van-field 
			  v-model="captcha"
			  name="验证码"
			  label="验证码"
			  placeholder="验证码"
			  :rules="[{ required: true, message: '请填写验证码' }]"
			  />
			  <img v-bind:src="imgUrl"/>
			  <br/>
			  <van-button plain type="primary" color="#2c2c2c" size="small" v-on:click="getCaptcha" style="margin-left: 3%;">获取验证码</van-button>
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
import { login } from '../api/login'
import axios from "axios"
	export default {
		name: "loginPanel",
		data() {
			return {
				username: "",
				password: "",
				captcha: "",
				imgUrl: ""
			}
		},
		methods: {
			login: function() {
				login(this.username, this.password, this.captcha);
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
			}
		}
	}
</script>

<style>
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