<template lang="pug">
  div.v-radio-group
    template(v-for="item in items")
      div.v-radio-group__item(
        :class="{active: item.index === selected}"
        :key="item.index"
        @click="setItem(item)"
      ) {{item.label}}

</template>

<script lang="ts">
  import Vue from "vue";
  import RadioItem from "@/script/interfaces/RadioItem";

  export default Vue.extend({
    name: "v-radio-group",
    props: {
      items: {
        type: Array,
        default(): RadioItem[]{
          return []
        }
      },
      value: {
        type: String,
        default: "none"
      }
    },
    data(){
      return {
        selected: this.value
      }
    },
    watch: {
      value(index: string) {
        this.selected = index;
      }
    },
    methods: {
      setItem(item: RadioItem){
        this.selected = item.index;
        this.$emit("input", item.index);
      }
    }
  })
</script>

<style lang="scss">
  .v-radio-group{
    display: flex;
    flex-wrap: wrap;

    &__item {
      min-width: 50px;

      padding: {
        left: 10px;
        right: 10px;
        top: 8px;
        bottom: 8px;
      }

      margin: {
        right: 10px;
        top: 5px;
        bottom: 5px;
      }

      text-align: center;

      border-radius: 5em;
      background-color: $color-secondary;

      &:last-child {
        margin: {
          right: 0;
        }
      }

      &.active {
        background-color: $color-light;
      }
    }
  }
</style>