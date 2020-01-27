<template>
  <div>
      <div class="backgroundHome" v-if="logged === false">
        <BackgroundHome/>
      </div>
      <Profile class="profile" :logged="logged" :name="name" :image="image"/>
  </div>
</template>

<script>
import Profile from '@/components/Profile'
import BackgroundHome from '@/components/BackgroundHome'

export default {
  name: 'home',
  components: {
    Profile,
    BackgroundHome
  },
  data () {
    return {
      name: '',
      image: '',
      id: '',
      logged: false,
      followsArray: []
    }
  },
  mounted: function () {
    if (window.$cookies.isKey('userId')) {
      this.logged = true
      this.id = window.$cookies.get('userId')
      this.name = window.$cookies.get('userName')
      this.image = window.$cookies.get('userProfileImage')
      this.$router.push('About') 
      this.logged = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>