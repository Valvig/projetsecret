<template>
  <span>
    <v-row>
      <v-col cols="12" sm="10" offset-sm="1">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Streamers List</v-toolbar-title>
            <v-spacer></v-spacer>
            <input class="inputBlack" type="text" v-model="searchData">
          </v-toolbar>
          <v-container fluid>
            <v-row>
              <v-card
                class="mx-auto custom-card"
                max-width="400"
                v-for="(streamer,key) in streamers"
                :key="key"
                v-show="getShow(streamer.name)"
                :style="'order:' + key"
                :id="streamer.name"
              >
                <v-img
                  class="white--text align-end"
                  height="300px"
                  width="300px"
                  :src="streamer.img === null ? '' : streamer.img"
                >
                  <v-card-title
                    class="test"
                  >
                    {{streamer.name}}
                  </v-card-title>
                </v-img>
              </v-card>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </span>
</template>

<script>
export default {
  name: 'following-list',
  props: {
    streamers: {
      type: Array,
      required: true
    }
  },
  watch: {
    searchData: function() {
      this.filterByText()
    }
  },
  data () {
    return {
      test: [],
      searchData: '',
      streamersShowOrNot: {}
    }
  },
  methods: {
    filterByText () {
      for (var i = 0 ; i < this.streamers.length ; i++) {
        var tempName = this.streamers[i].name.toLowerCase()

        var stringIsIncludeInStreamer = tempName.includes(this.searchData.toLowerCase())

        if (stringIsIncludeInStreamer === false) {
          this.streamersShowOrNot["\"" + this.streamers[i].name + "\""] = false
        } else {
          this.streamersShowOrNot["\"" + this.streamers[i].name + "\""] = true
        }
      }
    },
    getShow (streamerName) {
      return this.streamersShowOrNot["\"" + streamerName + "\""]
    }
  }, 
  created () {
    this.streamers.forEach(element => {
      this.streamersShowOrNot["\"" + element.name + "\""] = true
    })
  }
}
</script>

<style lang="scss" scoped>
.test {
  background: #000000ab;
}

.custom-card {
  margin: 30px;
  transition-delay: 1s
}

.inputBlack {
  border: 2px solid black;
}
</style>