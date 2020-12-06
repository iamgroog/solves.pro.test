/**
 * Описание контейнера c текстом
 */
export default class BlockText {
  size: string;
  align: "left" | "center" | "right";
  color: string;
  text: string;

  constructor(text: string = "") {
    this.text = text;
    this.size = "medium";
    this.color = "black";
    this.align = "left"
  }
}