<template>
  <li>
    <!--        attr的变化-->

    <div
        :class="{bold:isFolder}"
        @click="toggle"
        @dblclick="changeType"
    >
      {{ model.name }}
      <span v-if="isFolder">
        [{{ isOpen ? '-' : '+' }}]
      </span>
    </div>
    <!--      是否是打开的，如果是打开就是显示，如果false不显示-->
    <ul v-show="isOpen" v-if="isFolder">
      <!--        一个可以通过其-->
      <HelloWorld clas="item" v-for="model in model.children" :model="model">

      </HelloWorld>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<!--数据类型  是name chilren-->
<script lang="ts" setup>

import {ref, computed} from "vue"
//在settup 中 接收一个对象
const props = defineProps({
  model: Object
})
const isFolder = computed(() => {
  // 当前的model是否有孩子，在判断他的长度 true or false
  return props.model.children && props.model.children.length
})
const isOpen = ref(false)
const toggle = () => {
  isOpen.value = !isOpen.value
}


const changeType = () => {
//双击如果没有孩子就是可以点击
  if (!isFolder.value) {
    props.model.children = []
    addChild()
    isOpen.value = true
  }
}
const addChild = () => {
  props.model.children.push({name: 'new stuff'})
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
  cursor: pointer;
  line-height: 1.5;
}

.bold {
  font-weight: bold;
}
</style>
