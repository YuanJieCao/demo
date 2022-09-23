<template>
  <select v-model="flightType">
    <option value="one-way flight">One-way Flight</option>
    <option value="return flight">return flight</option>
  </select>
  <input type="date" v-model="departureDate">
  <input type="date" v-model="returnDate"
         :disabled="!isReturn">
  <button :disabled="!canBook" @click="book">Book</button>
  <p>{{ canBook ? "" : "Return date must be after departure date." }}</p>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const flightType = ref('one-way flight')
const dateToString = (date) => {
  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate())
}
const pad = (n, s = String(n)) => {
  return s.length < 2 ? `0${s}` : s
}
const departureDate = ref(dateToString(new Date()))
const returnDate = ref(departureDate.value)

function stringToDate(str) {
  const [y, m, d] = str.split('-')
  return new Date(+y, m - 1, +d)
}
//如果值是要选择返回机票
const isReturn = computed(() =>
    flightType.value === 'return flight'
)
const canBook = computed(() =>
    !isReturn || stringToDate(returnDate.value) > stringToDate(departureDate.value)
)

function book() {
  alert(
      isReturn.value
          ? `You have booked a return flight leaving on ${departureDate.value} and returning on ${returnDate.value}.`
          : `You have booked a one-way flight leaving on ${departureDate.value}.`
  )
}

</script>

<style scoped lang="scss">
select,
input, button {
  display: block;
  margin: 0.5em;
  font-size: 15px;
}

input[disabled] {
  color: #999999;
}

p {
  color: red;
}
</style>