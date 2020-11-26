<template lang="pug">
  div.the-header
    div.the-header__title Конструктор
    div.the-header__controls
      div.the-header__toggle {{changeModeText}}
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "the-header",
  computed: {
    ...mapGetters(["isPreviw", "isEdit"]),
    changeModeText(){
      if (this.isPreviw) {
        return "Редактировать"
      }
      return "Предпросмотр"
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