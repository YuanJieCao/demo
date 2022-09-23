<template>

  <svg @click="onClick">
    <foreignObject x="0" y="40%" width="100%" height="200">
      <p class="tip">
        Click on the canvas to draw a circle. Click on a circle to select it.
        Right-click on the canvas to adjust the radius of the selected circle.
      </p>
    </foreignObject>
    <circle
        v-for="circle in circles"
        :cx="circle.cx"
        :cy="circle.cy"
        :r="circle.r"
        :fill="circle === selected ? '#ccc' : '#fff'"
        @click="selected=circle"
        @contextmenu.prevent="adjust(circle)"
    ></circle>
  </svg>

  <teleport to="body">
    <Translate-com>
      <div class="modal" v-if="adjusting">
        <p>Adjust radius of circle at ({{ selected.cx }}, {{ selected.cy }})</p>
        <input type="range" v-model="selected.r" min="1" max="300">
        <button @click="adjusting=false"> Close</button>
      </div>
    </Translate-com>
  </teleport>

</template>

<script lang="ts" setup>
import {ref} from "vue"

import TranslateCom from "@/components/TranslateCom.vue"

//是否选中


//点击会产生一个圆
//如果点击在园的内部颜色变化 并且会去除掉其他的园的颜色
//鼠标右击会产生一个弹框
const circles = ref([])
const selected = ref()
const adjusting = ref(false)

function adjust(circle) {
  selected.value = circle
  adjusting.value = true
}

function onClick({clientX: x, clientY: y}) {

  console.log(selected.value)
  //如果没有
  if (!selected.value) {
    circles.value.push({
      cx: x,
      cy: y,
      r: 50
    })
  }
}


</script>

<style scoped lang="scss">


svg {
  width: 100vw;
  height: 100vh;
  background-color: #eee;

  .circle {
    stroke: #000;
  }

  .tip {
    overflow-wrap: break-word;
  }
}

.modal {
  position: fixed;
  z-index: 999;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  top: calc(50% - 50px);
  left: calc(50% - 175px);
  width: 350px;
  height: 100px;
  padding: 5px 20px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

</style>