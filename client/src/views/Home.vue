<template>
  <div class="home">
    <h1>HOME</h1>
    <div v-if="logged">
      Bienvenue {{name}}
    </div>
    <div v-else>
      <p>Merci de vous connecter avec le bouton suivant : </p>
      <v-btn
        class="ma-2"
        color="secondary"
        href="http://localhost:8081/auth/twitch"
      >
        Connexion
      </v-btn>
    </div>
    <v-btn
      class="ma-2"
      color="secondary"
      href="http://localhost:8081/flush"
    >
      Flush
    </v-btn>
    <v-btn
      class="ma-2"
      color="secondary"
      href="http://localhost:8081/test"
    >
      Test
    </v-btn>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      name: '',
      image: '',
      id: '',
      logged: false,
      followsArray: []
    }
  },
  mounted: function () {
    if (window.$cookies.isKey('userId')) {
      this.logged = true
      this.id = window.$cookies.get('userId')
      this.name = window.$cookies.get('userName')
      this.image = window.$cookies.get('userProfileImage')
    } else {
      this.logged = false
    }
  }
}
</script>
