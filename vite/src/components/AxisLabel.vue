<template>
  <!--  文本-->
  <text :x="point.x" :y="point.y">{{ stat.label }}</text>
</template>

<script setup lang="ts">
import {computed} from "vue"
import {ValueToPoint} from "../utils/util.ts"

const props = defineProps({
  stat: Object,
  index: Number,
  total: Number
})
const point = computed(() =>
    ValueToPoint(+props.stat.value + 10, props.index, props.total)
)
</script>

<style scoped>

</style>