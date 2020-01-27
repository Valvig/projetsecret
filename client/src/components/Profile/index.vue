<template>
  <div>
    <div v-if="!logged">
        <ConnectButton :logged="logged"/>
    </div>
    <div class="profileInfosContainer" v-else>
        <ProfileInfos class="profileInfos" :name="name" :image="image"/>
    </div>
  </div>
</template>

<script>
import ConnectButton from './ConnectButton'
import ProfileInfos from './ProfileInfos'
export default {
  name: 'profile',
  components: {
    ConnectButton,
    ProfileInfos
  },
  props: {
    logged: {
      type: Boolean,
      required: true
    },
    name: {
      type: String
    },
    image: {
      type: String
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
  .profileInfosContainer{
    position: relative;
  }
  
</style>