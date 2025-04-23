import { NodeData, EdgeData } from "reaflow";

type CustomNodeExtraData = {
  type: "product" | "operation" | "material";
  isUnregistered: boolean;
  content: string;
};

/**
 * Shape of any node.
 * Extends the Reaflow.NodeData and add additional data to its "data" property.
 * Idea from: https://codesandbox.io/p/sandbox/poc-nextjs-reaflow-flblp?file=%2Fsrc%2Ftypes%2FBaseNodeData.ts%3A4%2C1-7%2C4
 */
export type CustomNodeData = NodeData<Required<CustomNodeExtraData>>;

export interface GraphData {
  nodes: CustomNodeData[];
  edges: EdgeData[];
}
