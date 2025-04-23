import { NodeProps } from "reaflow";
import { CustomNodeData } from "../types/node";
import { createRoot } from "react-dom/client";
import { FaGear } from "react-icons/fa6";

const calculateNodeSize = (
  props: CustomNodeData,
  isOpen: boolean
): { width: number; height: number } => {
  const container = document.createElement("div");
  const dummyNode = (
    <div>
      <div style={{ width: 300, height: 85 }}>
        <div className="w-full h-full">
          <div className="flex justify-start items-center w-full h-full">
            <div
              className="h-full px-3 flex items-center justify-center"
              style={{
                backgroundColor: `${
                  props.data.isUnregistered ? "#ae913b" : "#fbd052"
                }`,
              }}
            >
              <FaGear size={18} color="white" />
            </div>
            <span className="px-2 py-2 text-center flex-1">{props.text}</span>
          </div>
        </div>
      </div>

      <div>
        <p>this node is open</p>
        <p>this node is open</p>
        <p>this node is open</p>
        <p>this node is open</p>
      </div>
    </div>
  );

  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(dummyNode);
  const measured = container.firstElementChild as HTMLElement;
  const rect = measured.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  document.body.removeChild(container);

  return {
    width,
    height,
  };
};

export default calculateNodeSize;
