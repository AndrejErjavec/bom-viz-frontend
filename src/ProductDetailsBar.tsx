import { useEffect, useState } from "react";
import { useTree } from "./context/graphContext";
import Collapsible from "./components/Collapsible";

export default function ProductDetailsBar() {
  const { selectedNode } = useTree();
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (selectedNode) {
      setContent(selectedNode.data.content);
    }
  }, [selectedNode]);

  return (
    <div
      style={{
        minWidth: "500px",
        height: "100vh",
        backgroundColor: "#343434",
        color: "#fff",
        zIndex: "99999",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Collapsible text={"Group 1"}>
        <div>asd</div>
      </Collapsible>
      <Collapsible text={"Group 2"}>
        <div>asd</div>
      </Collapsible>
      <Collapsible text={"Group 3"}>
        <div>asd</div>
      </Collapsible>
      {/* {content &&
        Object.keys(content).map((key) => {
          const value = content[key];
          if (typeof value == "string") {
            return (
              <span>
                {key}: {value}
              </span>
            );
          }
        })} */}
    </div>
  );
}
