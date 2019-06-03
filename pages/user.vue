<template>
  <section class="scene">
    <images-component />
    <img class="image image--worm-light" src="/img/worm-light.png">
    <label for="user-name" class="label">
      podaj imię
    </label>
    <input
      id="user-name"
      v-model="user"
      class="input"
      type="text"
    >
    <div v-if="error" class="error">
      Musisz wpisać imię żeby być w rankingu!
    </div>
    <div class="btns">
      <div class="btn-light" @click="sendUserScore" @focus="clearError">
        zapisz
      </div>
      <nuxt-link to="/game" class="btn-dark">
        wróć do gry
      </nuxt-link>
    </div>
    <code-component/>
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
      user: '',
      error: false
    }
  },
  methods: {
    sendUserScore () {
      this.clearError()

      if (this.user) {
        console.log('Zapisz do rankingu')
      } else {
        this.error = true
      }
    },
    clearError () {
      this.error = false
    }
  }
}
</script>

<style lang="scss" scoped>
.scene {
  text-align: center;
}

.label {
  display: block;
  margin-bottom: 2.19em;
}

.input {
  width: 85vw;
  max-width: 1080px;
  margin: 0 auto;
  background: transparent;
  border: none;
  border-bottom: 5px solid $black;
  outline: none;
  @include inputFont;
  padding: 10px 0;
}

.error {
  color: #fff;
  width: 85vw;
  max-width: 1080px;
  margin: 0 auto;
  padding: 10px 0;
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
  margin-top: 7.5em;
  padding: 0 3.5em;
  margin-bottom: 9vh;
}

.btn-light {
  @include btn(true);
  cursor: pointer;
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
    transform: translate(-50%, -62%);
  }
}
</style>
