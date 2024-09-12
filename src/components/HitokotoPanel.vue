<script setup>
import {ref} from "vue";
import {hitokoto} from "@/api/hitokotoApi";
import {debounce} from "lodash";

const sentence = ref(localStorage.getItem('Hitokoto') ?? "世上本没有路，走的人多了也便成了路");
const fresh = debounce(() => {
  console.log(window.hitokotoValid)
  hitokoto("", "json").then((resp) => {
    sentence.value = `${resp.hitokoto}    \n —— ${resp.from}  ${resp.from_who ?? ''}`;
    localStorage.setItem('Hitokoto', sentence.value);
    window.hitokotoValid = true;
  });
}, 677)
if (window.hitokotoValid == null) {
  fresh()
}
</script>

<template>
  <div id="hitokoto" @click="fresh">
    <div style="padding-left: 10%; padding-top: 10%; margin-bottom: 5%">
      <van-image
          src="/hitokoto.svg"
          style="width: 15%; float: left"
      />
      <p style="margin-left: 5%; float: left;">一言</p>
    </div>
    <br/>
    <p id="sentence-ct">{{ sentence }}</p>
  </div>
</template>

<style scoped>
#hitokoto {
  font-family: 'Smiley Sans Oblique';
  margin-bottom: 10%;
  height: 0;
  padding-bottom: 90%;
  width: 85%;
  border-radius: 15px;
  margin-right: 10%;
  margin-left: 5%;
  color: black;
  background-color: white;
}

#sentence-ct {
  font-size: small;
  margin-left: 10%;
  margin-right: 10%;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
</style>
