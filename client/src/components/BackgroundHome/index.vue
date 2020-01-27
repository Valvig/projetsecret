<template>
    <div class="row rowBackground">
        <div class="col twitchCol">
            <p>CONNECTE TOI AVEC TWITCH</p> 
            <img class="backgroundImages" src="@/assets/svg/gamerGirl.svg" alt="test">
        </div>
        <div class="col communityCol">
            <p>VOTE POUR LA MEILLEURE COMMUNAUTÉ</p> 
            <img class="backgroundImages" src="@/assets/svg/community.svg" alt="test">
        </div>
        <div class="col prizesCol">
            <p>GAGNE DES CADEAUX</p> 
            <img class="backgroundImages" src="@/assets/svg/coins.svg" alt="test">
        </div>
    </div>
</template>

<script>
export default {
  name: 'background-home',
  data () {
    return {
        gamerGirlSource: ""
    }
  }
}
</script>

<style lang="scss" scoped>
    .rowBackground {
        height: 100vh;
    }
    .twitchCol,
    .communityCol,
    .prizesCol {
        height: 100%;
        width: 100%;
        padding: 0;
        font-size: 50px;
        position: relative;

        p {
            text-align: center;
            padding-top: 33%; 
        }
    }
    .twitchCol {
        background-color:#D00000;
    }
    .communityCol {
        background-color:#1B5299;
    }
    .prizesCol {
        background-color:#EFA00B;
    }

    .backgroundImages {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
</style>