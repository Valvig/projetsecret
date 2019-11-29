<template>
  <div>
    <div v-if="show">
      <following-list :streamers="streamers"></following-list>
    </div>
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
