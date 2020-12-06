<template lang="pug">
  div.v-block-actions(
    :style="backgroundImageStyle"
  )
    transition(
      name="t-fade"
      mode="out-in"
    )
      div.v-block-actions__title(:key="+isBlockMoving")
        template(v-if="isBlockMoving") \#{{block.id}}: {{contentTypeText}}

    transition(
      name="t-fade"
      mode="out-in"
    )
      div.v-block-actions__controls(
        :style="{opacity: (1 - isBlockMoving)}"
      )
        div.v-block-actions__control(
          @click="removeBlock(block)"
        ) 🗑
        div.v-block-actions__control(
          @touchstart.prevent="onBlockMoveStart"
        ) ⇅
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState, mapGetters, mapMutations } from "vuex";

  import Container from "@/script/classes/Container";
  import BlockImage from "@/script/classes/BlockImage";
  import BlockText from "@/script/classes/BlockText";

  export default Vue.extend({
    name: "v-block-actions",
    props: {
      block: Container
    },
    computed: {
      ...mapState("design", [
        "movingBlock"
      ]),
      ...mapGetters("design", [
        "isBlockMoving"
      ]),
      contentTypeText(): string {
        const content = this.block.content;

        if(content && content instanceof BlockText) {
          return content.text
        }

        if(content && content instanceof BlockImage) {
          return "Изображение"
        }

        return "Блок";
      },
      backgroundImageStyle(): object {
        if(!this.isBlockMoving){
          return {};
        }

        const content = this.block.content;
        if(content && content instanceof BlockImage) {
          return {
            backgroundImage: `url(${content.url || ""})`
          }
        }
        return {};
      }
    },
    methods: {
      ...mapMutations("design", {
        removeBlock: "REMOVE_BLOCK",
        setMovingBlock: "SET_MOVING_BLOCK"
      }),
      onBlockMoveStart(){
        this.setMovingBlock(this.block);

        /* Отключение при отпускании */
        window.addEventListener("touchend", () => {
          this.setMovingBlock();
        }, { once: true });

        window.addEventListener("touchcancel", () => {
          this.setMovingBlock();
        }, { once: true })
      }
    }
  })
</script>

<style lang="scss">
  .v-block-actions{
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 5px;

    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    &__title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__controls{
      display: flex;
      align-items: center;

      transition: $transition;
    }

    &__control{
      height: 2em;
      width: 2em;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 0.25em;
      background-color: $color-secondary;

      &+&{
        margin: {
          left: 10px;
        };
      }

      &:active{
        filter: brightness(0.85);
      }
    }
  }
</style>