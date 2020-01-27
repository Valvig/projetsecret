<template class="templateStreamVoteList">
  <v-row
    class="rowList"
  >
    <v-col 
      cols="12" 
      sm="10" 
      offset-sm="1"
    >
      <iframe 
        :src="'https://player.twitch.tv/?channel=' + channelVote1 " 
        frameborder="0" 
        allowfullscreen="true" 
        scrolling="no"
        class="twitchArea"
      >
      </iframe>
    </v-col>
    <v-col 
      cols="12" 
      sm="10" 
      offset-sm="1"
    >
      <iframe 
        :src="'https://player.twitch.tv/?channel=' + channelVote2 " 
        frameborder="0" 
        allowfullscreen="true" 
        scrolling="no"
        class="twitchArea"
      >
      </iframe>
    </v-col>
    <v-col 
      cols="12" 
      sm="10" 
      offset-sm="1"
    >
      <iframe 
        :src="'https://player.twitch.tv/?channel=' + channelVote3 " 
        frameborder="0" 
        allowfullscreen="true" 
        scrolling="no"
        class="twitchArea"
      >
      </iframe>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'stream-vote-list',
  data () {
    return {
      channelVote1 : 'LesSoyeux',
      channelVote2 : 'Zerator',
      channelVote3 : 'Woytzebuerg'
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  .rowList{
    height: 90vh;
  }

  .twitchArea{
    width: 100%;
    height: 100%;
  }
</style>