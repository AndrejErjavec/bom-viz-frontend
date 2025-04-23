import { useState, useEffect } from "react";
import { formatProduct } from "../util/formatting/formatReaflow";
import type { EdgeData } from "reaflow";
import type { CustomNodeData, GraphData } from "../types/node";
import DetailsBar from "../components/DetailsBar";
import { GraphView } from "../components/GraphView";
import Search from "../components/Search";
import calculateNodeSize from "../util/calculateNodeSize";
import cloneDeep from "lodash.clonedeep";
import { useTree } from "../context/graphContext";

export const DataView = () => {
  const { graph, setGraph } = useTree();
  const [loading, setLoading] = useState(false);

  const productNumber = 1120799;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/traceability_viz_backend/api/product?productNumber=${1120799}`
      );
      const json = await response.json();
      let { nodes, edges }: { nodes: CustomNodeData[]; edges: EdgeData[] } =
        formatProduct(json);
      nodes = setNodeSize(nodes);
      setGraph({ nodes, edges });
      setGraph({ nodes, edges });
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent<any>) => {
    e.preventDefault();
  };

  const setNodeSize = (nodes: CustomNodeData[]) => {
    // return nodes.map((node) => {
    //   const { width, height } = calculateNodeSize(node, true);
    //   console.log(width, height);
    //   return {
    //     ...node,
    //     width: width,
    //     height: height,
    //   };
    // });
    return nodes.map((node) => ({
      ...node,
      width: 300,
      height: 85,
    }));
  };

  const handleSubmit = async (query: string) => {
    const response = await fetch(
      `http://localhost:8080/traceability_viz_backend/api/product/search?productNumber=${productNumber}&prompt=${query}`
    );
    const json = await response.json();
    let { nodes, edges }: { nodes: CustomNodeData[]; edges: EdgeData[] } =
      formatProduct(json);
    nodes = setNodeSize(nodes);
    setGraph({ nodes, edges });
    setGraph({ nodes, edges });
  };

  // if (loading) {
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       nalaganje
  //     </div>
  //   );
  // }

  return (
    <main>
      <Search placeholder={"Kaj želite poiskati?"} onSubmit={handleSubmit} />
      {graph && (
        <div className="flex flex-row">
          <GraphView />
          <DetailsBar />
        </div>
      )}
    </main>
  );
};

// const loadJson = async () => {
//   try {
//     const response = await fetch("/data/nested.json");
//     const json = await response.json();
//     // console.log(json);
//     let { nodes, edges }: { nodes: CustomNodeData[]; edges: EdgeData[] } =
//       formatProduct(json);
//     nodes = setNodeSize(nodes);
//     setGraph({ nodes, edges });
//   } catch (error) {
//     console.error("Error loading JSON:", error);
//   }
// };
