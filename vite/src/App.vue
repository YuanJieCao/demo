<template>
  <nav>
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/todo">TODOLIST</router-link>
    |
    <router-link to="/guiTest">GUI_____TEST</router-link>
  </nav>

  <router-view/>
</template>
<style>
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

nav {
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 50px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
