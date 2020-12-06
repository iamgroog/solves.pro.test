<template lang="pug">
  div.v-settings-block-text
    div.v-settings-block-text__property
      v-container-with-title
        template(#title) Размер
        template
          v-radio-group(
            :value="item.size"
            :items="sizes"
            @input="changeProperty({item, property: 'size', value: $event})"
          )

    div.v-settings-block-text__property
      v-container-with-title
        template(#title) Выравнивание
        template
          v-radio-group(
            :value="item.align"
            :items="aligns"
            @input="changeProperty({item, property: 'align', value: $event})"
          )

    div.v-settings-block-text__property
      v-container-with-title
        template(#title) Цвет
        template
          v-radio-group(
            :value="item.color"
            :items="colors"
            @input="changeProperty({item, property: 'color', value: $event})"
          )

    div.v-settings-block-text__property
      v-container-with-title
        template(#title) Текст
        template
          textarea.v-settings-block-text__textarea(
            v-model="textareaModel"
            placeholder="Введите какой-нибудь текст"
          )

</template>

<script lang="ts">
  import Vue from "vue"
  import { mapMutations } from "vuex";
  import BlockText from "@/script/classes/BlockText";
  import RadioItem from "@/script/interfaces/RadioItem";

  interface VSettingsContainerData {
    sizes: RadioItem[],
    aligns: RadioItem[],
    colors: RadioItem[],
    text: string
  }

  export default Vue.extend({
    name: "v-settings-block-text",
    props: {
      item: {
        type: BlockText
      }
    },
    data(): VSettingsContainerData{
      return {
        sizes: [
          { index: "small", label: "S" },
          { index: "medium", label: "M" },
          { index: "large", label: "L" }
        ],
        aligns: [
          { index: "left", label: "Лево" },
          { index: "center", label: "Середина" },
          { index: "right", label: "Право" }
        ],
        colors: [
          { index: "black", label: "Черный" },
          { index: "white", label: "Белый" }
        ],
        text: ""
      }
    },
    computed: {
      textareaModel: {
        get(this): string {
          return this.item.text;
        },
        set(this, value: string) {
          this.changeProperty({ item: this.item, property: "text", value })
        }
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
  .v-settings-block-text{
    &__property{
      padding: 0 5px;
    }

    &__textarea {
      height: 5em;
      width: 100%;
    }
  }
</style>