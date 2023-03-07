<template>
  <div id="exam" class="text-wrapper" >
    <van-nav-bar
        id="bar"
        title="考试安排"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-row style="margin-top: 2%" v-show="!ifLoading">
      <van-col span="24">
<!--            <van-cell-group  inset  style="margin-top: 2%">-->
<!--              <Table-vant :option="option" :tableData="tableData"></Table-vant>-->
<!--            </van-cell-group>-->
        <ul v-for="(termScore,key,i) in tableData" :key="i" >
          <li>
            <van-cell-group inset :title="key" >
              <Table-vant :option="option" :tableData="termScore"></Table-vant>
            </van-cell-group>
          </li>
        </ul>

      </van-col>
    </van-row>
    <div id="loading">
      <van-loading  v-show="ifLoading" size="50px"  vertical a>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import TableVant from "../components/table.vue"
import axios from "axios"
import {Dialog, Notify, Toast} from "vant";
import { BASE_URL } from "../common/final.js"




export default {
  inject:['reload'],
  setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  },
  mounted () {
    // 0点之后自动使用缓存
    if (new Date().getHours() >= 0 && new Date().getHours() <= 7) {
      this.useCache();
    } else {
      this.getExam();
    }
  },
  components:{TableVant},
  name: "exam",
  methods:{
    useCache() {
      let examData = JSON.parse(window.localStorage.getItem("exam"));
      if (examData != null) {
        Notify({type: 'primary', message: '0点了，自动使用本地缓存'});
        this.tableData = examData;
        this.ifLoading = false;
      }
    },
    getExam() {
      axios.defaults.withCredentials = true;
      return axios({
        url: BASE_URL+"/api/v2/extension/getExam",
        method: "get",
        withCredentials: true
      }).then((resp)=>{
        if(resp.status === 200) {
          if(resp.data.code === 3401)
          {
            let beforeClose = (action) => {
              new Promise((resolve) => {
                if (action == "confirm") {
                  Dialog.close();
                  let examData = JSON.parse(window.localStorage.getItem("exam"));
                  if (examData != null) {
                    this.tableData = examData;
                    this.ifLoading = false;
                  } else {
                    Toast.fail("本地没有缓存哦");
                    this.$router.push("/login");
                  }
                } else {
                  Dialog.close();
                  this.$router.push("/login");
                }
              })
            };
            Dialog.confirm({
              message: "未登录，是否尝试使用本地缓存？",
              confirmButtonColor: "#1989fa",
              beforeClose,
            });
          } else if(resp.data.msg === "no data"){
            Toast.fail("教务系统当前没有考试安排哦");
          } else if(resp.data.msg === "s") {
            let examData = JSON.parse(window.localStorage.getItem("exam"));
            if (examData != null) {
              Toast.fail("教务系统寄了或者需要重新登录，使用本地缓存");
              this.tableData = examData;
              this.ifLoading=false;
            } else {
              this.$router.push("/login");
            }
          }
          else{
            this.ifLoading=false;
            this.tableData = resp.data;
            window.localStorage.setItem("exam", JSON.stringify(resp.data));
          }


        } else {
          let examData = JSON.parse(window.localStorage.getItem("exam"));
          if (examData != null) {
            Toast.fail("教务系统寄了或者需要重新登录，使用本地缓存");
            this.tableData = examData;
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
      tableData:{},
      ifLoading:true,
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
          },
          // {
          //   label: '地点',
          //   tableDataprop: 'certainLocation'
          // },
        ]
      },
    }

  },


}
</script>
<style scoped>
#exam{
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
#loading{
  vertical-align: top;
  align-items: center;

  /* top:50% */

}
#bar {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05), 0 2px 6px 0 rgba(0, 0, 0, 0.05);
}
</style>