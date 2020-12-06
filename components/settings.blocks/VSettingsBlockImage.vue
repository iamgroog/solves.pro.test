<template lang="pug">
  div.v-settings-block-image
    div.v-settings-block-image__property
      v-container-with-title
        template(#title) Размер
        template
          v-radio-group(
            :value="item.size"
            :items="sizes"
            @input="changeProperty({item, property: 'size', value: $event})"
          )

    div.v-settings-block-image__property
      v-container-with-title
        template(#title) Картинка
        template
          v-image-picker(
            :value="item.url"
            @input="changeProperty({item, property: 'url', value: $event})"
          )

</template>

<script lang="ts">
  import Vue from "vue"
  import { mapMutations } from "vuex";
  import BlockImage from "@/script/classes/BlockImage";
  import RadioItem from "@/script/interfaces/RadioItem";

  interface VSettingsContainerData {
    sizes: RadioItem[],
    name: string
  }

  export default Vue.extend({
    name: "v-settings-block-image",
    props: {
      item: {
        type: BlockImage
      }
    },
    data(): VSettingsContainerData{
      return {
        sizes: [
          { index: "contain", label: "Вписать" },
          { index: "cover", label: "Заполнить" }
        ],
        name: ""
      }
    },
    computed: {

    },
    methods: {
      ...mapMutations("design", {
        changeProperty: "CHANGE_PROPERTY"
      })
    }
  })
</script>

<style lang="scss">
  .v-settings-block-image{
    &__property{
      padding: 0 5px;
    }

    &__textarea {
      height: 5em;
      width: 100%;
    }
  }
</style>