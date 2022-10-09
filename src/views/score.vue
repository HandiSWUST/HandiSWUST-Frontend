<template>
<div id="score" >
  <van-nav-bar
      title="成绩"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />

  <van-row v-show="!ifLoading">
    <van-col span="12">
      <van-cell-group inset title="GPA">
        <van-cell title="必修课绩点" :value="required" />
        <van-cell title="总绩点" :value="all"/>
      </van-cell-group>
    </van-col>
  </van-row>


  <van-row>
    <van-col span="24">

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
import {Toast} from "vant";
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
    this.getScore();
    this.getGPA();
  },
  components:{TableVant},
  name: "score",
  methods:{
    getGPA(){
      axios.defaults.withCredentials = true;
      return axios({
        url: BASE_URL+"/api/gpa",
        method: "get",
        withCredentials: true,
      }).then((resp)=>{
        if(resp.data=="3401 LOGOUT")
        {
          Toast.fail("未登录");
          this.$router.push("/login");
        }else{
          var parse = JSON.parse(resp.data);
          var parse1 = JSON.parse(parse.body.result);
          console.log(parse1)
          this.required=parse1.gpa.required;
          this.all=parse1.gpa.all;


        }

      });

    },

    getScore() {
      axios.defaults.withCredentials = true;
      return axios({
        url: BASE_URL+"/api/scores",
        method: "get",
        withCredentials: true,
      }).then((resp)=>{
        if(resp.data=="3401 LOGOUT")
        {
          Toast.fail("未登录");
          this.$router.push("/login");
        }else{
          console.log(resp.data)
          this.ifLoading=false;
          this.tableData = resp.data;

        }

      });
    }
  },

  data() {
    return {
      tableData:{},
      terms:[],
      ifLoading:true,
      required:0,
      all:0,

      //th
      option: {
        column: [
          {
            label: '课程名称',
            tableDataprop: 'course',
          },
          {
            label: '学分',
            tableDataprop: 'credit'
          },
          {
            label: '课程性质',
            tableDataprop: 'catalog'
          },
          {
            label: '正考',
            tableDataprop: 'scroll'
          }
        ]
      },
    }

  },


}
</script>
<style scoped>
#score{

  background-color: #f2f2f2;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
#loading{
  vertical-align: top;
  align-items: center;

  /* top:50% */

}
</style>