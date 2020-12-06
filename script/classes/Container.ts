import BlockText from "@/script/classes/BlockText";
import BlockImage from "@/script/classes/BlockImage";

/**
 * Описание контейнера для блока конструктора
 */
export default class Container {
  id: number;
  padding: string;
  margin: string;
  backgroundColor: string;
  content: BlockText | BlockImage | undefined;

  constructor(id: number) {
    this.id = id;
    this.padding = "none";
    this.margin = "none"
    this.backgroundColor = "none";
    this.content = undefined;
  }
}