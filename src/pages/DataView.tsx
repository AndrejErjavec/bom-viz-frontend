import { useState, useEffect } from "react";
import { useTree } from "../context/graphContext";
import { formatProduct } from "../util/formatting/formatReaflow";
import type { EdgeData } from "reaflow";
import type { CustomNodeData, GraphData } from "../types/node";
import GraphCanvas from "../GraphCanvas";
import ProductDetailsBar from "../ProductDetailsBar";

export const DataView = () => {
  const [graph, setGraph] = useState<GraphData | null>(null);
  const { selectedProduct } = useTree();

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
    <main
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
      }}
    >
      {graph && (
        <>
          <GraphCanvas nodes={graph.nodes} edges={graph.edges}></GraphCanvas>
          <ProductDetailsBar />
        </>
      )}
    </main>
  );
};
