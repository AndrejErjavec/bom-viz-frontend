import type { NodeProps } from "reaflow";
import ProductNode from "./ProductNode";
import OperationNode from "./OperationNode";
import MaterialNode from "./MaterialNode";
import { CustomNodeData } from "../../types/node";

export default function CustomNode(props: NodeProps<CustomNodeData["data"]>) {
  const nodeData = props.properties.data;
  switch (nodeData?.type) {
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
