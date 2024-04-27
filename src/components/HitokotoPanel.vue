<script setup>
  import {ref} from "vue";
  import {hitokoto} from "@/api/hitokotoApi";

  let sentence = ref("世上本没有路，走的人多了也便成了路");
  hitokoto("", "json").then((resp) => {
    let fromWho = resp.from_who;
    if (fromWho == null) {
      fromWho = "";
    }
    sentence.value = resp.hitokoto + "\n ——" + resp.from + " " + fromWho;
  });
</script>

<template>
  <div id="hitokoto" class="miku-theme">
    <div style="padding-left: 10%; padding-top: 10%; margin-bottom: 5%">
      <van-image
          src="/hitokoto.svg"
          style="width: 15%; float: left"
      />
      <p style="margin-left: 5%; float: left;">一言</p>
    </div>
    <br/>
    <p id="sentence">{{ sentence }}</p>
  </div>
</template>

<style scoped>
#hitokoto {
  margin-bottom: 10%;
  height: 0;
  padding-bottom: 90%;
  width: 85%;
  border-radius: 15px;
  margin-right: 10%;
  margin-left: 5%;
  //background-color: white;
}

#sentence {
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