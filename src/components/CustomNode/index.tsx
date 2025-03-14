import { Node } from "reaflow";
import type { NodeProps, NodeData } from "reaflow";
import ProductNode from "./ProductNode";
import OperationNode from "./OperationNode";
import MaterialNode from "./MaterialNode";

export interface CustomNodeData {
  id: string;
  text: string;
  data: {
    type: "product" | "operation" | "material";
    name: string;
  };
}

export default function CustomNode(props: NodeProps<CustomNodeData["data"]>) {
  switch (props.properties.data?.type) {
    case "product":
      return <ProductNode {...props} />;
    case "operation":
      return <OperationNode {...props} />;
    case "material":
      return <MaterialNode {...props} />;
    default:
      return null;
  }
}
