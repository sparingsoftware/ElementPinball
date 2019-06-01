<template>
  <footer class="footer">
    <div class="decoration-line"/>
    Panowie&nbsp;Programiści × Element&nbsp;Talks ×&nbsp;Uniforma
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer {
  width: calc(100% - 4vh);
  position: absolute;
  bottom: 0;
  left: 0;
  color: $black;
  margin: 0 2vh 2vh;
  text-align: center;

  @include media-down (md) {
    line-height: 1.4;
  }

  .game & {
    margin-bottom: 1.5vh;
    color: $peach;
    font-size: 0.94vh;

    @include media-down (sm) {
      font-size: 8px;
    }
  }
}

.decoration-line {
  position: absolute;
  top: 0;
  left: 0;
  background-color: $black;
  height: 5px;
  // height: 260px;
  width: 13.5vh;
  transform-origin: 0% 50%;
  transform: rotate(-45deg);

  .game & {
    background-color: $peach;
    display: none;
  }

  @media (max-height: 1000px) {
    & {
      height: 3px;
    }
  }

  @include media-down (md) {
    display: none;
  }
}
</style>
