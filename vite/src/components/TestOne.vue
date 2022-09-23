<template>

  <div>


    <input type="number" :value="c" @change="setC"><span>Celsius =</span>


    <input type="number" :value="f" @change="setF"><span>Fahrenheit</span>

  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"

const c = ref(0)
const f = ref(32)
const setC = (e, v = +e.target.value) => {
  c.value = v
  f.value = v * (9 / 5) + 32
}

const SetF = (e, v = +e.target.value) => {
  f.value = v
  c.value = (v - 32) * (5 / 9)
}

</script>

<style scoped lang="scss">
* {
  margin: 0;
  box-sizing: border-box;
}
span{
  display: inline-block;
  width: 100px;
  vertical-align: bottom;
}

input[type=number] {
  padding: 1px 2px;
  background-color: #42b983;
  writing-mode: horizontal-tb !important;

  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  cursor: text;
  margin: 0em;
  border-width: 2px;
  border-style: inset;
  border-image: initial;
}

</style>