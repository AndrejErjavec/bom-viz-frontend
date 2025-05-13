import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Node } from "reaflow";
import { useTree } from "../../context/graphContext";
import { FaGear } from "react-icons/fa6";
import { CustomNodeData } from "../../types/node";
import { Props } from ".";
import { Constants } from "../../util/constants";
import { SpaceContext } from "react-zoomable-ui";
import NodeDropDown from "./NodeDropDown";

export default function OperationNode({ node, updateCurrentNode }: Props) {
  const { isSearchView } = useTree();
  const { setSelectedNode } = useTree();

  const contentRef = useRef<HTMLDivElement | null>(null);

  const { viewPort } = useContext(SpaceContext);
  const zoom = viewPort.zoomFactor; // 1 = 100%, 2 = 200%, etc.

  const nodeData = node.properties.data;

  const [dropDownOpen, setDropDownOpen] = useState(
    isSearchView ? nodeData!.content.parameters.length > 0 : false
  );

  useEffect(() => {}, [dropDownOpen]);

  const handleNodeClick = (
    e: React.MouseEvent<SVGGElement, MouseEvent>,
    data: CustomNodeData
  ) => {
    setSelectedNode(data);
    setDropDownOpen((curr) => !curr);
  };

  const handleClick = () => {
    setDropDownOpen((curr) => !curr);
  };

  // const updateNodeHeight = () => {
  //   if (!contentRef.current) return;
  //   let { width, height } = contentRef.current.getBoundingClientRect();
  //   const baseHeight = height / zoom + Constants.NODE_BASE_HEIGHT;
  //   if (Math.abs(baseHeight - node.height) > 0.5) {
  //     updateCurrentNode({
  //       height: baseHeight,
  //     });
  //   }
  // };

  const updateNodeHeight = useCallback(() => {
    if (!contentRef.current) return;
    const { height } = contentRef.current.getBoundingClientRect();
    const baseHeight = height / zoom + Constants.NODE_BASE_HEIGHT;

    if (Math.abs(baseHeight - node.height) > 0.5) {
      updateCurrentNode({ height: baseHeight });
    }
  }, [zoom, node.height, updateCurrentNode]);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(() => {
      updateNodeHeight();
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [dropDownOpen, zoom, node.height, nodeData]);

  return (
    <Node
      {...node}
      label={null as any}
      // onClick={handleNodeClick}
      style={{
        fill: "#ffffff",
        stroke: node.properties.data?.isUnregistered ? "#ae913b" : "#fbd052",
        strokeWidth: 1.5,
        cursor: "pointer",
      }}
    >
      <foreignObject
        width={node.width}
        height={node.height}
        x={0}
        y={0}
        style={{ pointerEvents: "auto" }}
      >
        <div className="fixed w-full h-full">
          <div
            className="flex justify-start items-center"
            style={{ height: Constants.NODE_BASE_HEIGHT, cursor: "pointer" }}
            onClick={handleClick}
          >
            <div
              className="h-full px-3 flex items-center justify-center"
              style={{
                backgroundColor: `${
                  node.properties.data?.isUnregistered ? "#ae913b" : "#fbd052"
                }`,
              }}
            >
              <FaGear size={18} color="white" />
            </div>
            <span className="px-2 py-2 text-center flex-1">
              {node.properties.text}
            </span>
          </div>

          <div ref={contentRef}>
            <NodeDropDown data={nodeData} open={dropDownOpen} />
          </div>
        </div>
      </foreignObject>
    </Node>
  );
}
