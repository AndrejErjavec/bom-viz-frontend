import React, { useState } from "react";
import { Node } from "reaflow";
import { useTree } from "../../context/graphContext";
import { FaGear } from "react-icons/fa6";
import { CustomNodeData } from "../../types/node";
import { NodeProps213 } from ".";

export default function OperationNode({
  node,
  updateCurrentNode,
}: NodeProps213) {
  const [open, setOpen] = useState(false);
  const { setSelectedNode } = useTree();

  console.log(node.width, node.height);

  const handleClick = (
    e: React.MouseEvent<SVGGElement, MouseEvent>,
    data: CustomNodeData
  ) => {
    setSelectedNode(data);
    setOpen((curr) => !curr);
  };

  return (
    <Node
      {...node}
      label={null as any}
      onClick={handleClick}
      style={{
        fill: "#ffffff",
        stroke: node.properties.data?.data?.isUnregistered
          ? "#ae913b"
          : "#fbd052",
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
        <div className="fixed w-full h-full">
          <div className="flex justify-start items-center w-full h-full">
            <div
              className="h-full px-3 flex items-center justify-center"
              style={{
                backgroundColor: `${
                  node.properties.data ? "#ae913b" : "#fbd052"
                }`,
              }}
            >
              <FaGear size={18} color="white" />
            </div>
            <span className="px-2 py-2 text-center flex-1">
              {node.properties.text}
            </span>
          </div>

          {open && (
            <div>
              <p>this node is open</p>
              <p>this node is open</p>
              <p>this node is open</p>
              <p>this node is open</p>
            </div>
          )}
        </div>
      </foreignObject>
    </Node>
  );
}
