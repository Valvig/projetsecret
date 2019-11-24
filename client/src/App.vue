<template>
  <div id="app">
    <v-app>
      <app-menu></app-menu>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
  import AppMenu from './components/AppMenu'

  export default {
  name: 'app',
  components: {
    AppMenu
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
