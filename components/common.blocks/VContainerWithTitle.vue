<template lang="pug">
  div.v-container-with-title
    div.v-container-with-title__title
      slot(name="title")
    div.v-container-with-title__body
      slot
</template>

<script lang="ts">
  import Vue from "vue"
  export default Vue.extend({
    name: "v-container-with-title"
  })
</script>

<style lang="scss">
  .v-container-with-title{
    &__title{
      font-size: 125%;
    }

    &__body{
      padding: {
        top: 5px;
        bottom: 5px;
      };
    }
  }
</style>