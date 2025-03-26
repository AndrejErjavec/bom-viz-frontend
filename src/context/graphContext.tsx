import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface TreeContextType {
  selectedNode: any; // Change 'any' to a more specific type if known
  setSelectedNode: (node: any) => void;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

interface TreeProviderProps {
  children: ReactNode;
}

export const TreeProvider: React.FC<TreeProviderProps> = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    console.log(selectedNode);
  }, []);

  return (
    <TreeContext.Provider value={{ selectedNode, setSelectedNode }}>
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
