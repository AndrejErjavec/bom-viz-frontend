import { CustomNodeData } from "../types/node";
import { Constants } from "./constants";

export default function setNodeSize(nodes: CustomNodeData[]) {
  return nodes.map((node) => ({
    ...node,
    width: Constants.NODE_BASE_WIDTH,
    height: Constants.NODE_BASE_HEIGHT,
  }));
}
