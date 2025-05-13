import { useState, useEffect } from "react";
import { formatProduct } from "../util/formatting/formatReaflow";
import type { EdgeData } from "reaflow";
import type { CustomNodeData, GraphData } from "../types/node";
import DetailsBar from "../components/DetailsBar";
import { GraphView } from "../components/GraphView";
import Search from "../components/Search";
import { useTree } from "../context/graphContext";
import { LoadingOverlay } from "@mantine/core";
import { useParams, useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import setNodeSize from "../util/setNodeSize";
import ProductSearch from "../components/ProductSearch";

export const DataView = () => {
  const {
    graph,
    setGraph,
    isSearchView,
    setIsSearchView,
    isLoading,
    setIsLoading,
  } = useTree();

  // const productNumber = 1120799;
  const { productNumber } = useParams();

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:8080/traceability_viz_backend/api/product?productNumber=${productNumber}`
    );
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message);
    }
    return response.json();
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["graphData"],
    queryFn: () => fetchData(),
    retry: false,
  });

  useEffect(() => {}, [isError]);

  useEffect(() => {
    if (data) {
      let { nodes, edges }: { nodes: CustomNodeData[]; edges: EdgeData[] } =
        formatProduct(data);
      nodes = setNodeSize(nodes);
      setGraph({ nodes, edges });
    }
  }, [data]);

  const productName = graph?.nodes[0].text;

  if (error) {
    return (
      <div className="flex w-full h-screen justify-center items-center bg-white text-xl">
        {error.message}
      </div>
    );
  }

  return (
    <>
      {/* <LoadingOverlay visible={isLoading} /> */}
      {isLoading && (
        <div className="fixed w-full h-screen flex justify-center items-center bg-white text-xl z-50">
          nalaganje...
        </div>
      )}
      <main>
        <div className="absolute top-3 left-3 z-40">
          <div className="text-2xl">{productName}</div>
          <ProductSearch />
        </div>
        {graph && (
          <div className="flex flex-row">
            <GraphView />
            <DetailsBar />
          </div>
        )}
      </main>
    </>
  );
};
