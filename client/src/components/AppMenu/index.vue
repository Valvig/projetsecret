<template>
  <span>
    <v-toolbar>
      <v-toolbar-title>Projet Secret</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <router-link to="/">
          Home
        </router-link>
        <router-link to="/about">
          Voter
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
  </span>
</template>

<script>

export default {
  name: 'app-menu',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
a {
  color: black !important;
  text-decoration: none;
}
</style>