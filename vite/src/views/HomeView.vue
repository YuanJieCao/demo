<template>
  <div>
    <ul>
      <HelloWorld class="item" :model="treeData"/>
    </ul>

    <button @click="showModal = true">show Modal</button>
    <teleport to="body">
      <!--      事件冒泡-->
      <Modal :show="showModal" @close="showModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </Modal>
    </teleport>


  </div>
  <transition-list></transition-list>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Modal from '@/components/Modal.vue'
import TransitionList from "@/components/TransitionList.vue"

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
    Modal,
    TransitionList
  },
  data() {
    return {
      treeData: {
        name: 'My Tree',
        children: [
          {name: 'hello'},
          {name: 'world'},
          {
            name: 'child folder', children: [
              {
                name: 'child folder',
                children: [{name: 'hello'}, {name: 'world'}]
              },
              {name: 'hello'},
              {name: 'world'},
              {
                name: 'child folder',
                children: [{name: 'hello'}, {name: 'world'}]
              }
            ]
          }
        ]
      },
      showModal: false
    }
  }
});
</script>
<style lang="scss">
div {
  width: 400px;
}
</style>
