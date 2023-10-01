<template>
  <div id="exam" class="text-wrapper">
    <van-nav-bar
        class="bar"
        title="考试安排"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-row style="margin-top: 2%" v-show="!ifLoading">
      <van-col span="24">
        <ul v-for="(termScore,key,i) in tableData" :key="i">
          <li>
            <van-cell-group inset :title="key">
              <Table-vant :option="option" :tableData="termScore"></Table-vant>
            </van-cell-group>
          </li>
        </ul>

      </van-col>
    </van-row>
    <div id="loading">
      <van-loading v-show="ifLoading" size="50px" vertical a>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import TableVant from "../components/table.vue"
import {closeDialog, showConfirmDialog, showFailToast, showNotify} from "vant";
import {getExam} from "@/api/getExam";


export default {
  inject: ['reload'],
  setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  },
  mounted() {
    // 0点之后自动使用缓存
    if (new Date().getHours() >= 0 && new Date().getHours() < 7) {
      this.useCache();
    } else {
      this.loadExam();
    }
  },
  components: {TableVant},
  name: "exam",
  methods: {
    useCache() {
      let examData = JSON.parse(window.localStorage.getItem("exam"));
      if (examData != null) {
        showNotify({type: 'primary', message: '0点了，自动使用本地缓存'});
        this.tableData = examData;
        this.ifLoading = false;
      }
    },
    loadExam() {
      getExam().then((resp) => {
        if (resp.status === 200) {
          if (resp.data.code === 3401) {
            let beforeClose = (action) => {
              new Promise((resolve) => {
                if (action == "confirm") {
                  closeDialog();
                  let examData = JSON.parse(window.localStorage.getItem("exam"));
                  if (examData != null) {
                    this.tableData = examData;
                    this.ifLoading = false;
                  } else {
                    showFailToast("本地没有缓存哦");
                    this.$router.push("/login");
                  }
                } else {
                  closeDialog();
                  this.$router.push("/login");
                }
              })
            };
            showConfirmDialog({
              message: "未登录，是否尝试使用本地缓存？",
              confirmButtonColor: "#1989fa",
              beforeClose,
            });
          } else if (resp.data.msg === "no data") {
            showFailToast("教务系统当前没有考试安排哦");
          } else if (resp.data.msg === "s" || resp.data.msg === "sys err") {
            let examData = JSON.parse(window.localStorage.getItem("exam"));
            if (examData != null) {
              showFailToast("教务系统寄了或者需要重新登录，使用本地缓存");
              this.tableData = examData;
              this.ifLoading = false;
            } else {
              this.$router.push("/login");
            }
          } else {
            this.ifLoading = false;
            this.tableData = JSON.parse(resp.data.data);
            window.localStorage.setItem("exam", resp.data.data);
          }
        } else {
          let examData = JSON.parse(window.localStorage.getItem("exam"));
          if (examData != null) {
            showFailToast("教务系统寄了或者需要重新登录，使用本地缓存");
            this.tableData = examData;
            console.log(examData)
            this.ifLoading = false;
          } else {
            this.$router.push("/login");
          }
        }
      });
    }
  },

  data() {
    return {
      tableData: {},
      ifLoading: true,
      //th
      option: {
        column: [
          {
            label: '课程',
            tableDataprop: 'name'
          },
          {
            label: '日期',
            tableDataprop: 'date'
          },
          {
            label: '时间',
            tableDataprop: 'timeSpan'
          },
          {
            label: '考场',
            tableDataprop: 'location'
          },
          {
            label: '座次',
            tableDataprop: 'seat'
          }
        ]
      },
    }
  },
}
</script>
<style scoped>
#exam {
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

#loading {
  vertical-align: top;
  align-items: center;
}
</style>
