 <template>
    <div class="connected deep-purple">
        <img class="profileImg" :src="image" alt="image de profil">
        <div class="nameContainer white--text">{{name}}</div>
    </div>
</template>

<script>
export default {
  name: 'profile-infos',
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
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
  .connected {
    position: absolute;
    display: flex;
    right: 0;
    border-radius: 500px 0 0 500px;
    height: 70px;
    width: max-content;

    img {
      height: 100%;
      border-radius: 50%;
    }

    .nameContainer{
        width: max-content;
        padding: 5px;
        height: max-content;
        position: relative;
        top: 50%; 
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        font-size: 22px;
    }
  }
</style>