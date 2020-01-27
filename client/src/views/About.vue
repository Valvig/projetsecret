<template>
  <v-container 
    v-if="show"
    class="aboutContainer"
  >
    <div>
      <Adsense
        data-ad-test>
      </Adsense>
    </div>
    <v-row>
      <v-col
        :cols=12
      >
        <following-list :streamers="streamers"></following-list>
      </v-col>
      <!-- <v-col
        :cols=5
      >
        <stream-vote-list :streamers="streamers"
          class="templateStreamVoteList"
        >
        </stream-vote-list>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import Axios from 'axios'

import FollowingList from '@/components/FollowingList'
// import StreamVoteList from '@/components/StreamVoteList'

export default {
  name: 'about',
  components: {
    FollowingList,
    // StreamVoteList
  },
  data () {
    return {
      id: null,
      show: false,
      streamers: []
    }
  },
  methods: {
    test () {
      Axios
      .get('http://localhost:8081/test/' + this.id)
      .then(response => (
        this.streamers = response.data,
        this.show = true
      ))
    },
  },
  created () {
    if (window.$cookies.isKey('userId')) {
      this.id = window.$cookies.get('userId')
      this.test()
    } else {
      this.$router.push('/') 
    }
  }
}
</script>

<style lang="scss" scoped>
  .aboutContainer {
    max-width: 100%;
  }

  .templateStreamVoteList{
    position: fixed;
  }
</style>
