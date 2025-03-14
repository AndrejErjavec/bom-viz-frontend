import { useState, useEffect } from "react";
import { formatProduct } from "./util/formatting/formatReaflow";
import TreeChart from "./Plot";

function App() {
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    const loadJson = async () => {
      try {
        const response = await fetch("/data/nested.json");
        const json = await response.json();
        const { nodes, edges } = formatProduct(json);
        setGraph({ nodes, edges });
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };
    loadJson();
  }, []);

  return (
    <div>
      {graph ? (
        <TreeChart nodes={graph.nodes} edges={graph.edges} />
      ) : (
        <>loading...</>
      )}
    </div>
  );
}

export default App;
