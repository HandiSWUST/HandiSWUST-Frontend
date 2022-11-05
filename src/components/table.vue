<template>
  <div class="vant-table">
    <table cellspacing="0" :style="bgcolor" style="width:100%" class="table">
      <tr>
        <th class="th" v-for="(item, index) in option.column" :key="index">{{ item.label }}</th>
      </tr>
      <tr v-for="(item, index) in tableData" :key="index" class="list-tr">
        <td v-for="(context, i) in option.column" :key="i">{{ item[context.tableDataprop] }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name:'TableVant',
  props:{
    bgcolor:{
      type: Object,
      default: {}
    },
    tableData:{
      type: Array,
      default: []
    },
    option:{
      type: Object,
      default: {}
    }
  },
  created() {}
};
</script>

<style  scoped>

.table {
  border-radius: .185185rem;

}
.th {
  height: 1.074074rem;
  line-height: 0.94074rem;
  background-color: #ffffff;
  text-align: center;
}
.list-tr {
  height: 1.074074rem;
  line-height: 1.074074rem;
}
.list-tr:nth-child(2n) {
  /*background-color: #33333b;*/
}
td {
  text-align: center;
  padding: 4px;
}
</style>
