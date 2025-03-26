import { useState, useEffect } from "react";
import { formatProduct } from "../util/formatting/formatReaflow";
import type { EdgeData } from "reaflow";
import type { CustomNodeData, GraphData } from "../types/node";
import GraphCanvas from "../components/GraphCanvas";
import DetailsBar from "../components/DetailsBar";

export const DataView = () => {
  const [graph, setGraph] = useState<GraphData | null>(null);

  useEffect(() => {
    const loadJson = async () => {
      try {
        const response = await fetch("/data/nested.json");
        const json = await response.json();
        const { nodes, edges }: { nodes: CustomNodeData[]; edges: EdgeData[] } =
          formatProduct(json);
        setGraph({ nodes, edges });
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };
    loadJson();
  }, []);

  return (
    <main>
      {graph && (
        <div className="flex flex-row">
          <GraphCanvas nodes={graph.nodes} edges={graph.edges}></GraphCanvas>
          <DetailsBar />
        </div>
      )}
    </main>
  );
};
