<template>
  <g>
    <polygon :points="points"></polygon>
    <circle cx="100" cy="100" r="80"></circle>
    <axis-label
        v-for="(stat, index) in stats"
        :stat="stat"
        :index="index"
        :total="stats.length"
    >
    </axis-label>
  </g>
</template>

<script setup>
import {computed} from "vue";
import {ValueToPoint} from "../utils/util.ts"
import AxisLabel from "../components/AxisLabel.vue"
//接收值
const props = defineProps(
    {stats: Array}
)
//对数据进行处理，然后返回相应的坐标，连成一个多边形
const points = computed(() => {
  const total = props.stats.length
  return props.stats
      .map((stat, i) => {
        const {x, y} = ValueToPoint(stat.value, i, total)
        return `${x},${y}`
      })
      .join(' ')
})
</script>

<style scoped>

</style>