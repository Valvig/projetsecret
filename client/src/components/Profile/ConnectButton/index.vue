<template>
    <div>
        <v-btn
            class="ma-2 connectButton"
            color="#6441A4"
            rounded
            href="http://localhost:8081/auth/twitch"
        >
          <span class="connectFont">Connexion<i class="fab fa-twitch"></i></span>
        </v-btn>
    </div>
</template>

<script>
export default {
  name: 'connect-button',
  props: {
    logged: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .connectButton {
    position: absolute;
    top: 0;
    right: 0;
  }
  .connectFont {
      color: white;
      font-size: 13px;
  }
</style>