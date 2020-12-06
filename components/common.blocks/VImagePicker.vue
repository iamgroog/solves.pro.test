<template lang="pug">
  div.v-image-picker
    template(v-for="image in images")
      div.v-image-picker__item(
        :class="{active: image === value}"
        :style="{backgroundImage: 'url(' + image + ')'}"
        :key="image"
        @click="onClick(image)"
      )
</template>

<script lang="ts">
  import Vue from "vue"
  export default Vue.extend({
    name: "v-image-picker",
    props: {
      value: {
        type: String
      }
    },
    data() {
      return {
        images: [
          require("~/assets/pics/cat.jpg"),
          require("~/assets/pics/covid.png"),
          require("~/assets/pics/osaka.jpg"),
          require("~/assets/pics/success.png")
        ]
      }
    },
    methods: {
      onClick(value: string){
        this.$emit("input", value);
      }
    }
  })
</script>

<style lang="scss">
  .v-image-picker{
    padding: 5px;

    display: flex;
    flex-wrap: wrap;

    &__item {
      height: 50px;
      width: 50px;
      margin: 5px;

      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      background-origin: padding-box;

      border-radius: 5px;
      border: 1px solid $color-secondary;

      &.active{
        border: 2px solid $color-light;
      }
    }
  }
</style>