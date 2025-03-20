import React from "react";
import type { NodeProps, NodeData } from "reaflow";
import { Node } from "reaflow";
import { CustomNodeData } from "../../types/node";
import { useTree } from "../../context/graphContext";

export default function OperationNode(
  props: NodeProps<CustomNodeData["data"]>
) {
  const { setSelectedNode } = useTree();

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
        stroke: props.properties.data?.isUnregistered ? "#7d6829" : "#fbd052",
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
          }}
        >
          {props.properties.text}
        </span>
      </foreignObject>
    </Node>
  );
}
