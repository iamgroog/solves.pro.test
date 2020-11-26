import spacing from "@/script/interfaces/spacing";
import BlockText from "@/script/classes/BlockText";
import BlockImage from "@/script/classes/BlockImage";

/**
 * Описание контейнера для блока конструктора
 */
export default class Container {
  id: number;
  padding: spacing;
  margin: spacing;
  backgroundColor: string;
  content: BlockText | BlockImage | undefined;

  constructor(id: number) {
    const defaultPadding = 5;
    const defaultMarging = 0;
    const defaultBackground = "transparent";

    this.id = id;
    this.padding = {
      bottom: defaultPadding,
      left: defaultPadding,
      right: defaultPadding,
      top: defaultPadding
    }
    this.margin = {
      bottom: defaultMarging,
      left: defaultMarging,
      right: defaultMarging,
      top: defaultMarging
    }
    this.backgroundColor = defaultBackground;
    this.content = undefined;
  }
}