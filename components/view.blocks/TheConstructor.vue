<template lang="pug">
  div.the-constructor
    template
      div.the-constructor__empty
        h1 Пока ничего нет
        div Создайте свой уникальный шаблон из блоков
        div Добавить новый блок
    template
</template>

<script lang="ts">
  import Vue from "vue"
  export default Vue.extend({
    name: "the-constructor"
  })
</script>

<style lang="scss">
  .the-constructor{

  }
</style>