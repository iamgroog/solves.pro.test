<template lang="pug">
  component.v-block-settings(
    :is="settingsComponent"
    :item="item"
  )
</template>

<script lang="ts">
  import Vue from "vue";
  import Container from "@/script/classes/Container";
  import BlockImage from "@/script/classes/BlockImage";
  import BlockText from "@/script/classes/BlockText";

  import VSettingsContainer from "@/components/settings.blocks/VSettingsContainer.vue";
  import VSettingsBlockImage from "@/components/settings.blocks/VSettingsBlockImage.vue";
  import VSettingsBlockText from "@/components/settings.blocks/VSettingsBlockText.vue";

  export default Vue.extend({
    name: "v-block-settings",
    props: {
      item: {
        type: [Container, BlockImage, BlockText]
      }
    },
    computed: {
      settingsComponent(){
        if(this.item instanceof Container){ return VSettingsContainer }
        if(this.item instanceof BlockImage){ return VSettingsBlockImage }
        if(this.item instanceof BlockText){ return VSettingsBlockText }
        return "div";
      }
    }
  })
</script>

<style lang="scss">
  .v-block-settings{

  }
</style>