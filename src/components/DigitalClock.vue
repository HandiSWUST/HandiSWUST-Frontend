<script setup>
  import {ref} from "vue";

  let time = ref("0:00");
  let day = ref("24TH 10月");

  let freshDate = () => {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (hour < 10) {
      hour = "0" + hour.toString();
    } else {
      hour = hour.toString();
    }
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    } else {
      minutes = minutes.toString();
    }
    time.value = hour + ":" + minutes;
    day.value = date.getDate().toString() + "TH " + (date.getMonth() + 1).toString() + "月";
  }
  freshDate();
  setInterval(freshDate, 1000);

</script>

<template>
  <div id="clock-container" class="miku-theme">
    <p id="clock1">北京时间</p>
    <p id="clock2">{{ time }}</p>
    <p id="clock3">{{ day }}</p>
  </div>
</template>

<style scoped>
#clock-container {
  margin-bottom: 10%;
  margin-left: 10%;
  height: 0;
  padding-bottom: 60%;
  width: 85%;
  border-radius: 15px;
  //background-color: white;
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