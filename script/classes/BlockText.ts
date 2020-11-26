/**
 * Описание контейнера c текстом
 */
export default class BlockText {
  size: number;
  align: "left" | "center" | "right";
  color: string;
  text: string;

  constructor(text: string = "") {
    this.text = text;
    this.size = 16;
    this.color = "black";
    this.align = "left"
  }
}