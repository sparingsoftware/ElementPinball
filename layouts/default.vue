<template>
  <div class="page">
    <main class="content">
      <nuxt/>
    </main>
    <footer-component/>
  </div>
</template>

<script>
import FooterComponent from '@/components/Footer'

export default {
  components: {
    FooterComponent
  },
  data () {
    return {}
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 1080px;
  margin: 0 auto;
  @include center-content(both);
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.content {
  @include center-content(both);
  flex-direction: column;
  flex-wrap: wrap;
}
</style>

