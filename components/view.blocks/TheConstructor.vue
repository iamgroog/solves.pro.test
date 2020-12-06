<template lang="pug">
  div.the-constructor(
    @touchmove="onTouchMove"
    @touchstart="onTouchMove"
    @touchend="onMoveBlock"
  )
    t-collapse.the-constructor__blocks(
      tag="div"
      :duration="0.3"
    )
      //- Если еще не добавлено ни одного блока
      template(v-if="isEmpty")
        div.the-constructor__empty(
          key="empty"
        )
          h1 Пусто
          div Создайте свой уникальный шаблон из блоков

      //- Если есть блоки
      template(v-for="(block, index) in blocks")
        v-block(
          :block="block"
          :index="index"
          :key="block.id"
        )

      template(v-if="isTrapLastVisible")
        v-block-trap(
          :active="hoveredTrap === (blocks.length + 1)"
          :data-trap="blocks.length + 1"
          key="trap-last"
        )

      template(
        v-if="isAddLastVisible"
      )
        div.the-constructor__add-block(
          key="add-last"
        )
          v-add-block

    template(v-if="isBlockMoving")
      v-moving-block(
        :touch-move-event="touchMoveEvent"
      )

</template>

<script lang="ts">
  import Vue from "vue";
  import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
  import { DesignMutations, DesignState, DesignGetters, DesignActions } from "store/design";

  interface TheConstructorData {
    touchMoveEvent: TouchEvent | undefined
  }

  interface ComponentInterface extends DesignState, DesignGetters, DesignMutations, DesignActions, TheConstructorData {};

  export default Vue.extend({
    name: "the-constructor",
    data(): TheConstructorData{
      return {
        touchMoveEvent: undefined
      }
    },
    computed: {
      ...mapState("design", [
        "blocks",
        "hoveredBlock",
        "hoveredTrap"
      ]),
      ...mapGetters([
        "isEdit"
      ]),
      ...mapGetters("design", [
        "isEmpty",
        "isBlockMoving"
      ]),
      isAddLastVisible(){
        return this.isEdit && !this.isBlockMoving;
      },
      isTrapLastVisible(){
        return this.isEdit && this.isBlockMoving;
      }
    },
    methods: {
      ...mapMutations("design", {
        setHoveredBlockById: "SET_HOVERED_BLOCK_BY_ID",
        setHoveredTrap: "SET_HOVERED_TRAP"
      }),
      ...mapActions("design", [
        "moveBlock"
      ]),
      onTouchMove(this: ComponentInterface, e: TouchEvent){
        const target = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
        const closestElement: HTMLElement | null | undefined = target?.closest("[data-block-id]");

        if(closestElement) {
          const blockId = Number(closestElement?.dataset?.blockId);
          if(this.hoveredBlock?.id !== blockId){
            this.setHoveredBlockById(blockId);
          }
        } else if(this.hoveredBlock) {
          this.setHoveredBlockById();
        }

        const closestTrap: HTMLElement | null | undefined = target?.closest("[data-trap]");
        if(closestTrap) {
          const trapIndex = Number(closestTrap.dataset.trap);
          if(this.hoveredTrap !== Number(closestTrap.dataset.trap)) {
            this.setHoveredTrap(trapIndex);
          }
        } else if (this.hoveredTrap){
          this.setHoveredTrap()
        }

        if(this.isBlockMoving) {
          this.touchMoveEvent = e;
        } else if (this.touchMoveEvent) {
          this.touchMoveEvent = undefined;
        }
      },
      onMoveBlock(this: ComponentInterface){
        // console.log("TheConstructor :: onMoveBlock", { index: this.hoveredTrap });
        if (this.hoveredTrap !== undefined) {
          this.moveBlock({ newIndex: this.hoveredTrap });
        }
      }
    }
  })
</script>

<style lang="scss">
  .the-constructor{
    position: relative;

    &__empty {
      padding: 5px;
      text-align: center;
    }
  }
</style>