import React from "react";
import type { NodeProps, NodeData } from "reaflow";
import { Node } from "reaflow";
import { CustomNodeData } from "../../types/node";
import { useTree } from "../../context/graphContext";
import { FaGear } from "react-icons/fa6";

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
        stroke: props.properties.data?.isUnregistered ? "#ae913b" : "#fbd052",
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
        <div className="fixed flex justify-start items-center w-full h-full">
          <div
            className="h-full px-3 flex items-center justify-center"
            style={{
              backgroundColor: `${
                props.properties.data?.isUnregistered ? "#ae913b" : "#fbd052"
              }`,
            }}
          >
            <FaGear size={18} color="white" />
          </div>
          <span className="px-2 py-2 text-center flex-1">
            {props.properties.text}
          </span>
        </div>
      </foreignObject>
    </Node>
  );
}
