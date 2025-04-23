import ProductNode from "./ProductNode";
import OperationNode from "./OperationNode";
import MaterialNode from "./MaterialNode";
import type { CustomNodeData } from "../../types/node";
import { NodeProps } from "reaflow";

export interface NodeProps213 {
  node: NodeProps<CustomNodeData>;
  updateCurrentNode: (nodeData: CustomNodeData) => void;
}

export default function CustomNode(props: NodeProps213) {
  const nodeData = props.node.properties.data;

  console.log(props.node);

  switch (nodeData?.data?.type) {
    case "product":
      return (
        <ProductNode
          node={props.node}
          updateCurrentNode={props.updateCurrentNode}
        />
      );
    case "operation":
      return (
        <OperationNode
          node={props.node}
          updateCurrentNode={props.updateCurrentNode}
        />
      );
    case "material":
      return (
        <MaterialNode
          node={props.node}
          updateCurrentNode={props.updateCurrentNode}
        />
      );
    default:
      return null;
  }
}
