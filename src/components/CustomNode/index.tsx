import ProductNode from "./ProductNode";
import OperationNode from "./OperationNode";
import MaterialNode from "./MaterialNode";
import type { CustomNodeData, CustomNodeExtraData } from "../../types/node";
import { NodeProps } from "reaflow";
import { cloneDeep } from "lodash";
import { useTree } from "../../context/graphContext";

export interface Props {
  node: NodeProps<CustomNodeExtraData>;
  updateCurrentNode: (data: Partial<CustomNodeData>) => void;
}

export default function CustomNode(props: NodeProps) {
  const { setSelectedNode, graph, setGraph } = useTree();

  const id = props.properties.id;

  // from: https://codesandbox.io/p/sandbox/poc-nextjs-reaflow-flblp?file=%2Fsrc%2Fcomponents%2Feditor%2FCanvasContainer.tsx%3A65%2C22
  const updateCurrentNode = (nodeData: Partial<CustomNodeData>): void => {
    const nodeToUpdateIndex = graph!.nodes.findIndex(
      (node: CustomNodeData) => node.id === id
    );
    const nodeToUpdate = {
      ...graph?.nodes[nodeToUpdateIndex],
      ...nodeData,
      id, // Force keep same id to avoid edge cases
    };

    const newNodes = cloneDeep(graph!.nodes);
    newNodes[nodeToUpdateIndex] = nodeToUpdate;

    const edges = graph!.edges;
    setGraph({ nodes: newNodes, edges });
  };

  switch (props.properties.data?.type) {
    case "product":
      return <ProductNode node={props} updateCurrentNode={updateCurrentNode} />;
    case "operation":
      return (
        <OperationNode node={props} updateCurrentNode={updateCurrentNode} />
      );
    case "material":
      return (
        <MaterialNode node={props} updateCurrentNode={updateCurrentNode} />
      );
    default:
      return null;
  }
}
