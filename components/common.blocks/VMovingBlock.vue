<template lang="pug">
  div.v-moving-block(
    :style="{top: positionY + 'px'}"
  )
    v-block-actions(:block="movingBlock")
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";

  export default Vue.extend({
    name: "v-moving-block",
    props: {
      touchMoveEvent: {
        type: TouchEvent
      }
    },
    computed: {
      ...mapState("design", [
        "movingBlock"
      ]),
      positionY(){
        if(this.touchMoveEvent){
          // const correction = this.touchMoveEvent.touches[0].clientY
          return this.touchMoveEvent.touches[0].clientY;
          // return 100;
        }

        return 0
      }
    }
  })
</script>

<style lang="scss">
  .v-moving-block{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    transform: translateY(-50%);

    width: 100%;

    pointer-events: none;

    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0px 2px 5px rgba(0,0, 0, 0.4);
  }
</style>