import type { NodeProps } from "reaflow";
import { Node } from "reaflow";
import { CustomNodeData } from ".";

export default function MaterialNode(props: NodeProps<CustomNodeData["data"]>) {
  return (
    <Node
      {...props}
      label={null as any}
      style={{
        fill: "#ffffff",
        stroke: "#fb6352",
        strokeWidth: 1.5,
      }}
    >
      <foreignObject width={props.width} height={props.height} x={0} y={0}>
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
