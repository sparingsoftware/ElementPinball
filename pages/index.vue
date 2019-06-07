<template>
  <section class="scene">
    <images-component/>
    <h1 class="title">
      <img class="image image--small-ball-black" src="/img/small-ball-black.png">
      <img class="image image--gear" src="/img/gear.png">
      Element<br>Pinball
    </h1>
    <div class="btns">
      <img class="image image--worm-light" src="/img/worm-light.png">
      <a href="#" class="btn-light" @click="goToGame">
        <img class="image image--small-ball-white" src="/img/small-ball-white.png">
        zagraj!
      </a>
      <nuxt-link to="/rank" class="btn-dark">
        <img class="image image--half-pipe" src="/img/half-pipe.png">
        ranking
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import ImagesComponent from '@/components/Images'

export default {
  components: {
    ImagesComponent
  },
  methods: {
    goToGame () {
      window.location.href = '/game'
    }
  }
}
</script>

<style lang="scss" scoped>
.scene {
  text-align: center;
}

.title {
  // font-size: 139px;
  font-size: 7.24vh;
  margin-bottom: 0.58em;
  position: relative;
}

.btns {
  position: relative;
  @include center-content(both);
  flex-direction: column;
}

.btn-light {
  @include btn(true, true);

  @media (max-width: 1079px) {
    & {
      display: none;
    }
  }
}

.btn-dark {
  margin-top: 0.37em;
  @include btn(false, true);

  @media (max-width: 1079px) {
    & {
      @include btn(true, true);
    }
  }
}

.image {
  position: absolute;
  max-width: none;
  pointer-events: none;

  &--small-ball-black {
    height: 6.1vh;
    bottom: 0;
    left: 50%;
    transform: translate(-400%, 25%);
  }

  &--gear {
    z-index: -1;
    height: 23.1vh;
    top: 0;
    left: 50%;
    transform: translate(-100%, -30%);
  }

  &--small-ball-white {
    height: 6vh;
    top: 50%;
    left:  120%;
    transform: translate(0, -25%);
  }

  &--half-pipe {
    height: 20.5vh;
    top: 65%;
    left: 100%;
    transform: translate(-50%, 0) rotate(-37deg);
  }

  &--worm-light {
    z-index: -1;
    height: 58vh;
    top: 0;
    left: 50%;
    transform: translate(-46%, -14%);
  }
}
</style>
