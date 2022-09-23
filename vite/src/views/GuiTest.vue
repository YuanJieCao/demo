<template>
  <button @click="status">changeView</button>
  <translate-com>
    <div v-if="View">
      <test-one>

      </test-one>
      <hr>
      <test-two>

      </test-two>
      <hr>
      <test-three>

      </test-three>
      <test-four>

      </test-four>
    </div>
  </translate-com>
  <div>
    <translate-com>
      <div v-if="!View">
        <last-one></last-one>
      </div>
    </translate-com>

  </div>
</template>

<script lang="ts" setup>
import TranslateCom from "@/components/TranslateCom.vue"
import TestOne from "@/components/TestOne.vue"
import TestTwo from "@/components/TestTwo.vue"
import TestThree from "@/components/TestThree.vue"
import TestFour from "@/components/TestFour.vue"
import lastOne from "@/components/lastOne.vue"
import {ref} from "vue";
import LastOne from "@/components/lastOne.vue";

const View = ref(false)
const status = () => (View.value = !View.value)

</script>

<style scoped>

</style>