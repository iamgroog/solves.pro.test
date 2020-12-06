/**
 * Возвращает css класс по БЭМ
 * @param block Название блока
 * @param element Название элемента
 * @param modificator Название модификатора
 * @param modificatorValue Значение модификатора
 * @return CSS класс формата "block__element_modificator_modificator-value"
 */
export default function getBEMClass(
  block: string,
  element?: string,
  modificator?: string,
  modificatorValue?: string
): string {
  let resultClass = `${block}`;

  /* Если есть элемент */
  if (element) {
    resultClass += `__${element}`;
  }

  /* Если есть модификатор */
  if (modificator) {
    resultClass += `_${modificator}`;
  }

  /* Если есть модификатор */
  if (modificatorValue) {
    resultClass += `_${modificatorValue}`;
  }

  return resultClass;
};
