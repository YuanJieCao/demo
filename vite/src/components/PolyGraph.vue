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

const props = defineProps(
    {stats: Array}
)
//对这个数据进行处理
const points = computed(() => {
  const total = props.stats.length
  return props.stats
      .map((stat, i) => {
        const { x, y } = ValueToPoint(stat.value, i, total)
        return `${x},${y}`
      })
      .join(' ')
})
</script>

<style scoped>

</style>