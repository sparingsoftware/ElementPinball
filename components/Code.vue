<template>
  <div ref="code" class="code"/>
</template>

<script>
import qrcode from 'qrcode-generator'
export default {
  props: {
    score: {
      type: Number,
      required: true
    }
  },
  mounted () {
    this.generateQRCode()
  },
  methods: {
    generateQRCode () {
      const { code } = this.$refs
      const typeNumber = 4
      const errorCorrectionLevel = 'L'
      const qr = qrcode(typeNumber, errorCorrectionLevel)
      qr.addData(`http://localhost:3000/user/${this.score}`)
      qr.make()
      code.innerHTML = qr.createSvgTag()
    }
  }
}
</script>

<style lang="scss" scoped>
.code {
  height: 12vh;
  margin-top: 3.8em;
  margin-bottom: -10em;

  /deep/ svg {
    height: 12vh;
    width: 12vh;
  }
}
</style>
