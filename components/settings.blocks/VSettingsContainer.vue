<template lang="pug">
  div.v-settings-container
    div.v-settings-container__property
      v-container-with-title
        template(#title) Внешние отступы
        template
          v-radio-group(
            :value="item.margin"
            :items="margins"
            @input="changeProperty({item, property: 'margin', value: $event})"
          )

    div.v-settings-container__property
      v-container-with-title
        template(#title) Внутренние отступы
        template
          v-radio-group(
            :value="item.padding"
            :items="paddings"
            @input="changeProperty({item, property: 'padding', value: $event})"
          )

    div.v-settings-container__property
      v-container-with-title
        template(#title) Цвет фона
        template
          v-radio-group(
            :value="item.backgroundColor"
            :items="colors"
            @input="changeProperty({item, property: 'backgroundColor', value: $event})"
          )
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapMutations } from "vuex";
  import Container from "@/script/classes/Container";
  import RadioItem from "@/script/interfaces/RadioItem";

  interface VSettingsContainerData {
    margins: RadioItem[],
    paddings: RadioItem[],
    colors: RadioItem[]
  }

  export default Vue.extend({
    name: "v-settings-container",
    props: {
      item: {
        type: Container
      }
    },
    data(): VSettingsContainerData{
      return {
        margins: [
          { index: "none", label: "Нет" },
          { index: "small", label: "S" },
          { index: "medium", label: "M" },
          { index: "large", label: "L" }
        ],
        paddings: [
          { index: "none", label: "Нет" },
          { index: "small", label: "S" },
          { index: "medium", label: "M" },
          { index: "large", label: "L" }
        ],
        colors: [
          { index: "none", label: "Нет" },
          { index: "red", label: "Красный" },
          { index: "blue", label: "Синий" },
          { index: "green", label: "Зеленый" }
        ]
      }
    },
    methods: {
      ...mapMutations("design", {
        changeProperty: "CHANGE_PROPERTY"
      })
    }
  })
</script>

<style lang="scss">
  .v-settings-container{
    &__property{
      padding: 0 5px;
    }
  }
</style>