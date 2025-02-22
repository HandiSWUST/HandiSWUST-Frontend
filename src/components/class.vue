<template>
  <div class="lesson" @click="floatWindow" ref="lessonRoot">
    <p class="txt">{{ course_name }}</p>
    <p class="txt2">{{ "@" + base_room_name }}</p>
    <van-popup
        v-model:show="show"
        position="bottom"
        :style="{ height: '45%', backdropFilter: 'blur(2px)' }"
        closeable
        round
        teleport="#app"
    >
      <p class="cname">{{ course_name }}</p>
      <p class="rname">{{ base_room_name }}</p>
      <p class="weekday"> {{ "星期: " + week_day + " 节次: " + start + "-" + end }}</p>
      <p class="weeks">
        <van-image
            width="5%"
            height="5%"
            src="/week.png"
        />
        {{ week + " Week" }}
      </p>
      <p class="weeks">
        <van-image
            width="5%"
            height="5%"
            src="/teacher.png"
        />
        {{ teacher }}
      </p>
      <p class="weeks">
        <van-image
            width="5%"
            height="5%"
            src="/course_code.png"
        />
        {{ course_code }}
      </p>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "lesson",
  props: ["course_name", "base_room_name", "week", "teacher", "week_day", "start", "end", "course_code", "acgMode", "blur"],
  mounted() {
    let style = this.$refs.lessonRoot.style;
    style.cssText += `top: ${this.computeTop(this.start)}; left: ${this.computeLeft(this.week_day)}; background-color: ${this.randomColor(this.start + this.week_day)}`;
  },
  data() {
    return {
      show: false,
      colors: ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#795548", "#607d8b"]
    }
  },
  methods: {
    floatWindow: function () {
      this.show = !this.show;
    },
    // 计算课程方块的位置
    computeTop: function (num) {
      return ((num - 1) * 8.3).toString() + "%";
    },
    computeLeft: function (num) {
      return ((num - 1) * 14.2857).toString() + "%";
    },

    // 随机课程方块的颜色
    randomColor: function (num) {
      let color = this.colors[num % this.colors.length];
      if (this.acgMode) {
        color = color + Math.floor(0.7 * 255).toString(16);
        if (this.blur) {
          this.$nextTick(() => this.$refs.lessonRoot.style.cssText += "backdrop-filter: blur(2px); transform: translateZ(0);");
        }
      }
      return color;
    }
  }
}
</script>

<style scoped>
.lesson {
  position: absolute;
  padding: 1% 0.3%;
  height: 16.1%;
  background-color: #588505;
  width: 11.75vw;
  border-radius: 8px;
  margin-top: 0.5%;
}

.txt {
  color: white;
  text-align: center;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 80%;
}

.txt2 {
  color: white;
  text-align: center;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 80%;
}

.cname {
  font-size: 200%;
  padding: 5%;
  padding-top: 7%;
  padding-bottom: 3%;
  color: black;
}

.rname {
  font-size: 130%;
  padding-left: 5%;
  padding-bottom: 1%;
  color: rgb(128, 128, 128);
}

.weeks {
  font-size: 150%;
  padding-left: 5%;
  padding-bottom: 3%;
  color: black;
}

.weekday {
  background-color: #39C5BB;
  font-size: 100%;
  margin-left: 5%;
  margin-bottom: 6%;
  color: white;
  padding-left: 1%;
  padding-right: 1%;
  border-radius: 20px;
  width: fit-content;
  white-space: nowrap;
}
</style>