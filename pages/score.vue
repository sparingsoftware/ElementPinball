<template>
  <section class="scene">
    <images-component />
    <img class="image image--worm-light" src="/img/worm-light.png">
    <div class="label">
      twój wynik
    </div>
    <div class="score">
      {{ userScore }}
    </div>
    <div class="label">
      najwyższy wynik
    </div>
    <div class="score">
      {{ highScore }}
    </div>
    <div class="btns">
      <nuxt-link to="/game" class="btn-light">
        zagraj ponownie
      </nuxt-link>
      <div class="btn-dark">
        zeskanuj i zapisz wynik
      </div>
    </div>
    <code-component :score="userScore"/>
  </section>
</template>

<script>
import CodeComponent from '@/components/Code'
import ImagesComponent from '@/components/Images'

export default {
  components: {
    CodeComponent,
    ImagesComponent
  },
  data () {
    return {
      userScore: this.$store.getters.getCurrentScore
    }
  },
  computed: {
    highScore () {
      return this.rank.ranking[0] ? this.rank.ranking[0].score : 0
    }
  },
  async asyncData ({ params, error, app }) {
    return {
      rank: await app.$service.rank.all()
    }
  }
}
</script>

<style lang="scss" scoped>
.scene {
  text-align: center;
}

.score {
  // font-size: 155.7px;
  font-size: 8.11vh;
  line-height: 1.2em;
  margin-bottom: 0.2em;
}

.btns {
  @include center-content(both);
  flex-direction: column;
  margin-top: 3.5em;
  padding: 0 3.5em;
}

.btn-light {
  @include btn(true);
}

.btn-dark {
  @include btn();
  margin-top: 0.63em;
}

.image {
  position: absolute;
  max-width: none;
  pointer-events: none;

  &--worm-light {
    height: 61vh;
    top: 50%;
    left: 50%;
    transform: translate(-52%, -65%);
  }
}
</style>
