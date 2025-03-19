import React from "react";
import type { NodeProps, NodeData } from "reaflow";
import { Node } from "reaflow";
import { CustomNodeData } from "../../types/node";
import { useTree } from "../../context/graphContext";

export default function MaterialNode(props: NodeProps<CustomNodeData["data"]>) {
  const { node, setSelectedNode } = useTree();

  const handleClick = (
    e: React.MouseEvent<SVGGElement, MouseEvent>,
    data: NodeData
  ) => {
    setSelectedNode(data);
  };
  return (
    <Node
      {...props}
      label={null as any}
      onClick={handleClick}
      style={{
        fill: "#ffffff",
        stroke: "#fb6352",
        strokeWidth: 1.5,
      }}
    >
      <foreignObject
        width={props.width}
        height={props.height}
        x={0}
        y={0}
        style={{ pointerEvents: "none" }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            fontSize: "14px",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {props.properties.text}
        </span>
      </foreignObject>
    </Node>
  );
}
