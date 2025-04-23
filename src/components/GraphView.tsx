import React from "react";
import debounce from "lodash.debounce";
import { Space } from "react-zoomable-ui";
import { Canvas } from "reaflow";
import type { ElkRoot } from "reaflow";
import { CustomNodeData } from "../types/node";
import CustomNode from "./CustomNode";
import { useTree } from "../context/graphContext";
import { cloneDeep } from "lodash";

const layoutOptions = {
  // "elk.layered.compaction.postCompaction.strategy": "EDGE_LENGTH",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
};

const GraphCanvas = () => {
  const [paneWidth, setPaneWidth] = React.useState(2000);
  const [paneHeight, setPaneHeight] = React.useState(2000);
  const { graph, setGraph, centerView } = useTree();

  const onLayoutChange = React.useCallback(
    (layout: ElkRoot) => {
      if (layout.width && layout.height) {
        console.log(layout.width, layout.height);
        const areaSize = layout.width * layout.height;
        const changeRatio = Math.abs(
          (areaSize * 100) / (paneWidth * paneHeight) - 100
        );

        setPaneWidth(layout.width + 50);
        setPaneHeight((layout.height as number) + 50);
        setTimeout(() => {
          // validateHiddenNodes();
          window.requestAnimationFrame(() => {
            if (changeRatio > 70) centerView();
            // setLoading(false);
          });
        });
      }
    },
    [paneHeight, paneWidth, centerView]
  );

  const updateCurrentNode = (nodeData: CustomNodeData): void => {
    const id = nodeData.id;
    console.log("Updating current node with", nodeData);
    const nodeToUpdateIndex = graph!.nodes.findIndex(
      (node: CustomNodeData) => node.id === id
    );
    console.log("updateCurrentNode nodeToUpdateIndex", nodeToUpdateIndex);
    const nodeToUpdate = {
      ...graph?.nodes[nodeToUpdateIndex],
      ...nodeData,
      id, // Force keep same id to avoid edge cases
    };
    console.log("updateCurrentNode updated node", nodeToUpdate);

    const newNodes = cloneDeep(graph!.nodes);
    newNodes[nodeToUpdateIndex] = nodeToUpdate;
    console.log("updateCurrentNode new nodes", newNodes);

    const edges = graph!.edges;
    setGraph({ nodes: newNodes, edges });
  };

  return (
    <Canvas
      className="canvas"
      onLayoutChange={onLayoutChange}
      node={(p) => (
        <CustomNode node={p} updateCurrentNode={updateCurrentNode} />
      )}
      nodes={graph?.nodes}
      edges={graph?.edges}
      arrow={null}
      maxHeight={paneHeight}
      maxWidth={paneWidth}
      height={paneHeight}
      width={paneWidth}
      direction="RIGHT"
      layoutOptions={layoutOptions}
      key={"canvas"}
      pannable={false}
      zoomable={false}
      animated={false}
      readonly={true}
      dragEdge={null}
      dragNode={null}
      fit={false}
    />
  );
};

export const GraphView = () => {
  const { viewPort, setViewPort } = useTree();

  const blurOnClick = React.useCallback(() => {
    if ("activeElement" in document)
      (document.activeElement as HTMLElement)?.blur();
  }, []);

  const debouncedOnZoomChangeHandler = debounce(() => {
    setViewPort(viewPort!);
  }, 300);

  return (
    <div
      className="w-full h-screen absolute"
      onContextMenu={(e) => e.preventDefault()}
      onClick={blurOnClick}
      key={String("asd")}
    >
      <Space
        onUpdated={() => debouncedOnZoomChangeHandler()}
        onCreate={setViewPort}
        onContextMenu={(e) => e.preventDefault()}
        pollForElementResizing
        className="space"
      >
        <GraphCanvas />
      </Space>
    </div>
  );
};
