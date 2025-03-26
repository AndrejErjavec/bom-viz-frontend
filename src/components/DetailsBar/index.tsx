import { useEffect, useState } from "react";
import { useTree } from "../../context/graphContext";
import Collapsible from "./Collapsible";
import clsx from "clsx";

export default function DetailsBar() {
  const { selectedNode } = useTree();
  const [data, setData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedNode) {
      setData(selectedNode.data);
      setIsOpen(true);
      console.log(selectedNode.data);
    }
  }, [selectedNode]);

  const renderList = (obj: any) => {
    return Object.keys(obj).map((key) => {
      const value = obj[key];

      return <Collapsible text={key} content={value} key={key} />;
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen z-50 flex items-start transform transition-transform duration-300 ease-in-out",
        {
          "translate-x-0": isOpen,
          "translate-x-110": !isOpen,
        }
      )}
    >
      {/* Sidebar container */}
      <div
        className="relative w-96 h-full bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 -left-10 w-8 h-8 rounded-full bg-gray-200 cursor-pointer shadow-md flex items-center justify-center transform transition-transform duration-300 ease-in-out"
          onClick={handleClose}
          aria-label="Close sidebar"
        >
          ×
        </button>

        {/* Sidebar content */}
        {data && (
          <>
            <div className="px-4 py-3 bg-gray-200 border-b border-gray-300 text-lg font-semibold">
              {data.name}
            </div>
            <div className="overflow-y-auto h-full">
              {renderList(data.content)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
