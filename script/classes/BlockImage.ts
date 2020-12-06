/**
 * Описание контейнера c текстом
 */
export default class BlockImage {
  url: string;
  size: "cover" | "contain";

  constructor(url: string = "") {
    this.url = url;
    this.size = "cover";
  }
}