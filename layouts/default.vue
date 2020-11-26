<template lang="pug">
  div.layout-default
    div.layout-default__header
      TheHeader

    div.layout-default__body
      Nuxt
</template>

<style lang="scss">
  @import "./../style/style.scss";

  .layout-default{
    height: 100%;
    width: 100%;
    
    display: flex;
    flex-direction: column;

    &__header {
      width: 100%;
    }

    &__body {
      flex-grow: 1;
    }
  }
</style>
