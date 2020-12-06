import Vue from "vue";
import getBemClass from "@/script/getBemClass";
import BemClassModificatorDescriptor from "@/script/interfaces/BemClassModificatorDescriptor"

declare module "vue/types/vue" {
  interface Vue {
    $constructBemClass(descriptor: BemClassModificatorDescriptor): string
  }
}

/**
 * Констркутор классов по БЭМ для комопнента
 * @param params Входные параметры
 * @param params.element Элемент
 * @param params.modificator Модификатор
 * @param params.modificatorValue Значение модификатора
 * @return Класс модификатор по БЭМ
 */
Vue.prototype.$constructBemClass = function constructBemClass(
  { element, modificator, modificatorValue }: BemClassModificatorDescriptor
) {
  const block = this.$options.name || "unknown-block";
  return getBemClass(block, element, modificator, modificatorValue);
}
