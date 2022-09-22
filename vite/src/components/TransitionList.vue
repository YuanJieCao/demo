<template>

  <div>
    <button @click="insert">insert at random index</button>
    <button @click="reset">reset</button>
    <button @click="shuffle">shuffle</button>
  </div>

  <TransitionGroup tag="ul" name="flag" class="container">
    <div v-for="item in items" class="item" :key="item">
      {{ item }}
      <button @click="remove(item)">x</button>
    </div>
  </TransitionGroup>


  <hr>
  <button @click="troggle">圆球消失述</button>

  <!--  也可以自定义class apper某个节点初次渲染时应用一个过度效果-->
  <Transition name="fade"

              appear

              :duration="{enter:500,leave:800}">
    <p v-if="showOrHidden">
      <svg width="200" height="200">
        <circle cx="100" cy="100" r="80"></circle>
      </svg>
      <span class="inner">小圆球</span>
    </p>
  </Transition>


  <Transition name="slide-up" mode="out-in">
    <button @click="docState='edited'" v-if="docState === 'saved'">Edit</button>
    <button @click="docState='editing'" v-else-if="docState === 'edited'">Save</button>
    <button @click="docState='saved'" v-else-if="docState === 'editing'">Cancel</button>
  </Transition>


</template>


<script setup lang="ts">
import {shuffle as _shuffle} from 'lodash-es'
import {ref} from 'vue'
//排序算法

const getInitialItems = () => [1, 2, 3, 4, 5]
const items = ref(getInitialItems())

//
const remove = (item) => {
  const i = items.value.indexOf(item)
  if (i > -1) {
    items.value.splice(i, 1)
  }
}
let id = items.value.length + 1

const docState = ref("saved")


const showOrHidden = ref(true)
const insert = () => {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 0, id++)
}
const reset = () => {
  items.value = [1, 2, 3, 4, 5]
}
const shuffle = () => {
  items.value = _shuffle(items.value)

}
const troggle = () => showOrHidden.value = !showOrHidden.value


// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el) {
  console.log(1)
}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  console.log(2)
  done()
}

// 当进入过渡完成时调用。
function onAfterEnter(el) {
  console.log(3)
}

function onEnterCancelled(el) {
  console.log(4)
}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) {
  console.log(5)
}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) {
}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) {
}


</script>

<style scoped lang="scss">


@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);

  }
  100% {
    transform: scale(1);

  }
}

circle {
  fill: #42b983;
  opacity: 0.75;
}

.fade-enter-from {
  opacity: 0;
}

//进入或者离开的过程
.fade-enter-active {
  //transition: opacity 0.5s ease;
  animation: bounce-in 0.5s;
}

.fade-enter-to {
}

//
.fade-leave-from {

}

//中间间隔
.fade-leave-active {
  //transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  animation: bounce-in 0.5s reverse;
}

//当出现嵌套的时候出现的是符合逻辑的
//在嵌套的过度中，


.fade-enter-active .inner,
.fade-leave-active .inner {
  transition: all 0.3s ease-in-out;
  transition-delay: 2s;
}

.fade-enter-from .inner,
.fade-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

//在离开的时候刚刚开始透明度是0
.fade-leave-to {
  //opacity: 0;
}

.btn-container {
  display: inline-block;
  position: relative;
  height: 1em;
}


.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}




.container {
  position: relative;
  padding: 0;
}

.item {
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  border: 1px solid #666;
  box-sizing: border-box;
}

//申明过度的效果

.flag-move,
.flag-enter-active,
.flag-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.flag-enter-from, .flag-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px 0);
}
.flag-leave-active {
  position: absolute;
}

</style>