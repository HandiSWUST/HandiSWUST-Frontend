<template>
  <div id="library" class="text-wrapper">
    <van-nav-bar
        title="图书借阅信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />



    <van-row v-show="!ifLoading">

      <van-col span="24">


        <van-collapse v-model="activeNames" >
          <van-collapse-item  title="查看已借阅图书" name="1">
            <ul  >

              <van-cell-group inset >
                <Table-vant :option="option" :tableData="tableData"></Table-vant>
              </van-cell-group>


            </ul>
          </van-collapse-item>
        </van-collapse>

      </van-col>

      <van-col span="24">
        <van-search
            v-model="value"
            show-action
            placeholder="查询书库"
            @search="onSearch"
        >
          <template #action>
            <div @click="onClickButton">搜索</div>
          </template>
        </van-search>
      </van-col>

      <van-col span="24" v-show="!ifLoading2">

        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad(this.value,this.pageHelper++)"
        >
          <van-cell v-for="item in list" :key="item" :title="item.title" value="查看馆藏" :label="item.author" is-link @click="showPopup(item.marcRecNo)">查看馆藏</van-cell>
          <van-popup  v-model:show="show" position="top" :style="{ height: '30%' }" v-html="showLocation"></van-popup>
<!--          <van-cell v-for="item in books" :key="item" :title="item.title" value="查看馆藏" :label="item.author"/>-->
        </van-list>
      </van-col>

    </van-row>
    <div id="loading2">
      <van-loading  v-show="ifLoading2" size="50px"  vertical a>加载中...</van-loading>
    </div>
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
import { ref } from 'vue';
import {queryBooks} from "../api/queryBooks";
import {queryBookLocation} from "../api/queryBookLocation"
export default {
  components:{TableVant},
  setup() {
    const activeNames = ref(['1']);
    const onClickLeft = () => history.back();
    const show = ref(false);
    const value =ref("");


    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);


    const onLoad = (a,b) => {
      setTimeout(() => {
        queryBooks(a,b).then((resp)=>{
          for(let item in resp.data.content){

            list.value.push(resp.data.content[item]);

          }
        });
        // 注意，for循环完成后，一定要立马 this.new_loading = false;
        loading.value = false;
      }, 1000);


       if(b>=10)
      finished.value = true;



    };

    const onCancel = () => Toast('取消');
    return {
      show,
      list,
      value,

      onLoad,
      loading,
      finished,


      onCancel,
      onClickLeft,
      activeNames

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
      books:[],
      pageHelper:2,
      showLocation:"",

      ifLoading2:false,


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
    // onLoad () {
    //   queryBooks(this.value,this.pageHelper).then((resp)=>{
    //     this.list = resp.data.content;
    //
    //     for(let item in resp.data.content){
    //
    //       this.list.push(resp.data.content[item]);
    //
    //     }
    //
    //   })
    //   this.pageHelper++;
    //   this.loading= false;
    //
    // },

    onClickButton(){
      this.ifLoading2=true;
      queryBooks(this.value,1).then((resp)=>{
        this.list=resp.data.content;
        this.ifLoading2=false;
      })
    },
    showPopup(id){

        queryBookLocation(id).then((resp)=>{
          console.log(resp.data);
          this.showLocation = resp.data;
        })
        this.show = true;

    },
    onSearch(){
      queryBooks(this.value,1).then((resp)=>{
        this.books=resp.data.content;
      })


    },

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
.text-wrapper {
  word-break: break-all;
  word-wrap: break-word
}
#library{
  background-color: #f2f2f2;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
#loading2{
  vertical-align: top;
  align-items: center;
  /* top:50% */

}
#loading{
  vertical-align: top;
  align-items: center;

  /* top:50% */

}

</style>