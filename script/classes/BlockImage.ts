/**
 * Описание контейнера c текстом
 */
export default class BlockImage {
  name: string;
  size: "cover" | "contain";

  constructor(name: string = "") {
    this.name = name;
    this.size = "cover";
  }
}