<template>
  <div id="about">
    <van-collapse v-model="activeNames">
      <van-nav-bar class="bar" title="关于" left-text="返回" left-arrow @click-left="goBack"/>
      <van-collapse-item title="作者">
        <p>全栈 (排名不分先后，出BUG可通过下面方式联系): </p>
        <p>卓计2101 Alice-in-oven: QQ 1071142396</p>
        <p>计科2101 ShirakawaTyu: QQ 2541028866</p>
        <p>卓计2101 Aliothmoon: QQ 3210670566</p>
      </van-collapse-item>
      <van-collapse-item title="隐私协议">
        <textarea class="info" rows="20" v-model="privacy" readonly/>
      </van-collapse-item>
      <van-collapse-item title="更新日志">
        <textarea class="info" rows="20" v-model="updateLog" readonly/>
      </van-collapse-item>
      <van-collapse-item title="主要借物表">
        <textarea class="info" rows="20" v-model="openSource" readonly/>
      </van-collapse-item>
      <van-collapse-item title="Github">
        <p>Web前端代码: https://github.com/flben233/HandiSWUST</p>
        <p>Android端代码: https://github.com/flben233/HandiSWUST-Android-Rebuild</p>
      </van-collapse-item>

      <van-collapse-item title="清除缓存 (没有二次确认，考虑好了再点)">
        <van-button block type="danger" @click="clearLocalCache" style="border-radius: 6px">
          清除本地课程缓存
        </van-button>
        <br/>
        <van-button block type="danger" @click="clearCloudCache" style="border-radius: 6px">
          清除云端课程缓存（可用于刷新课程表）
        </van-button>
      </van-collapse-item>
      <van-collapse-item title="投喂作者们">
        投喂的收入将用于服务器维护<br>
        （以及作者们的日常开销）
        <van-image src="/payCode.JPG"></van-image>
        <van-image src="/payZ.JPG"></van-image>
      </van-collapse-item>
      <van-collapse-item title="SWUST 二次元最速传说と绝凶の猛虎！">
        <van-switch v-model="status" @update:model-value="recordInfo"/>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>

import {UPDATE_LOG, OPEN_SOURCE, PRIVACY_POLICY} from "@/common/doc";
import {showConfirmDialog, showLoadingToast, showSuccessToast} from "vant";
import {deleteLocalCourse} from "@/api/getCourse";

export default {
  name: "aboutUs",
  data() {
    return {
      activeNames: ["1", "2", "3", "5", "6"],
      openSource: OPEN_SOURCE,
      updateLog: UPDATE_LOG,
      privacy: PRIVACY_POLICY,
      status: localStorage.getItem('ACG_MODE') === 'true'
    }
  },
  methods: {
    goBack: function () {
      this.$router.push("/");
    },
    clearLocalCache: function () {
      localStorage.removeItem("lessons");
      localStorage.removeItem("raw");
      showSuccessToast("清除成功");
    },
    clearCloudCache: function () {
      showLoadingToast({
        message: '清除中...',
        forbidClick: true,
      });
      deleteLocalCourse().then((response) => {
        if (response.data.success) {
          showSuccessToast("清除成功");
        } else {
          showSuccessToast("清除失败");
        }
      });
    },
    recordInfo: async function (status) {
      if (status) {
        const data = await showConfirmDialog({
          title: '警告',
          message: '真的真的要打开吗？',
        }).then(() => 'true').catch(() => 'false')
        localStorage.setItem('ACG_MODE', data)
      } else {
        localStorage.setItem('ACG_MODE', 'false')
      }

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
