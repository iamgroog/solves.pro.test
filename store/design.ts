import Container from "@/script/classes/Container";
import BlockText from "@/script/classes/BlockText";
import BlockImage from "@/script/classes/BlockImage";
export interface DesignState {
  counter: number;
  blocks: Container[],
  movingBlock: Container | undefined,
  hoveredBlock: Container | undefined,
  hoveredTrap: number | undefined
}

type blockTypes = "image" | "text";

export const state = () : DesignState => ({
  counter: 0,
  blocks: [],
  movingBlock: undefined,
  hoveredBlock: undefined,
  hoveredTrap: undefined
})

export interface DesignGetters {
  isEmpty: boolean,
  isBlockMoving: boolean,
  getBlockIndex: (block?: Container) => number
}
interface Getters {
  isEmpty: (state: DesignState) => boolean,
  isBlockMoving: (state: DesignState) => boolean,
  getBlockIndex: (state: DesignState) => (block?: Container) => number
}

export const getters = {
  /**
   * Если еще не создано ни одного блока
   */
  isEmpty(state) {
    return !state.blocks.length;
  },
  /**
   * Перемещается ли предмет
   */
  isBlockMoving(state) {
    return Boolean(state.movingBlock);
  },
  /**
   * Получить текущий индекс блока
   */
  getBlockIndex: state => (block) => {
    return state.blocks.findIndex(checkingBlock => checkingBlock === block);
  }
} as Getters

export interface DesignMutations {
  updateCounter: () => void,
  addBlock: ({ block, index }: { block: Container, index: number }) => void,
  removeBlock: (block: Container) => void,
  setMovingBlock: (block: Container) => void,
  changeProperty: ({ item, property, value }: { item: Record<string, string>, property: string, value: string }) => void,
  setHoveredBlockById: (id?: number) => void,
  setHoveredTrap: (index?: number) => void
}
interface Mutations {
  UPDATE_COUNTER: (state: DesignState) => void,
  ADD_BLOCK: (state: DesignState, { block, index }: { block: Container, index: number }) => void,
  REMOVE_BLOCK: (state: DesignState, block: Container) => void,
  SET_MOVING_BLOCK: (state: DesignState, block: Container) => void,
  CHANGE_PROPERTY: (state: DesignState, { item, property, value }: { item: Record<string, string>, property: string, value: string }) => void,
  SET_HOVERED_BLOCK_BY_ID: (state: DesignState, id?: number) => void,
  SET_HOVERED_TRAP: (state: DesignState, index?: number) => void
}

export const mutations = {
  /**
   * Увеличить счетчик
   * @param state Стор
   */
  UPDATE_COUNTER(state){
    state.counter++
  },
  /**
   * Добавление блока в массив
   * @param state Стор
   * @param payload Данные
   * @param payload.block Элемент
   * @param payload.index Индекс для вставки элемента
   */
  ADD_BLOCK(state, { block, index }){
    // Если индекс не указан, то добавить в конец
    // или индекс выходит за пределы
    const isEmpty = index === undefined;
    const isIndexToLow = index < 0;
    const isIndexToLarge = index >= state.blocks.length;
    // console.log("Store :: design :: ADD_BLOCK", { block, index, isEmpty, isIndexToLow, isIndexToLarge });

    if (isEmpty || isIndexToLow || isIndexToLarge) {
      state.blocks.push(block);
    } else {
      state.blocks.splice(index, 0, block);
    }
  },
  /**
   * Удалить блок
   * @param state Стор
   * @param block Блок
   */
  REMOVE_BLOCK(state, block){
    const index = state.blocks.findIndex(item => item === block);
    // console.log("Store :: design :: REMOVE_BLOCK", { block, index });

    if(index >= 0){
      state.blocks.splice(index, 1);
    }
  },
  /**
   * Установить перемещаемый блок
   * @param state Стор
   * @param block Блок
   */
  SET_MOVING_BLOCK(state, block){
    state.movingBlock = block;
  },
  /**
   * Изменить запись стора описании блока
   * @param _state Стор
   * @param payload
   * @param payload.item Блок
   * @param payload.property Свойство
   * @param payload..value Значение
   */
  CHANGE_PROPERTY(_state, { item, property, value }){
      item[property] = value;
  },
  /**
   * Установить id блока по пальцем пользователя, если есть
   * @param state Стор
   * @param id Идентификатор
   */
  SET_HOVERED_BLOCK_BY_ID(state, id){
    const block = state.blocks.find(block => block.id === id)
    state.hoveredBlock = block;
  },
  /**
  * Установить индекс ловушки для захватат блока при перемещении
  * @param state Стор
  * @param index Идентификатор
  */
  SET_HOVERED_TRAP(state, index){
    state.hoveredTrap = index;
  }
} as Mutations

export interface DesignActions {
  createBlock: ({ blockType, index }: {blockType: blockTypes, index?: number}) => void,
  moveBlock: ({ newIndex }: {newIndex?: number}) => void,
}
interface Actions {
  createBlock: (
    { state, commit }: {state: DesignState, commit: any },
    { blockType, index }: {blockType: blockTypes, index?: number}) => void,
  moveBlock: (
    { state, commit, getters }: {state: DesignState, commit: any, getters: DesignGetters },
    { newIndex }: {newIndex?: number}
  ) => void,
}

export const actions = {
 /**
   * Создание блока
   * @param state Стор
   * @param blockType Тип блока
   */
  createBlock({ state, commit }, { blockType = "text", index }){
    commit("UPDATE_COUNTER");
    const block = new Container(state.counter);

    switch (blockType){
      case "image": block.content = new BlockImage(); break;
      case "text":
      default: block.content = new BlockText();
    }

    commit("ADD_BLOCK", { block, index });
  },
  moveBlock({ state, commit, getters }, { newIndex }: { newIndex?: number }){
    const block = state.movingBlock;
    const oldIndex = getters.getBlockIndex(block);
    let safeNewIndex = state.blocks.length;

    if(Number(newIndex) in state.blocks) {
      safeNewIndex = Number(newIndex);
    }

    if(safeNewIndex > oldIndex) {
      commit("ADD_BLOCK", { block, index: safeNewIndex });
    }

    if(safeNewIndex !== oldIndex){
      commit("REMOVE_BLOCK", block);
    }

    if(safeNewIndex < oldIndex){
      commit("ADD_BLOCK", { block, index: safeNewIndex });
    }
  }
} as Actions

export default {
  namespased: true,
  state,
  getters,
  mutations,
  actions
}