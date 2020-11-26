<template lang="pug">
  div.the-header
    div.the-header__title Конструктор
    div.the-header__controls
      div.the-header__toggle(
        @click="onChangeMode"
      ) {{changeModeText}}
</template>

<script lang="ts">
  import Vue from "vue"
  import { mapMutations, mapState } from "vuex";

  export default Vue.extend({
    name: "the-header",
    computed: {
      ...mapState(["mode"]),
      /**
       * Получить текст кнопки управления режимом конструктора
       */
      changeModeText(): string {
        switch (this.mode) {
          case "preview": return "Предпросмотр";
          case "edit":
          default: return "Редактировать";
        }
      }
    },
    methods: {
      ...mapMutations({
        changeMode: "CHANGE_MODE"
      }),
      /**
       * Установить режим конструктора
       */
      onChangeMode(){
        switch (this.mode) {
          case "edit": this.changeMode("preview"); break;
          case "preview":
          default: this.changeMode("edit");
        }
      }
    }
  })
</script>

<style lang="scss">
  .the-header{
    padding: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    color: $color-secondary;
    background-color: $color-main;

    &__title{
      font-size: $size-title;
      color: $color-light;
    }

    // &__controls{

    // }

    // &__toggle{

    // }
  }
</style>