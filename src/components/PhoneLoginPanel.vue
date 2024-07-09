<script>
import {showFailToast, showSuccessToast} from "vant";
import {getPhoneCaptcha, loginByPhone} from "@/api/login";

export default {
  name: "PhoneLoginPanel",
  emits: ["finished"],
  data() {
    return {
      username: "",
      password: "",
      captcha: "",
      captchaBtnText: "获取验证码",
      remainingTime: 0,
      disabled: false,
      timer: null
    }
  },
  mounted() {
    this.username = localStorage.getItem("phone");
  },
  methods: {
    loadCaptcha: function () {
      if (this.username === "") {
        showFailToast("请先输入手机号");
        return;
      }
      getPhoneCaptcha(this.username).then((res) => {
        if (res.status !== 200) {
          showFailToast("验证码获取失败");
        } else {
          showSuccessToast("验证码已发送，请注意查收");
          this.disabled = true;
          this.remainingTime = 60;
          this.timer = setInterval(() => {
            if (this.remainingTime > 0) {
              this.remainingTime--;
              this.captchaBtnText = this.remainingTime + "s";
            } else {
              this.disabled = false;
              this.captchaBtnText = "获取验证码";
              clearInterval(this.timer);
            }
          }, 1000);
        }
      })
    },
    login: function () {
      if (this.captcha === "") {
        showFailToast("请先获取验证码");
        return;
      }
      loginByPhone(this.username, this.captcha).then((response) => {
        if (response.data.success) {
          localStorage.setItem("phone", this.username);
          this.$router.go(-1);
        } else if (response.data.code === 1502 || response.data.code === 5501) {
          showFailToast("登录失败，一站式登录接口崩溃");
        } else {
          showFailToast("登录失败，请检查手机号及验证码是否正确");
        }
      }).finally(() => {
        this.$emit("finished");
      })
    }
  }
}
</script>

<template>
  <div>
    <van-field
        v-model="username"
        name="手机号"
        label="手机号"
        placeholder="手机号"
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
      <van-button plain type="primary" color="#1989fa" size="small" v-on:click="loadCaptcha" :disabled="disabled"
                  style="margin-left: 16px">
        {{captchaBtnText}}
      </van-button>
    </div>
  </div>
</template>

<style scoped>

</style>