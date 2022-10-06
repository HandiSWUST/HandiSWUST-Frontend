<template>
  <div id="library" >
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
import axios from "axios";
import {Toast} from "vant";

export default {
  setup() {
    const onClickLeft = () => history.back();

    return {
      onClickLeft,

    };
  },
  name: "library",
  mounted() {
    this.getLibrary();
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
            label: '书名/作者',
            tableDataprop: 'course',
          },
          {
            label: '借阅日期',
            tableDataprop: 'credit'
          },
          {
            label: '应还日期',
            tableDataprop: 'catalog'
          },
          {
            label: '馆藏地',
            tableDataprop: 'scroll'
          }
        ]
      },
    }

  },
  methods:{
    getLibrary(){
      axios.defaults.withCredentials = true;
      return axios({
        url: "/api/library",
        method: "get",
        withCredentials: true,
      }).then((resp)=>{
        if(resp.data=="3401 LOGOUT")
        {
          Toast.fail("未登录");
          this.$router.push("/login");
        }else{
          this.ifLoading=false;

          console.log(resp.data);


        }

      });
    }
  }
}
</script>

<style scoped>

</style>