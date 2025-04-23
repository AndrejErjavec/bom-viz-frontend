import { createContext, useContext, useState, ReactNode } from "react";
import { ViewPort } from "react-zoomable-ui/dist/ViewPort";
import { GraphData } from "../types/node";

interface TreeContextType {
  graph: GraphData | null;
  setGraph: ({ nodes, edges }: GraphData) => void;
  selectedNode: any;
  setSelectedNode: (node: any) => void;
  viewPort: ViewPort | null;
  setViewPort: (viewPort: ViewPort) => void;
  centerView: () => void;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

interface TreeProviderProps {
  children: ReactNode;
}

export const TreeProvider: React.FC<TreeProviderProps> = ({ children }) => {
  const [graph, setGraph] = useState<GraphData | null>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [viewPort, setViewPort] = useState<ViewPort | null>(null);

  const centerView = () => {
    viewPort?.updateContainerSize();

    const canvas = document.querySelector(".canvas") as HTMLElement | null;
    if (canvas) {
      viewPort?.camera?.centerFitElementIntoView(canvas);
    }
  };

  return (
    <TreeContext.Provider
      value={{
        graph,
        setGraph,
        selectedNode,
        setSelectedNode,
        viewPort,
        setViewPort,
        centerView,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export const useTree = (): TreeContextType => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
};
