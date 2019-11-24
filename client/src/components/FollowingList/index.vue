<template>
  <span>
    <v-row>
      <v-col cols="12" sm="10" offset-sm="1">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Streamers List</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fluid>
            <v-row>
              <v-card
                class="mx-auto custom-card"
                max-width="400"
                v-for="streamer in streamers"
                :key="streamer.id"
              >
                <v-img
                  class="white--text align-end"
                  height="300px"
                  width="300px"
                  :src="streamer.img"
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
.test {
  background: #000000ab;
}

.custom-card {
  margin: 30px;
}
</style>