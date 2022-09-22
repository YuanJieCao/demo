<template>
  <!--  一块画布-->
  <svg width="200" height="200">
    <PolyGraph :stats="stats"></PolyGraph>
  </svg>

  <div v-for="stat in stats">
    <label for="svg">{{ stat.label }}</label>
    <input id="svg" type="range" v-model="stat.value" min="0" max="100">
    <span>{{ stat.value }}</span>
    <button @click="remove(stat)">删除</button>
  </div>
  <form id="add">
    <input name="newlabel" v-model="newLabel">
    <button @click="add">Add a Stat</button>
  </form>

  <pre id="raw">{{ stats }}</pre>
</template>
<script setup lang="ts">
import PolyGraph from "../components/PolyGraph.vue"
import {ref, reactive} from "vue";

//点击增加，先组织默认的行为
function add(e) {
  e.preventDefault()
  if (!newLabel.value) return
  stats.push({
    label: newLabel.value,
    value: 100
  })
  newLabel.value = ''
}

const newLabel = ref("")
const stats = reactive(
    [{label: 'A', value: 100},
      {label: 'B', value: 100},
      {label: 'C', value: 100},
      {label: 'D', value: 100},
      {label: 'E', value: 100},
      {label: 'F', value: 100}
    ]
)
const remove = (stats) => {
  if (stats.length > 3) {
    stats.splice(stats.indexOf(stat), 1)
  } else {
    alert("Can't delete more!")
  }
}

</script>
<style lang="scss">
polygon {
  fill: #42b983;
  opacity: 0.75;
}

circle {
  fill: transparent;
  stroke: #999;
}

text {
  font-size: 10px;
  fill: #666;
}

label {
  display: inline-block;
  margin-left: 10px;
  width: 20px;
}

//
#raw {
  position: absolute;
  top: 0;
  left: 300px;
}
</style>