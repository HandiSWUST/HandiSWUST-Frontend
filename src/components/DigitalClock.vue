<script setup>
import {ref} from "vue";
import dayjs from "dayjs";

const time = ref("0:00");
const day = ref("24TH 10月");

const freshDate = () => {
  time.value = dayjs().format('HH:mm:ss');
  day.value = dayjs().format('MMMM DD, YYYY');
}
freshDate();
setInterval(freshDate, 1000);

</script>

<template>
  <div id="clock-container">
    <p id="clock1">北京时间</p>
    <p id="clock2">{{ time }}</p>
    <p id="clock3">{{ day }}</p>
  </div>
</template>

<style scoped>
#clock-container {
  font-family: 'Smiley Sans Oblique';
  margin-bottom: 10%;
  margin-left: 10%;
  height: 0;
  padding-bottom: 60%;
  width: 85%;
  border-radius: 15px;
  background-color: white;
}

#clock1 {
  margin-left: 10%;
  padding-top: 10%;
  color: #03a9f4;
  font-size: 2.5vw;
}

#clock2 {
  margin-left: 10%;
  color: black;
  font-size: 7vw;
}

#clock3 {
  margin-left: 10%;
  color: rgb(128, 128, 128);
  font-size: 3vw;
}

</style>
