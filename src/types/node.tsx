import { EdgeData } from "reaflow";

export interface CustomNodeData {
  id: string;
  text: string;
  data: {
    type: "product" | "operation" | "material";
    content: string;
  };
}

export interface GraphData {
  nodes: CustomNodeData[];
  edges: EdgeData[];
}
