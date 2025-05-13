import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { CustomNodeData } from "../types/node";
import { EdgeData } from "reaflow";
import { formatProduct } from "../util/formatting/formatReaflow";
import setNodeSize from "../util/setNodeSize";
import { useTree } from "../context/graphContext";
import { divide } from "lodash";

export default function ProductSearch() {
  const { graph, setGraph, isSearchView, setIsSearchView } = useTree();

  const [query, setQuery] = useState("");

  const searchParameters = async () => {
    const response = await fetch(
      `http://localhost:8080/traceability_viz_backend/api/product/search?productNumber=${1120799}&prompt=${query}`
    );

    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message);
    }
    return response.json();
  };

  const { data, isError, error, isFetching, refetch } = useQuery({
    queryFn: () => searchParameters(),
    queryKey: ["parameterSearch"],
    enabled: false,
    retry: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (data) {
      setIsSearchView(true);
      setQuery("");
      let { nodes, edges }: { nodes: CustomNodeData[]; edges: EdgeData[] } =
        formatProduct(data);
      nodes = setNodeSize(nodes);
      setGraph({ nodes, edges });
    }
  }, [data]);

  return (
    <>
      <div className="min-w-3xl z-40">
        <form onSubmit={handleSearch}>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              value={query}
              placeholder={"Kaj želite poiskati"}
              onChange={handleChange}
              className="px-3 py-2 border-1 border-gray-300 rounded-md flex-1 shadow-xs bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-x min-w-22"
            >
              {isFetching ? "..." : "Iskanje"}
            </button>
          </div>
        </form>
      </div>
      {isError && (
        <div className="text-red-500 font-medium">{error.message}</div>
      )}
    </>
  );
}
