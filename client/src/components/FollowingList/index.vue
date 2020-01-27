<template>
  <div>
    <v-row class="listContainer">
      <v-col cols="12" sm="10" offset-sm="1">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Streamers List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-on:click="sortAtoZ(true)">A à Z</v-btn>
            <v-btn v-on:click="sortAtoZ(false)">Z à A</v-btn>
            <v-btn v-on:click="sortAtoZ('followUp')">follow</v-btn>
            <v-btn v-on:click="sortAtoZ('followDown')">follow Down</v-btn>
            <input class="inputBlack" type="text" v-model="searchData">
          </v-toolbar>
          <v-container fluid class="list">
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
                  height="200px"
                  width="200px"
                  :src="streamer.img === null ? '' : streamer.img"
                >
                  <v-card-title
                    class="underName"
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
  </div>
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
    },
    sortAtoZ(type) {
      var that = this
      var sortable = []

      this.streamers.forEach(element => {
        sortable.push([element.followersNb, element.img, element.name])
      })

      sortable.sort(function(a, b) {
        var nameA=a[2].toLowerCase(), nameB=b[2].toLowerCase()

        if (type === true) {
          return that.sortAtoZArray(nameA, nameB)
        } else if (type === false) {
          return that.sortZtoAArray(nameA, nameB)
        } else if (type === 'followUp') {
          return b[0]-a[0]
        } else if (type === 'followDown') {
          return a[0]-b[0]
        }
      })

      var sortedArray = []

      sortable.forEach(element => {
        sortedArray.push({
          followersNb: element[0],
          img: element[1],
          name: element[2]
        })
      })

      this.streamers = sortedArray
    },
    sortAtoZArray (nameA, nameB) {
      if (nameA < nameB) //sort string ascending
          return -1 
      if (nameA > nameB)
          return 1
      return 0 //default return value (no sorting)
    },
    sortZtoAArray (nameA, nameB) {
      if (nameA > nameB) //sort string descending
          return -1 
      if (nameA < nameB)
          return 1
      return 0 //default return value (no sorting)
    },
    checkStreamers () {
      var arrayTemp = []
      this.streamers.forEach(element => {
        if (element.img !== null) {
          arrayTemp.push(element)
          //eslint-disable-next-line
          console.log(element.img)
        }
      })

      this.streamers = arrayTemp
    }
  }, 
  created () {
    // Check if every streamers has a pic, if not delete it from array
    this.checkStreamers()

    this.streamers.forEach(element => {
      if (element.img !== null) {
        this.streamersShowOrNot["\"" + element.name + "\""] = true
      }
    })

    this.sortAtoZ(true)
  }
}
</script>

<style lang="scss" scoped>
.underName {
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