<template>
  <div class="images-wrapper">
    <img class="image image--curl" src="/img/curl.png">
    <img class="image image--star" src="/img/star.png">
    <img class="image image--leaflet-peach" src="/img/leaflet-peach.png">
    <img class="image image--leaflet-gray" src="/img/leaflet-gray.png">
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
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
    top: 1%;
    left: 3%;
  }

  &--star {
    height: 7.8vh;
    top: 3.5%;
    left: 48%;
    transform: translate(50%, 0);
  }

  &--leaflet-gray {
    height: 52.8vh;
    top: 0;
    left: 100%;
    transform: translate(-49%, -20%);
  }

  &--leaflet-peach {
    height: 34.5vh;
    bottom: 7%;
    left: 0;
    transform: translate(-38%, 0);
  }
}
</style>
