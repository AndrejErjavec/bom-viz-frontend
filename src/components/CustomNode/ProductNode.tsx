import React from "react";
import { Node } from "reaflow";
import type { CustomNodeData } from "../../types/node";
import { useTree } from "../../context/graphContext";
import { BsBoxFill } from "react-icons/bs";
import { Props } from ".";

export default function ProductNode({ node, updateCurrentNode }: Props) {
  const { setSelectedNode } = useTree();

  const handleClick = (
    e: React.MouseEvent<SVGGElement, MouseEvent>,
    data: CustomNodeData
  ) => {
    setSelectedNode(data);
  };

  return (
    <Node
      {...node}
      label={null as any}
      onClick={handleClick}
      style={{
        fill: "#ffffff",
        stroke: "#52affb",
        strokeWidth: 1.5,
      }}
    >
      <foreignObject
        width={node.width}
        height={node.height}
        x={0}
        y={0}
        style={{ pointerEvents: "none" }}
      >
        <div className="fixed flex justify-start items-center w-full h-full">
          <div className="h-full px-3 flex items-center justify-center bg-[#52affb]">
            <BsBoxFill size={18} color="white" />
          </div>
          <span className="px-2 py-2 text-center flex-1">
            {node.properties.text}
          </span>
        </div>
      </foreignObject>
    </Node>
  );
}
