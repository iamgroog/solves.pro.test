type Mode = "edit" | "preview";
interface RootState {
  mode: Mode;
}

export const state = () : RootState => ({
  mode: "edit"
})

export const getters = {
  isEdit(state: RootState): boolean{
    return state.mode === "edit";
  },
  isPreview(state: RootState): boolean{
    return state.mode === "preview";
  }
}

export const mutations = {
  /**
   * Изменить режим отображения
   * @param {Object} state Хранилище
   * @param {String} mode Режим отображения
   */
  CHANGE_MODE(state: RootState, mode: Mode = "edit"){
    state.mode = mode;
  }
}