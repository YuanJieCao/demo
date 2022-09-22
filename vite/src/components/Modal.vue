<template>
  <Transition name="model">
    <div v-if="show" class="model-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>
          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button
                  class="modal-default-button"
                  @click="$emit('close')"
              >OK
              </button>
            </slot>
          </div>
        </div>
      </div>

    </div>
  </Transition>

</template>

<script setup>
//接收一个值
const props = defineProps({
  show: Boolean
})
</script>

<style scoped lang="scss">
.model-mask{
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:rgba(0, 0, 0, 0.5) ;
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper{
  display: table-cell;
  vertical-align: middle;
}
.modal-container{
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px ;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.33);
  transition: all 0.3s ease;
}
//插槽里面的样式
:slotted( .modal-header h3){
  margin-top: 0;
  color: #42b983;
}


.modal-body {
  margin: 20px 0;
}
.modal-default-button {
  float: right;
}


.model-enter-from {
  opacity: 0;
}

.model-leave-to {
  opacity: 0;
}

.model-enter-from .model-container,
.model-leave-to .model-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

//进入的三个步骤
.model-entry-from {

}



.model-entry-to {

}

//进入的三个步骤
//
//.model-leave-active,.model-entry-active {
//  transition: all 0.3s ease-out;
//}
//
//.model-leave-from, .model-leave-to {
//  transform: translateX(100px);
//  opacity: 0;
//}
</style>