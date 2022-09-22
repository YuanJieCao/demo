<template>

  <section class="container">
    <header class="header">
      <h1>TODOS</h1>
      <input type="text"
             placeholder="What needs to be done?"
             autofocus
             @keyup.enter="addTodo">
    </header>
    <section class="main" v-show="todos.length">
      <input type="checkbox" id="toggle-all" class="toggle-all" @change="toggleAll">
      <label for="toggle-all">Mark all as complete</label>
      <!--      选中所有-->
      <ul class="todo-list">
        <li v-for="todo in filteredTodos"
            class="todo"
            :key="todo.id"
        >
          <div class="view">
            <input id="view"
                   class="toggle"
                   v-model="todo.completed"
                   type="checkbox">
            <label @dblclick="editTodo(todo)">

              {{ todo.title }}
            </label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input type="text"
                 v-if="todo===editedTodo"
                 class="edit"
                 v-model="todo.title"
                 @blur="doneEdit(todo)"
                 @keyup.enter="doneEdit(todo)"
                 @keyup.escape="cancelEdit(todo)"
          >
        </li>
      </ul>
    </section>
    <footer class="footer">

    </footer>
  </section>

</template>

<script lang="ts" setup>
import {ref, watchEffect, computed} from "vue"
//相当于一个过滤的对象供使用
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
}

const visibility = ref('all')
//获取localsotrage的值
const filteredTodos = computed(() => filters[visibility.value](todos.value))
//获取值
const remaining = computed(() => filters.active(todos.value).length)

const STORAGE_KEY = 'vue-todomvc'
//将值添加到localStorage

const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})
let beforeEditCache = ''
//
const editedTodo = ref()
const editTodo = (todo) => {
  console.log(todo)
  //将值保存在editTodo
  beforeEditCache = todo.title
  //将值保存在editTodo
  editedTodo.value = todo
}

const doneEdit = (todo) => {
  if (editedTodo.value) {
    editedTodo.value = null
    todo.title = todo.title.trim()
    if (!todo.title) removeTodo(todo)
  }
}
const cancelEdit = (todo) => {
  editedTodo.value = null
  todo.title = beforeEditCache
}

const toggleAll = () => {

}
//再按下回车时
const addTodo = (e) => {
  //拿到值
  const value = e.target.value.trim()
  //
  if (value) {
    todos.value.push({
      id: Date.now(),
      title: value,
      completed: false
    })
    e.target.value = ''
  }
}

const removeTodo = (todo) => {
  todos.value.splice(todos.value.indexOf(todo), 1)
}


</script>

<style scoped lang="scss">

li {
  position: relative;
  list-style: none;

  .destroy:after {
    content: '×';
    display: block;
    height: 100%;
    line-height: 1.1;
  }

  input[type=text] {
    position: absolute;
    top: 0;
    left: 20px;
    border: 0px solid transparent;
    box-shadow: 0px 0px 2px 2px royalblue;

    &:focus {
      border: 0px solid transparent;

      box-shadow: 0px 0px 2px 2px royalblue;

    }

    &:focus lable {
      display: none;
    }
  }

  .toggle {
    text-align: center;
    width: 40px;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    -webkit-appearance: none;
    appearance: none;
  }
}

.edit {

}

.header input::placeholder {
  font-style: italic;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
}

.view {
  display: flex;
  justify-content: start;


  .destroy {
    justify-self: end;
    justify-items: end;
    border: 0px solid transparent;
    background-color: transparent;
    font-size: 16px;
    display: none;
  }
}

.todo:hover .destroy {
  display: block;
}

* {
  box-sizing: border-box;

}

.container {
  margin: 0;


  .header {
    h1 {
      margin: 0;
      font-size: 32px;
      padding: 20px 0;
      background-color: #f3f3f3;
    }

    input {
      width: 100%;
      height: 30px;
      padding: 10px 0px 10px 60px;

      &:focus {
        border: 0px solid transparent;

        box-shadow: 0px 0px 2px 2px royalblue;
        outline: 0;
      }
    }
  }
}


</style>