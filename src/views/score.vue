<template>
<div id="score" >
  <van-nav-bar
      title="成绩"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />

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
  },
  components:{TableVant},
  name: "score",
  methods:{

    getScore() {
      axios.defaults.withCredentials = true;
      return axios({
        url: "/api/scores",
        method: "get",
        withCredentials: true,
      }).then((resp)=>{
        if(resp.data=="3401 LOGOUT")
        {
          Toast.fail("未登录");
          this.$router.push("/login");
        }else{
          this.ifLoading=false;

          if(resp.status===500)Toast.fail(resData.msg);
          else{
            this.tableData = resp.data;
          }
        }

      });
    }
  },

  data() {
    return {
      tableData:{},
      terms:[],
      ifLoading:true,

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
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
#loading{
  vertical-align: center;
  align-items: center;

  top:50%


}
</style>