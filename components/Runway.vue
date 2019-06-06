<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32.314 788.443"
  >
    <g data-name="Group 118" transform="translate(-961.853 -928.112)">
      <path d="M961.852 1716.555v-35.7l16.317-10.62 16 10.03v36.286l-16.157-9.145z" data-name="Path 26"/>
      <path d="M961.852 1642.438v-35.7l16.317-10.62 16 10.03v36.286l-16.157-9.145z" data-name="Path 27"/>
      <path d="M961.852 1568.321v-35.7L978.17 1522l16 10.03v36.286l-16.157-9.145z" data-name="Path 28"/>
      <path d="M961.852 1493.885v-35.7l16.317-10.62 16 10.03v36.286l-16.157-9.145z" data-name="Path 29"/>
      <path d="M961.852 1419.768v-35.7l16.317-10.62 16 10.03v36.286l-16.157-9.145z" data-name="Path 30"/>
      <path d="M961.852 1345.651v-35.7l16.317-10.62 16 10.03v36.286l-16.157-9.145z" data-name="Path 31"/>
      <path d="M961.852 1271.216v-35.7l16.317-10.62 16 10.03v36.286l-16.157-9.145z" data-name="Path 32"/>
      <path d="M961.852 1197.1v-35.7l16.317-10.62 16 10.03v36.29l-16.157-9.145z" data-name="Path 33"/>
    </g>
  </svg>
</template>

<style lang="scss" scoped>
path {
  fill: $peach;
  animation: FadeIn 1s infinite;
  animation-fill-mode: both;
}

@keyframes FadeIn {
  0%, 100% {
    opacity: 0;
  }

  85% {
    opacity: 0.85;
  }
}

@for $i from 1 through 10 {
  path:nth-child(#{10 - $i}) {
    animation-delay: #{$i * 0.9}s;
  }
}
</style>

