<template>
  <div id="score">
    <van-nav-bar
        class="bar"
        style="box-shadow: 0 0 0 0, 0 0 0 0;"
        title="成绩"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        :border="false"
    />
    <van-dropdown-menu
        v-show="!ifLoading"
        active-color="#1989fa"
        style="z-index: 2; border-width: 0"
    >
      <van-dropdown-item v-model="term" :options="option1"/>
    </van-dropdown-menu>
    <van-notice-bar
        color="#1989fa"
        background="#ecf9ff"
        left-icon="volume-o"
        speed="100"
        text=" 补考的成绩同样会显示在页面中哦，大伙只要记得自己补考的是哪几科就行！"
    />
    <div id="loading">
      <van-loading v-if="ifLoading" size="50px" vertical a>加载中...</van-loading>
    </div>
    <van-row v-if="!ifLoading">
      <van-col span="24">
        <van-cell-group inset title="GPA" style="text-align: center">
          <van-circle
              v-model:current-rate="currentRate"
              :rate="required*20"
              :speed="20"
              :text="bixiuText"
              style="margin-right: 15%;"
              stroke-width="70"
          >
          </van-circle>
          <van-circle
              v-model:current-rate="currentRate"
              :rate="all*20"
              :speed="20"
              :text="allText"
              stroke-width="70"
          />
        </van-cell-group>
      </van-col>
    </van-row>


    <van-row v-if="!ifLoading" style="margin-bottom: 2%">
      <van-col span="24">
        <van-cell-group inset :title="term">
          <van-cell v-show="term!=='外语等级考试'">
            <template #title>
              <span class="custom-title">必修课绩点</span>
            </template>
            <template #label>
              <van-tag size="large" type="primary">{{ this.scores[term].scroll }}</van-tag>
            </template>
            <template #value>
              <span class="custom-title">平均学分绩点</span><br>
              <van-tag type="primary">{{ this.scores[term].credit }}</van-tag>
            </template>
          </van-cell>
          <van-cell-group v-for="(score,i) in this.tableData[term]" :key="i">
            <van-cell :title="score.course">
              <template #label>
                <van-tag size="large" type="primary">正考：{{ score.scroll }}</van-tag>
              </template>
              <template #value>
                <span v-show="term!=='外语等级考试'" class="custom-title">{{ score.catalog }}课</span><br>
                <van-tag v-show="term!=='外语等级考试'" plain round type="primary">学分:{{ score.credit }}</van-tag>
              </template>
            </van-cell>
          </van-cell-group>
        </van-cell-group>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import axios from "axios"
import {showFailToast} from "vant";
import {BASE_URL} from "@/common/final"
import {ref} from "vue";
import {setAcgTheme} from "@/js/ThemeUtils";


export default {
  inject: ['reload'],
  setup() {
    const onClickLeft = () => history.back();
    const term = ref("2024-2025-1");
    const option1 = [
      {text: "点击选择学期", value: "2024-2025-1"}
    ];
    fetch(BASE_URL + "/api/v2/extension/scores").then(response => response.json())
        .then(data => {
          option1.pop()
          let d = JSON.parse(data.data)
          console.log(d)
          for (let date in d) {
            if (date == "外语等级考试") option1.push({'text': date, 'value': date})
            else option1.push({'text': date + "学期", 'value': date})
          }
        })
    return {
      onClickLeft,
      option1,
      term
    };
  },
  beforeMount() {
    this.getScore();
  },
  mounted() {
    this.getGPA();
    setAcgTheme(document.querySelector("#score"));
  },
  name: "score",
  methods: {
    getGPA() {
      axios.defaults.withCredentials = true;
      return axios({
        url: BASE_URL + "/api/v2/extension/gpa",
        method: "get",
        withCredentials: true,
      }).then((resp) => {
        if (resp.data.code === 3401) {
          showFailToast("登录过期或未登录");
          this.$router.push("/login");
        } else if (resp.data.code === 3403) {
          showFailToast("学费/书费欠费，请在计划财务处公众号查看详情");
        } else if (resp.data == null || resp.data.status == 500) {
          showFailToast("当前没有成绩和绩点呢,可能是一站式服务大厅崩掉了~");
          this.$router.push("/");
        } else {
          let parse1 = JSON.parse(resp.data.data);
          this.required = parse1.gpa.required;
          this.bixiuText += this.required.toString();
          this.all = parse1.gpa.all;
          this.allText += this.all.toString();
        }
      });

    },

    getScore() {
      axios.defaults.withCredentials = true;
      return axios({
        url: BASE_URL + "/api/v2/extension/scores",
        method: "get",
        withCredentials: true,
      }).then((resp) => {
        if (resp.data.code === 3401) {
          showFailToast("登录过期或未登录");
          this.$router.push("/login");
          this.$router.push("/login");
        } else {
          this.ifLoading = false;
          this.tableData = JSON.parse(resp.data.data);
          for (let date in this.tableData) {
            this.scores[date] = this.tableData[date][this.tableData[date].length - 1]
            if (date == "外语等级考试") continue
            this.tableData[date].pop()
          }
          let term = "0";
          Object.keys(this.tableData).forEach((key) => {
            if (!key.includes("外语等级考试") &&
                Number(key.replaceAll("-", "")) > Number(term.replaceAll("-", ""))) {
                term = key;
            }
          });
          this.term = term;
          console.log(this.scores[this.term])
          console.log(Object.keys(this.tableData))
        }
      });
    }
  },

  data() {
    return {
      gan: "2022-2023-2",
      tableData: {},
      scores: {
        "2022-2023-2": {
          "scroll": null,
          "credit": null
        }
      },
      terms: [],
      ifLoading: true,
      required: 0,
      all: 0,
      currentRate: 0,
      bixiuText: "必修课绩点\n",
      allText: "总绩点\n",
    }

  },


}
</script>
<style scoped>
#score {
  background-color: #f2f2f2;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#loading {
  vertical-align: top;
  align-items: center;
}
</style>
