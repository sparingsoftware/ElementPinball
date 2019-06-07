<template>
  <section class="scene">
    <div class="images-wrapper">
      <img class="image image--half-pipe" src="/img/half-pipe.png">
      <img class="image image--gear" src="/img/gear.png">
      <img class="image image--worm-black" src="/img/worm-black.png">
      <img class="image image--curl" src="/img/curl.png">
    </div>
    <h1 class="title">
      <img class="image image--small-ball-black" src="/img/small-ball-black.png">
      high scores
    </h1>
    <ol class="rank">
      <li
        v-for="(user, id) in userRanking"
        :key="id"
        class="rank-row"
        :class="{ 'user-position': user.isCurrent }"
      >
        <div class="rank--position">
          {{ user.ranking }}
        </div>
        <div class="rank--name">
          {{ user.user }}
        </div>
        <div class="rank--score">
          {{ user.score }}
        </div>
      </li>
    </ol>
    <a href="#" class="btn-light" @click="goToGame">
      wróć do gry
    </a>
    <div class="disabled btn-dark" @click="resetRank">
      wyczyść ranking
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      userRanking: []
    }
  },
  async asyncData ({ params, error, app }) {
    return {
      rank: await app.$service.rank.all()
    }
  },
  mounted () {
    if (process.browser && window.localStorage.getItem('userName')) {
      this.$service.rank.score(window.localStorage.getItem('userName')).then(resp => {
        this.userRanking = resp.ranking
      })
    } else {
      this.userRanking = this.rank.ranking
    }

    document.addEventListener('keypress', function (e) {
      if (e.code === 'KeyS') {
        this.$service.controllers.dead().catch(error => {
          console.log('błąd serwera', error)
        })
        window.location.href = '/game'
      }
    }, false)
  },
  methods: {
    goToGame () {
      window.location.href = '/game'
    },
    resetRank () {
      this.$service.rank.clear()
      window.location.reload(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.scene {
  @include center-content(both);
  flex-direction: column;
}

.title {
  position: relative;
  font-size: 3.86vh;
  margin-bottom: 1.95em;
  color: #fff;
}

.btn-light {
  @include btn(true);
  margin-top: 1.63em;

  @media (max-width: 1079px) {
    & {
      display: none;
    }
  }
}

.rank {
  width: 85vw;
  max-width: 1080px;
  max-height: 51vh;
  overflow: hidden;

  &-row {
    display: flex;
    // font-size: 43px;
    font-size: 2.24vh;
    line-height: 1.93;

    &.user-position {
      color: #fff;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }
  }

  &--position {
    width: 20%;
  }

  &--name {
    width: 45%;
  }

  &--score {
    width: 35%;
    text-align: right;
  }
}

.images-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;

  @include media-down (md) {
    height: var(--vh);
  }
}

.image {
  position: absolute;
  max-width: none;
  pointer-events: none;

  &--curl {
    height: 23.6vh;
    top: 0%;
    left: 0%;
    transform: translate(40%, 15%);
    z-index: -1;
  }

  &--half-pipe {
    height: 8vh;
    top: 2.5%;
    left: 1%;
    transform: rotate(-40deg);
  }

  &--gear {
    height: 49.2vh;
    top: 50%;
    left: 50%;
    transform: translate(-59%, -65%);
  }

  &--small-ball-black {
    height: 6.2vh;
    top: 0;
    left: 100%;
    transform: translate(100%, 50%);
  }

  &--worm-black {
    height: 34vh;
    bottom: 0%;
    left: 100%;
    transform: translate(-49%, 15%);
  }
}

.disabled {
  display: none;
  @include btn();
  margin-top: 1.63em;
}
</style>
