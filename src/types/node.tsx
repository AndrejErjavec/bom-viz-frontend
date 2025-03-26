import { EdgeData } from "reaflow";

export interface CustomNodeData {
  id: string;
  text: string;
  width?: number;
  height?: number;
  data: {
    type: "product" | "operation" | "material";
    isUnregistered: boolean;
    content: string;
  };
}

export interface GraphData {
  nodes: CustomNodeData[];
  edges: EdgeData[];
}
