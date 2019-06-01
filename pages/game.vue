<template>
  <section class="scene">
    <div class="score current-score">
      score
      <span class="score--value">20</span>
    </div>
    <div class="score high-score">
      high score
      <span class="score--value">120</span>
    </div>
    <div class="lives">
      <img class="life life--disabled" src="/img/life.png" alt="">
      <img class="life" src="/img/life.png" alt="">
      <img class="life" src="/img/life.png" alt="">
    </div>
    <div ref="gameContainer" class="game-container"/>
  </section>
</template>

<script>
import { loadGame } from '@/assets/js/game'

export default {
  head () {
    return {
      bodyAttrs: {
        class: 'game'
      }
    }
  },
  mounted () {
    loadGame()
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      const { gameContainer } = this.$refs
      const windowHeight = window.innerHeight
      const scale = windowHeight / 1920
      gameContainer.style.webkitTransform = `scale(${scale})`
      gameContainer.style.transform = `scale(${scale})`
    }
  }
}
</script>

<style lang="scss" scoped>
.game-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: 50%, 45% 145%;
  background-image: url('/img/board.png'), url('/img/board-bg.png');
}

.score {
  position: absolute;
  top: 45px;
  color: $peach;
  // font-size: 21px;
  font-size: 1.1vh;
  display: flex;
  flex-direction: column;

  &--value {
    // font-size: 118px;
    font-size: 6.15vh;
  }

  @include media-down (md) {
    top: 15px;
  }
}

.current-score {
  left: 35px;

  @include media-down (md) {
    left: 15px;
  }
}

.high-score {
  text-align: right;
  right: 35px;

  @include media-down (md) {
    right: 15px;
  }
}

.lives {
  position: absolute;
  bottom: 45px;
  left: 35px;

  @include media-down (md) {
    bottom: 20px;
    left: 10px;
    display: flex;
    flex-direction: column;
  }

  .life {
    max-width: 50px;
    margin-right: 5px;

    @include media-down (md) {
      max-width: 27px;
      margin-bottom: 5px;
      margin-right: 0;
    }

    &--disabled {
      opacity: 0.8;
      filter: grayscale(100%);
    }
  }
}
</style>

