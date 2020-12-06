<template lang="pug">
  div.v-block(
    v-show="block !== movingBlock"
    :class="blockMarginClassModificator"
    :data-block-id="block.id"
  )
    t-collapse.v-block__collapser(
      tag="div"
      duration="0.3"
    )
      //- Добавить блок перед
      template(v-if="isAddBeforeVisible")
        div.v-block__add-block(key="add-before")
          v-add-block(:block="block")

      //- Настройки контейнера
      template(v-if="isContainerSettingsVisible")
        div.v-block__block-settings.v-block__block-settings_container(
          key="settings-container"
        )
          v-block-settings(:item="block")

      //- Настройки блока
      template(v-if="isContentSettingsVisible")
        div.v-block__block-settings.v-block__block-settings_content(
          key="settings-content"
        )
          v-block-settings(:item="block.content")

      //- Ловушка для блока до
      template(v-if="isTrapBeforeVisible")
        v-block-trap(
          :active="hoveredTrap === index"
          :data-trap="index"
          key="trap-before"
        )

      //- Кнопки действия блока
      template(v-if="isBlockHeaderVisible")
        div.v-block__actions(
          key="actions"
        )
          v-block-actions(
            :block="block"
          )

        //- Сам блок
      template(v-if="isBlockVisible")
        div.v-block__content(
          :class="contentClassModificators"
          key="block"
        )
          component(
            :is="contentComponent"
            :block="block.content"
          )

      //- Ловушка для блока после
      //- template(v-if="isTrapAfterVisible")
        v-block-trap(
          :active="hoveredTrap === 'after'"
          data-trap="after"
          key="trap-after"
        )

</template>

<script lang="ts">
  import Vue from "vue"
  import { mapState, mapGetters, mapMutations } from "vuex";

  import Container from "@/script/classes/Container";
  import BlockImage from "@/script/classes/BlockImage";
  import BlockText from "@/script/classes/BlockText";

  import VBlockImage from "@/components/block.blocks/VBlockImage.vue";
  import VBlockText from "@/components/block.blocks/VBlockText.vue";

  import BemClassModificatorDescriptor from "@/script/interfaces/BemClassModificatorDescriptor";

  interface componentIntarface {
    $constructBemClass: (descriptor: BemClassModificatorDescriptor) => string,
    block: Container
  }

  export default Vue.extend({
    name: "v-block",
    components: {
      // VRadioGroup
    },
    props: {
      block: {
        type: Container,
        required: true
      },
      index: {
        type: Number
      }
    },
    data() {
      return {}
    },
    computed: {
      ...mapState("design", [
        "hoveredBlock",
        "hoveredTrap",
        "movingBlock"
      ]),
      ...mapGetters([
        "isEdit"
      ]),
      ...mapGetters("design", [
        "isBlockMoving"
      ]),
      /**
       * Выбор компонента для отображения содержимого контейнера
       */
      contentComponent(): object{
        if(this.block.content instanceof BlockImage){ return VBlockImage }
        if(this.block.content instanceof BlockText){ return VBlockText }
        return VBlockText;
      },
      /**
       * Констурктор класса для модификатора внешнего отступа
       */
      blockMarginClassModificator(this: componentIntarface): string{
        return this.$constructBemClass({
          modificator: "margin",
          modificatorValue: this.block.margin
        });
      },
      /**
       * Констурктор класса для модификатора внутреннего отступа
       */
      contentPaddingClassModificator(this: componentIntarface): string{
        return this.$constructBemClass({
          element: "content",
          modificator: "padding",
          modificatorValue: this.block.padding
        });
      },
      /**
       * Констурктор класса для модификатора цвета
       */
      contentBackgroundColorClassModificator(this: componentIntarface): string{
        return this.$constructBemClass({
          element: "content",
          modificator: "background-color",
          modificatorValue: this.block.backgroundColor
        });
      },
      /**
       * Классы модификаторы блока
       */
      contentClassModificators(): string[]{
        return [
          this.contentPaddingClassModificator,
          this.contentBackgroundColorClassModificator
        ]
      },
      isHovered(){
        return this.hoveredBlock === this.block;
      },
      isAddBeforeVisible(){
        return this.isEdit && !this.isBlockMoving;
      },
      isContainerSettingsVisible(){
        return this.isEdit && !this.isBlockMoving;
      },
      isContentSettingsVisible(){
        return this.isEdit && this.block.content && !this.isBlockMoving;
      },
      isBlockSettingsVisible(){
        return this.isEdit && !this.isBlockMoving;
      },
      isTrapBeforeVisible(){
        return this.isEdit && this.isBlockMoving;
      },
      isBlockHeaderVisible(){
        return this.isEdit;
      },
      isBlockVisible(){
        return true && !this.isBlockMoving;
      },
      isTrapAfterVisible(){
        return this.isEdit && this.isBlockMoving;
      }
    },
    methods: {
      ...mapMutations("design", {
        removeBlock: "REMOVE_BLOCK"
      })
    }
  })
</script>

<style lang="scss">
  .v-block{
    position: relative;
    width: 100%;
    transition: $transition;

    user-select: none;

    &_margin{
      &_none {
        margin: 0;
      }

      @each $index, $value in $spacing {
        &_#{$index} {
          margin: {
            top: $value;
            bottom: $value;
          };
        }
      }
    }

    &__content{
      &_padding{
        &_none {
          padding: 0;
        }

        @each $index, $value in $spacing {
          &_#{$index} {
            padding: $value;
          }
        }
      }

      &_background-color{
        &_none {
          background-color: transparent;
        }

        @each $index, $value in $colors {
          &_#{$index} {
            background-color: $value;
          }
        }
      }
    }
  }
</style>