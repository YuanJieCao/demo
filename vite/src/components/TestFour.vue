<template>
  <div class="container">
    <div class="header">
      <input class="textInput" type="text" v-model="prefix" placeholder="Filter prefix">
      <select size="5" v-model="selected">
        <option v-for="name in filterName" :key="name">
          {{ name }}
        </option>
      </select>
    </div>
    <div class="main">
      <label for="Name"> Name:</label>

      <input type="text" id="Name" v-model="first">


      <label for="Surname"> Surname:</label>

      <input type="text" id="Surname" v-model="last">

    </div>
    <div class="btn">
      <button @click="create">Create</button>
      <button @click="Update">Update</button>
      <button @click="Delete">Delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {computed, reactive, ref, watch} from "vue";

const names = reactive(['email,hans', 'Mustermann,max', 'Tisch,Roman'])
const selected = ref('')
const prefix = ref('')
const first = ref('')
const last = ref('')
const filterName = computed(() =>
    names.filter((n) => n.toLowerCase().startsWith(prefix.value.toLowerCase()))
)
watch(selected, (name) => {
  ;[last.value, first.value] = name.split(",")
})

function create() {
  if (ifVaild()) {
    let str = `${last.value},${first.value}`
    if (names.includes(str)) {
      return alert('重复的字段')
    }
    names.push(str)
    last.value = first.value = ""
  }
}

function Update() {

  if (ifVaild() && selected.value) {
    const index = names.indexOf(selected.value)
    let str = `${last.value},${first.value}`
    names[index] = selected.value = str
  }

}

function Delete() {
  if (ifVaild() && selected.value) {
    const index = names.indexOf(selected.value)
    names.splice(index, 1)
    last.value = first.value = ""
    selected.value = ""
  }
}

//什么时候是false
// "" 0 -0   undefiend null false
function ifVaild() {
  return first.value.trim() && last.value.trim()
}
</script>

<style scoped lang="scss">
.container {
  width: 600px;
  .header{
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .textInput {
    display: block;

  }

  select {
    margin: 10px 0;
    display: block;
  }

  .main {
    & label {
      width: 100px;
      margin-bottom: 10px;
      display: inline-block;
    }
  }

  .btn {
    display: flex;
    justify-content: center;

    button {
      margin: 0 10px;
    }
  }
}

select {

}
</style>