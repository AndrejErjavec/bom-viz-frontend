import { useEffect, useState } from "react";
import { useTree } from "../../context/graphContext";
import ProductItem from "./ProductItem";
import MaterialItem from "./MaterialItem";
import OperationItem from "./OperationItem";
import Collapsible from "../Collapsible";

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

  const renderList = (obj: any) => {
    return Object.keys(obj).map((key) => {
      const value = obj[key];

      return <Collapsible text={key} content={value} />;
    });
  };

  return (
    <div
      style={{
        right: 0,
        top: 0,
        minWidth: "500px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        boxShadow: "0px 0 20px rgba(0, 0, 0, 0.3)", // Left shadow
      }}
    >
      {/* {renderItem()} */}
      {data && renderList(data.content, 0)}
    </div>
  );
}
