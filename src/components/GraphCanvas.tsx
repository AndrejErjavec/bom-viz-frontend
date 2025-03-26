import { useState, useCallback, useEffect } from "react";
import { Canvas, CanvasPosition } from "reaflow";
import { Space } from "react-zoomable-ui";
import CustomNode from "../components/CustomNode";
import { GraphData } from "../types/node";

const GraphCanvas = ({ nodes, edges }: GraphData) => {
  const [height, setHeight] = useState(2000);
  const [width, setWidth] = useState(2000);

  const layoutOptions = {
    // "elk.algorithm": "radial",
    "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  };

  const onLayoutChange = useCallback(
    (layout: any) => {
      if (layout.width && layout.height) {
        console.log(layout.width, layout.height);
        const areaSize = layout.width * layout.height;
        const changeRatio = Math.abs((areaSize * 100) / (width * height) - 100);

        setWidth(layout.width + 50);
        setHeight(layout.height + 50);
      }
    },
    [width, height]
  );

  return (
    <div className="w-full h-screen">
      <Space>
        <Canvas
          nodes={nodes}
          edges={edges}
          node={(node) => <CustomNode {...node} />}
          maxHeight={height}
          maxWidth={width}
          height={height}
          width={width}
          onLayoutChange={onLayoutChange}
          layoutOptions={layoutOptions}
          pannable={false}
          zoomable={false}
          animated={false}
          readonly={true}
          dragEdge={null}
          dragNode={null}
          fit={true}
          direction="RIGHT"
          defaultPosition={CanvasPosition.LEFT}
          arrow={null}
        />
      </Space>
    </div>
  );
};

export default GraphCanvas;
