<template>
  <div id="lesson" @click="floatWindow">
    <p class="txt">{{ course_name }}</p>
    <p class="txt2">{{ "@" + base_room_name }}</p>
    <van-popup
        v-model:show="show"
        position="bottom"
        :style="{ height: '45%' }"
        closeable
        round
        teleport="#app"
    >
      <p id="cname">{{ course_name }}</p>
      <p id="rname">{{ base_room_name }}</p>
      <p id="weekday"> {{ "星期: " + week_day + " 节次: " + start + "-" + end }}</p>
      <p id="weeks">
        <van-image
            width="5%"
            height="5%"
            src="/week.png"
        />
        {{ week + " Week" }}
      </p>
      <p id="weeks">
        <van-image
            width="5%"
            height="5%"
            src="/teacher.png"
        />
        {{ teacher }}
      </p>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "lesson",
  props: ["course_name", "base_room_name", "week", "teacher", "week_day", "start", "end"],
  data() {
    return {
      show: false,
    }
  },
  methods: {
    floatWindow: function () {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }

    }
  }
}
</script>

<style scoped>
#lesson {
  position: absolute;
  padding: 1% 0.3%;
  height: 15.6%;
  background-color: #588505;
  width: 12.5717%;
  border-radius: 10px;
  margin-right: 0.857%;
  margin-left: 0.857%;
  margin-top: 1%;
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

#cname {
  font-size: 200%;
  padding: 5%;
  padding-top: 7%;
  padding-bottom: 3%;
  color: black;
}

#rname {
  font-size: 130%;
  padding-left: 5%;
  padding-bottom: 1%;
  color: gray;
}

#weeks {
  font-size: 150%;
  padding-left: 5%;
  padding-bottom: 3%;
  color: black;
}

#weekday {
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