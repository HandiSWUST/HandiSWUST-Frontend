<template>
  <div id="library" >
    <van-nav-bar
        title="图书借阅信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-row>
      <van-col span="24">

        <ul v-show="!ifLoading" >
          <van-cell-group inset title="记得按时还书哦！">
            <Table-vant :option="option" :tableData="tableData"></Table-vant>
          </van-cell-group>
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
import axios from "axios";
import {Toast} from "vant";
import {BASE_URL} from "../common/final";

export default {
  components:{TableVant},
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
      tableData:[],
      terms:[],
      ifLoading:true,


      //th
      option: {
        column: [
          {
            label: '书名',
            tableDataprop: 'bookName'
          },
          {
            label: '借阅日期',
            tableDataprop: 'borrowTime'
          },
          {
            label: '应还日期',
            tableDataprop: 'expire'
          },
          {
            label: '馆藏地',
            tableDataprop: 'location'
          }

        ]
      },
    }

  },
  methods:{

    getLibrary() {
      axios.defaults.withCredentials = true;
      return axios({
        url: BASE_URL+"/api/library",
        method: "get",
        withCredentials: true,
      }).then((resp)=>{
        if(resp.data=="3401 LOGOUT")
        {
          Toast.fail("未登录");
          this.$router.push("/login");
        }

        else{
          if(resp.data.length==0){
            Toast.fail("你还没有未还的书呢");
          }else{
            this.tableData = resp.data;
          }
          this.ifLoading=false;

        }

      });
    }
  },
}
</script>

<style scoped>

</style>