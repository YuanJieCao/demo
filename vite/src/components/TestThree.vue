<template>


  <!--  一个进度条-->
  <label for="progress">
    Elapsed Time
    <progress id="progress" :value="elapsed /duration"></progress>
  </label>
  <!--  显示的时间-->
  <div>{{ (elapsed / 1000).toFixed(1) }}s</div>
<!--  一个rang 他的值是-->
  <div>
    Duration
    <input type="range" v-model="duration" min="1" max="30000">
    {{ (duration / 1000).toFixed(1) }}s
  </div>
  <div>
    <button @click="elapsed=0">reset</button>
  </div>
</template>

<script lang="ts" setup>
import {ref, onUnmounted} from "vue";

let duration = ref<timeType>(15 * 100)
//泛型接口
type timeType = number

const timer = ref<timeType>(0)
// 接口可以获取到当前页面中与性能相关的信息
let lastTime = performance.now()
const elapsed = ref<timeType>(0)
let handle: number

const update = () => {
  const time = performance.now()
  // console.log(time-lastTime)
  // console.log(duration.value - elapsed.value)
  elapsed.value += Math.min(time - lastTime, duration.value - elapsed.value)
  //
  lastTime = time
  handle = requestAnimationFrame(update)
}

update()
onUnmounted(() => {
  cancelAnimationFrame(handle)
})

</script>

<style scoped lang="scss">
.elapsed-container {
  width: 300px;
}

.elapsed-bar {
  background-color: red;
  height: 10px;
}
</style>