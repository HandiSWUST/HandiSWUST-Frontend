<script>
import {getCaptcha, login} from "@/api/login";
import {Base64} from "js-base64";
import {showFailToast} from "vant";
import {cr} from "@/api/crApi";

export default {
  name: "PwdLoginPanel",
  emits: ["finished"],
  data() {
    return {
      username: "",
      password: "",
      captcha: "",
      imgUrl: "",
      remember: true,
      captchaBase64: ""
    }
  },
  mounted() {
    this.getPwd();
  },
  methods: {
    login: function () {
      login(this.username, this.password, this.captcha).then((response) => {
        if (response.data.success) {
          if (this.remember) {
            let pwd = Base64.encode(this.password);
            let user = Base64.encode(this.username);
            localStorage.setItem("user", user);
            localStorage.setItem("pwd", pwd);
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("password");
          }
          this.$router.go(-1);
        } else if (response.data.code === 1502 || response.data.code === 5501) {
          showFailToast("登录失败，一站式登录接口崩溃");
        } else {
          showFailToast("登录失败，请检查账号密码及验证码是否正确");
          this.loadCaptcha();
        }
      }).finally(() => {
        this.$emit("finished");
      })
    },
    loadCaptcha: function () {
      getCaptcha().then((res) => {
        if (res.status !== 200) {
          showFailToast("验证码获取失败");
        } else {
          this.imgUrl = "data:image/png;base64," + res.data.data;
          this.captchaBase64 = res.data.data;
          this.showCR = true;
          this.captchaRecognize();
        }
      })
    },
    getPwd() {
      let pwd = localStorage.getItem("pwd");
      let user = localStorage.getItem("user");
      if (user != null && pwd != null) {
        this.username = Base64.decode(user);
        this.password = Base64.decode(pwd);
      }
    },
    captchaRecognize() {
      cr({data: this.captchaBase64}).then((resp) => {
        this.captcha = resp.data;
      })
    }
  }
}

</script>

<template>
<div>
  <van-field
      v-model="username"
      name="学号"
      label="学号"
      placeholder="学号"
      clearable
  />
  <van-field
      v-model="password"
      type="password"
      name="一站式密码"
      label="一站式密码"
      placeholder="一站式密码"
      clearable
  />
  <van-field
      v-model="captcha"
      name="验证码"
      label="验证码"
      placeholder="验证码"
      clearable
  />
  <br/>
  <div style="display: flex;">
    <img v-bind:src="imgUrl" style="margin-left: 3%;"/>
    <van-button plain type="primary" color="#1989fa" size="small" v-on:click="loadCaptcha"
                style="margin-left: 3%;">获取验证码
    </van-button>
  </div>
  <van-checkbox v-model="remember" checked-color="#1989fa" style="margin-top: 5%; margin-left: 3%;">记住密码
  </van-checkbox>
</div>
</template>

<style scoped>

</style>