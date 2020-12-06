<template lang="pug">
  div.v-block-text(
    :class="classModificators"
  ) {{block.text}}
</template>

<script lang="ts">
  import Vue from "vue";
  import BlockText from "@/script/classes/BlockText";

  export default Vue.extend({
    name: "v-block-text",
    props: {
      block: {
        type: BlockText
      }
    },
    computed: {
      /**
       * Констурктор класса для модификатора размера текста
       */
      contentSizeClassModificator(): string{
        return this.$constructBemClass({ modificator: "size", modificatorValue: this.block.size });
      },
      /**
       * Констурктор класса для модификатора выравнивания текста
       */
      contentPaddingClassModificator(): string{
        return this.$constructBemClass({ modificator: "align", modificatorValue: this.block.align });
      },
      /**
       * Констурктор класса для модификатора цвета текста
       */
      contentBackgroundColorClassModificator(): string{
        return this.$constructBemClass({ modificator: "color", modificatorValue: this.block.color });
      },
      classModificators(): string[] {
        return [
          this.contentSizeClassModificator,
          this.contentPaddingClassModificator,
          this.contentBackgroundColorClassModificator
        ]
      }
    }
  })
</script>

<style lang="scss">
  .v-block-text{
    $aligns: left center right;
    $sizes-text: (small: 8px, medium: 16px, large: 32px);
    $colors: (black: black, white: white);

    transition: $transition;

    &_align{
      @each $index in $aligns {
        &_#{$index} {
          text-align: $index ;
        }
      }
    }

    &_size{
      @each $index, $value in $sizes-text {
        &_#{$index} {
          font-size: $value;
        }
      }
    }

    &_color{
      @each $index, $value in $colors {
        &_#{$index} {
          color: $value;
        }
      }
    }
  }
</style>