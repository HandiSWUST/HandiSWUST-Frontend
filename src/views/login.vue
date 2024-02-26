<template>
  <div id="login">
    <van-overlay :show="show" :z-index="999">
      <div id="loading_login">
        <van-loading color="#1989fa" size="20%"/>
      </div>

    </van-overlay>
    <van-nav-bar title="登录"
                 class="bar"
                 left-text="首页"
                 left-arrow @click-left="this.$router.push('/');"/>
    <van-form @submit="login" id="form">
      <van-cell-group inset>
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
        <p style="margin-top: 3%; margin-left: 3%; color: #2c2c2c;">登录即代表您同意我们的<a style="color: #1989fa" href="https://note.shirakawatyu.top/article/187">隐私政策</a>
        </p>
      </van-cell-group>

      <div style="margin: 16px;">
        <van-button block color="#1989fa" type="primary" native-type="submit" style="border-radius: 6px">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {login} from '@/api/login'
import {Base64} from "js-base64"
import {showFailToast} from "vant";
import {getCaptcha} from "@/api/login"
import {cr} from "@/api/crApi";

export default {
  name: "loginPanel",
  data() {
    return {
      username: "",
      password: "",
      captcha: "",
      imgUrl: "",
      remember: true,
      show: false,
      captchaBase64: ""
    }
  },
  mounted() {
    this.getPwd();
  },
  methods: {
    login: function () {
      this.show = true;
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
        } else if (response.data.code === 1502) {
          showFailToast("登录失败，一站式登录接口崩溃");
          this.loadCaptcha();
        } else {
          showFailToast("登录失败，请检查账号密码及验证码是否正确");
          this.loadCaptcha();
        }
      }).finally(() => {
        this.show = false;
      });
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

<style scoped>
#loading_login {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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

</style>