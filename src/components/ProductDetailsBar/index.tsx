import { useEffect, useState } from "react";
import { useTree } from "../../context/graphContext";
import ProductItem from "./ProductItem";
import MaterialItem from "./MaterialItem";
import OperationItem from "./OperationItem";

export default function ProductDetailsBar() {
  const { selectedNode } = useTree();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (selectedNode) {
      setData(selectedNode.data);
      console.log(selectedNode.data);
    }
  }, [selectedNode]);

  const renderItem = () => {
    if (data) {
      switch (data.type) {
        case "product":
          return <ProductItem data={data.content} />;
        case "operation":
          return <OperationItem data={data.content} />;
        case "material":
          return <MaterialItem data={data.content} />;
        default:
          return null;
      }
    }
  };

  return (
    <div
      style={{
        right: 0,
        top: 0,
        minWidth: "500px",
        height: "100vh",
        backgroundColor: "#343434",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {renderItem()}
    </div>
  );
}
