import { useState, useCallback } from "react";
import { Canvas, CanvasPosition } from "reaflow";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CustomNode from "./components/CustomNode";
import { GraphData } from "./types/node";

const TreeChart = ({ nodes, edges }: GraphData) => {
  const [height, setHeight] = useState(2000);
  const [width, setWidth] = useState(2000);

  const layoutOptions = {
    "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  };

  const onLayoutChange = useCallback(
    (layout: any) => {
      if (layout.width && layout.height) {
        const areaSize = layout.width * layout.height;
        const changeRatio = Math.abs((areaSize * 100) / (width * height) - 100);

        setWidth(layout.width + 50);
        setHeight(layout.height + 50);
      }
    },
    [height, width]
  );

  return (
    <TransformWrapper
      initialScale={1}
      minScale={0.2}
      maxScale={5}
      wheel={{ step: 0.1 }}
      limitToBounds={false}
    >
      <TransformComponent>
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Canvas
            nodes={nodes}
            edges={edges}
            node={(node) => <CustomNode {...node} />}
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
            maxHeight={height}
            maxWidth={width}
            height={height}
            width={width}
            arrow={null}
          />
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default TreeChart;
