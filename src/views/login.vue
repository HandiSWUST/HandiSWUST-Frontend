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
        <pwd-login-panel v-if="loginMode === 'pwd'" ref="pwdLogin" @finished="finish"/>
        <phone-login-panel v-else ref="phoneLogin" @finished="finish"/>
        <p style="margin-top: 3%; margin-left: 3%; color: #2c2c2c;">登录即代表您同意我们的<a style="color: #1989fa" @click="this.$router.push('/about')">隐私政策</a>
        </p>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button block color="#1989fa" type="primary" native-type="submit" style="border-radius: 6px">
          提交
        </van-button>
      </div>
      <van-divider/>
      <div style="width: 100%; display: flex; justify-content: center">
        <van-radio-group v-model="loginMode" direction="horizontal">
          <van-radio name="pwd">密码登录</van-radio>
          <van-radio name="phone">手机登录</van-radio>
        </van-radio-group>
      </div>
    </van-form>
  </div>
</template>

<script>
import PwdLoginPanel from "@/components/PwdLoginPanel.vue";
import PhoneLoginPanel from "@/components/PhoneLoginPanel.vue";
import {setAcgTheme} from "@/js/ThemeUtils";

export default {
  name: "loginPanel",
  components: {PhoneLoginPanel, PwdLoginPanel},
  data() {
    return {
      show: false,
      loginMode: "pwd"
    }
  },
  mounted() {
    setAcgTheme(document.querySelector("#login"));
  },
  methods: {
    login: function () {
      this.show = true;
      if (this.loginMode === "pwd") {
        this.$refs.pwdLogin.login();
      } else {
        this.$refs.phoneLogin.login();
      }
    },
    finish() {
      localStorage.setItem("isLogin", "true");
      this.show = false;
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