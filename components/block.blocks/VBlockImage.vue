<template lang="pug">
  div.v-block-image(
    :class="contentSizeClassModificator",
    :style="{backgroundImage: 'url(' + block.url + ')'}"
    :key="block.url"
  )
</template>

<script lang="ts">
  import Vue from "vue";
  import BlockImage from "@/script/classes/BlockImage";

  export default Vue.extend({
    name: "v-block-image",
    props: {
      block: BlockImage
    },
    computed: {
      /**
       * Констурктор класса для модификатора размера изображения
       */
      contentSizeClassModificator(): string{
        return this.$constructBemClass({ modificator: "size", modificatorValue: this.block.size });
      }
    }
  })
</script>

<style lang="scss">
  .v-block-image{
    height: 300px;
    width: 100%;

    background-repeat: no-repeat;
    background-origin: padding-box;
    background-position: center center;

    &_size {
      &_contain{
        background-size: contain;
      }

      &_cover{
        background-size: cover;
      }
    }
  }
</style>