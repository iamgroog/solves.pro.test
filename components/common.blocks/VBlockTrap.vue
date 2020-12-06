<template lang="pug">
  div.v-block-trap(
    :class="{active}"
    @touchend="onTouchEnd"
  )
    div.v-block-trap__container Переместить сюда
</template>

<script lang="ts">
  import Vue from "vue";
  import Container from "@/script/classes/Container";

  export default Vue.extend({
    name: "v-block-trap",
    props: {
      block: {
        type: Container
      },
      active: {
        type: Boolean
      }
    },
    methods: {
      onTouchEnd(){
        window.console.log("VBlockTrap :: onTouchEnd");
      }
    }
  })
</script>

<style lang="scss">
  .v-block-trap{
    height: 50px;
    padding: 10px;

    color: $color-main;
    opacity: 0.5;

    transition: $transition;

    &.active,
    &:hover,
    &:active{
      height: 100px;
      color: $color-green;
      opacity: 1;
    }

    &__container {
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 5px dashed;
      border-radius: 10px;
    }
  }
</style>