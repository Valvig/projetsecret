<template>
  <div class="home">
    <h1>HOME</h1>
    <div v-if="logged">
      Bienvenue {{name}}
    </div>
    <div v-else>
      <p>Merci de vous connecter avec me bouton suivant : </p>
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
import Auth from '@/services/Auth'

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
  methods: {
    async test () {
      const response = await Auth.test()
      /* eslint-disable no-console */
      console.log(response.data)
    },
    async followers () {
      const response = await Auth.followers()
      /* eslint-disable no-console */
      console.log(response.data)
    },
    async flush () {
      const response = await Auth.flush()
      /* eslint-disable no-console */
      console.log(response.data)
    },
    async getUserFollows () {
      const response = await Auth.userFollows(this.id)
      /* eslint-disable no-console */
      for (var i =0 ; i < response.data.length ; i++){
        const follow = await Auth.getStreamer(response.data[i].streamers_id)
        this.followsArray.push(follow.data[0].name)
      }
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
