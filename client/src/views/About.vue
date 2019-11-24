<template>
  <div>
    <h1>Bonjour {{ id }}</h1>

    <!-- <v-card class="d-inline-block mx-auto">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="6">
            <v-img
              height="200"
              width="200"
              src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
            ></v-img>
          </v-col>
  
          <v-col
            cols="6"
            class="text-center pl-0"
          >
            <v-row
              class="flex-column ma-0 fill-height"
              justify="center"
            >
              <v-col class="px-0">
                <p>LES SOYEUX</p>
              </v-col>
  
              <v-col class="px-0">
                <p>2500 followers</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    
    <ul id="example-1">
      <li 
        v-for="inf in info"
        :key="inf.id"
      >
        <v-card
          class="mx-auto"
          max-width="434"
          tile
        >
          <v-img
            height="100%"
            src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
          >
            <v-row
              align="end"
              class="fill-height"
            >
              <v-col
                align-self="start"
                class="pa-0"
                cols="12"
              >
                <v-avatar
                  class="profile"
                  color="grey"
                  size="164"
                  tile
                >
                  <v-img :src="inf.img"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item
                  color="rgba(0, 0, 0, .4)"
                  dark
                >
                  <v-list-item-content>
                    <v-list-item-title class="title">{{ inf.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ inf.followersNb }} followers</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </li>
    </ul> -->

    <v-btn
      class="ma-2"
      color="secondary" 
      v-on:click="test"
    >
      Test
    </v-btn>

    <following-list :streamers="streamers"></following-list>
  </div>
  
</template>

<script>
import Axios from 'axios'

import FollowingList from '@/components/FollowingList'

export default {
  name: 'about',
  components: {
    FollowingList
  },
  data () {
    return {
      id: '',
      streamers: null
    }
  },
  methods: {
    test () {
      // eslint-disable-next-line
      Axios
      .get('http://localhost:8081/test/' + this.id)
      .then(response => (this.streamers = response.data))
    },
  },
  mounted: function () {
    if (window.$cookies.isKey('userId')) {
      this.id = window.$cookies.get('userId')
    } else {
      this.$router.push('Home') 
    }
  }
}
</script>
