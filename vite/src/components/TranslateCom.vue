<template>
  <!-- 组件接收值 -->
  <Transition
      @enter="onEnter"
      @leave="onleave"

      name="bounce">
    <slot></slot>
  </Transition>
  <!--  enter-active-class="animate__animated animate__tada"-->
  <!--  leave-active-class="animate__animated animate__bounceOutRight"-->
</template>

<script lang="ts" setup>

const props = defineProps({})
const onEnter = () => {

}
const onleave = () => {

}
</script>

<style lang="scss">
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

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
</style>