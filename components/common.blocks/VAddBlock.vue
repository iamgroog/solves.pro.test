<template lang="pug">
  div.v-add-block
    div.v-add-block__header Добавить блок
    div.v-add-block__body
      div.v-add-block__button.v-add-block__button_text(
        @click="addBlock('text')"
      ) Текст
      div.v-add-block__button.v-add-block__button_image(
        @click="addBlock('image')"
      ) Картинка
</template>

<script lang="ts">
  import Vue from "vue"
  import { mapMutations, mapActions, mapGetters } from "vuex";
  import Container from "@/script/classes/Container"

  export default Vue.extend({
    name: "v-add-block",
    props: {
      block: {
        type: Container
      }
    },
    computed: {
      ...mapGetters("design", [
        "getBlockIndex"
      ])
    },
    methods: {
      ...mapMutations("design", {
        addBlock: "ADD_BLOCK"
      }),
      ...mapActions("design", [
        "createBlock"
      ]),
      addBlock(type: "text" | "image"){
        this.createBlock({
          blockType: type,
          index: this.getBlockIndex(this.block)
        });
      }
    }
  })
</script>

<style lang="scss">
  .v-add-block{
    padding: 10px;
    background-color: $color-secondary;

    &__header{
      font-size: $size-font * 1.25;
      text-align: center;
    }

    &__body{
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }

    &__button{
      display: flex;
      align-items: center;
      justify-content: center;

      height: 50px;
      width: 150px;

      margin: {
        top: 10px;
        bottom: 10px;
      };

      border-radius: 5px;

      font-size: $size-font * 1.5;

      background-color: $color-light;

      &:active {
        filter: brightness(0.85)
      }
    }
  }
</style>