<template>
  <div id="about">
    <van-collapse v-model="activeNames">
      <van-nav-bar class="bar" title="关于" left-text="返回" left-arrow @click-left="goBack"/>
      <van-collapse-item title="作者">
        <p>全栈 (排名不分先后，出BUG可通过下面方式联系): </p>
        <p>卓计2101 Alice-in-oven: QQ 1071142396</p>
        <p>计科2101 ShirakawaTyu: QQ 2541028866</p>
      </van-collapse-item>
      <van-collapse-item title="隐私协议">
        <textarea class="info" rows="20" readonly>
          {{ getPrivacy() }}
        </textarea>
      </van-collapse-item>
      <van-collapse-item title="更新日志">
        <textarea class="info" rows="20" readonly>
          {{ getUpdateLog() }}
        </textarea>
      </van-collapse-item>
      <van-collapse-item title="主要借物表">
        <textarea class="info" rows="20" readonly>
          {{ getOpenSource() }}
        </textarea>
      </van-collapse-item>
      <van-collapse-item title="Github">
        <p>Web前端代码: https://github.com/flben233/HandiSWUST</p>
        <p>Android端代码: https://github.com/flben233/HandiSWUST-Android-Rebuild</p>
      </van-collapse-item>
      <van-collapse-item title="投喂作者们">
        投喂的收入将用于服务器维护<br>
        （以及作者们的日常开销）
        <van-image src="/payCode.JPG"></van-image>
        <van-image src="/payZ.JPG"></van-image>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>

import {UPDATE_LOG, OPEN_SOURCE, PRIVACY_POLICY} from "@/common/doc";

export default {
  name: "aboutUs",
  data() {
    return {
      activeNames: ["1", "2", "3", "5", "6"],
    }
  },
  methods: {
    goBack: function () {
      this.$router.push("/");
    },
    getOpenSource: function () {
      return OPEN_SOURCE;
    },
    getUpdateLog: function () {
      return UPDATE_LOG;
    },
    getPrivacy: function () {
      return PRIVACY_POLICY;
    }
  }
}
</script>

<style scoped>
#about {
  position: relative;
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.info {
  width: 100%;
  resize: none;
}
</style>
