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
      <input
          :checked="remaining === 0"
          type="checkbox" id="toggle-all" class="toggle-all" @change="toggleAll">
      <label for="toggle-all">Mark all as complete</label>
      <!--      选中所有-->
      <ul class="todo-list">
        <li v-for="todo in filteredTodos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed,
            editing: todo === editedTodo }"
        >
          <div class="view">
            <input
                id="view"
                class="toggle"
                v-model="todo.completed"
                type="checkbox">


            <label @dblclick="editTodo(todo)"
            >
              {{ todo.title }}
            </label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input type="text"
                 @vnode-mounted="({ el }) => el.focus()"
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
    <footer class="footer" v-show="todos.length">
      <span><strong>{{ remaining }}</strong>
        <span>{{
            remaining === 1 ? "item" : "items"
          }} left</span>
      </span>
      <ul class="footer">
        <li>
          <a href="#/all" :class="{selected:visibility==='all'}">All</a>
        </li>
        <li>
          <a href="#/active" :class="{selected:visibility==='active'}">active</a>
        </li>
        <li>
          <a href="#/completed"
             :class="{selected:visibility==='completed'}"
          >Completed</a>
        </li>
      </ul>
      <button
          @click="removeCompleted"
          v-show="todos.length>remaining"
      >Clear completed
      </button>

    </footer>
  </section>

</template>

<script lang="ts" setup>
import {ref, watchEffect, computed} from "vue"
import {lastIndexOf} from "lodash-es";
//相当于一个过滤的对象供使用


const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
}

function clearCompleted() {

}

function toggleAll(e) {
  console.log(e.target.checked)
  todos.value.forEach((todo) => {

    (todo.completed = e.target.checked)
  })
}


//删选的条件
const visibility = ref('all')
// 获取localsotrage的值
const filteredTodos = computed(() => filters[visibility.value](todos.value))
//获取活跃的值
const remaining = computed(() => filters.active(todos.value).length)

const STORAGE_KEY = 'vue-todomvc'
//将值添加到localStorage
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
//监听这个值得变化
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})

function onHashChange() {
  //取得当前网页的路由，将#变成' '
  const route = window.location.hash.replace(/#\/?/, '')
  if (filters[route]) {
    visibility.value = route
  } else {
    window.location.hash = "all"
  }
}

window.addEventListener("hashchange", onHashChange)
onHashChange()

let beforeEditCache = ''
//
const editedTodo = ref()
//在你进行编辑时
const editTodo = (todo) => {
  //将值保存在editTodo
  beforeEditCache = todo.title
  //将值保存在editTodo
  editedTodo.value = todo
}
//完成编辑
const doneEdit = (todo) => {
  if (editedTodo.value) {
    editedTodo.value = null
    todo.title = todo.title.trim()
    if (!todo.title) removeTodo(todo)
  }
}
//在你点击esc的时候取消
const cancelEdit = (todo) => {
  editedTodo.value = null
  todo.title = beforeEditCache
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
//移除当前的节点
const removeTodo = (todo) => {
  todos.value.splice(todos.value.indexOf(todo), 1)
}

function removeCompleted() {
  todos.value = filters.active(todos.value)
}

</script>

<style scoped lang="scss">
#view + label {
  width: 300px;
  overflow-wrap: break-word;
}

//.todo-list li.editing {
//  border-bottom: none;
//  padding: 0;
//}
//
//.todo-list li.editing .edit {
//  display: block;
//  width: calc(100% - 43px);
//  padding: 12px 16px;
//  margin: 0 0 0 43px;
//}
//
//.todo-list li.editing .view {
//  display: none;
//}
//.new-todo,
//.edit {
//  position: relative;
//  margin: 0;
//  width: 100%;
//  font-size: 24px;
//  font-family: inherit;
//  font-weight: inherit;
//  line-height: 1.4em;
//  color: inherit;
//  padding: 6px;
//  border: 1px solid #999;
//  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
//  box-sizing: border-box;
//  -webkit-font-smoothing: antialiased;
//  -moz-osx-font-smoothing: grayscale;
//}
.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
  //首先他是一个单选框
  .toggle-all {
    width: 1px;
    height: 1px;
    border: none; /* Mobile Safari */
    opacity: 11;
    position: absolute;
    right: 100%;
    bottom: 100%;
  }

  .toggle-all + label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 65px;
    font-size: 0;
    position: absolute;
    top: -50px;
    left: -0;
  }

  .toggle-all + label:before {
    content: '❯';
    display: inline-block;
    font-size: 22px;
    color: #949494;
    padding: 10px 27px 10px 27px;
    //-webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .toggle-all:checked + label:before {
    color: #484848;
  }
}

li {
  position: relative;
  list-style: none;

  label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
    font-weight: 400;
    color: #484848;
  }

  //.edit {
  //  display: none;
  //}


  .editing .edit {
    display: block;
    width: calc(100% - 43px);
    padding: 12px 16px;
    margin: 0 0 0 43px;
  }

  .destroy {
    background-color: transparent;
    position: absolute;
    right: 10px;
    border: 0;
    display: none;
    color: #949494;
    transition: color 0.2s ease-out;

    &:hover, &:focus {
      color: #42b983;
    }
  }


  .destroy:after {

    margin-top: 10px;
    content: '×';
    font-size: 24px;
    display: inline-block;
    height: 100%;
    line-height: 1.1;
  }

  &:hover .destroy {
    display: block;
  }

  .toggle {
    text-align: center;
    width: 40px;
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none; /* Mobile Safari */
    -webkit-appearance: none;
    appearance: none;
  }

  // 添加背景图片
  .toggle + label {
    //设置背景图片的位置
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center left;
  }

  //添加被选中时的背景
  .toggle:checked + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
  }

  //label {
  //  //防止溢出给他换行
  //  overflow-wrap: break-word;
  //  padding: 15px 15px 15px 60px;
  //  display: block;
  //  line-height: 1.2;
  //  transition: color 0.4s;
  //  font-weight: 400;
  //  color: #949494;
  //}

  .completed label {
    color: #ac2e2e;
    text-decoration: line-through;
  }

  input[type=text] {
    position: absolute;
    top: 8px;
    left: 60px;
    height: 30px;
    width: 100%;
    border: 0px solid transparent;
    box-shadow: 0px 0px 2px 2px royalblue;

    &:focus {
      border: 0px solid transparent;
      box-shadow: 0px 0px 2px 2px royalblue;
    }
  }
}

.footer {
  display: flex;

  .selected {
    border: 1px solid darkolivegreen;
    padding: 5px;
    transition: 0.5s ease-out;
    box-shadow: 0 0 2px 2px;
  }

  ul {
    li {
      padding: 5px;
      text-decoration: none;

      &:hover {
        border: 1px solid darkolivegreen;
        //transition: 0.5s ease-out;
        box-shadow: 0 0 2px 2px;
      }
    }
  }

  button {
    display: inline-flex; /* keep the inline nature of buttons */
    align-items: flex-start;
    background-color: transparent;
    border: 0;

    &:hover {
      text-decoration: underline;
      text-underline: #42b983;
    }
  }

}

.header input::placeholder {
  font-style: italic;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
}

.view {
  display: flex;
  justify-content: start;


}


* {
  box-sizing: border-box;

}

.container {
  margin: 0;
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;

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