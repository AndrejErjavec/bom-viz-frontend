import React from "react";
import type { NodeProps, NodeData } from "reaflow";
import { Node } from "reaflow";
import { CustomNodeData } from "../../types/node";
import { useTree } from "../../context/graphContext";
import { GiStoneBlock } from "react-icons/gi";

export default function MaterialNode(props: NodeProps<CustomNodeData["data"]>) {
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
        <span className="fixed flex justify-start items-center w-full h-full">
          <div className="h-full px-3 flex items-center justify-center bg-[#fb6352]">
            <GiStoneBlock size={18} color="white" />
          </div>
          <span className="px-2 py-2 text-center flex-1">
            {props.properties.text}
          </span>
        </span>
      </foreignObject>
    </Node>
  );
}
