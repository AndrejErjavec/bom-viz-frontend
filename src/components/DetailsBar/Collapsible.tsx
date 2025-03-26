import { Collapse } from "@mantine/core";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface CollapsibleProps {
  text: string;
  content: any;
  level?: number;
  open?: boolean;
}

export default function Collapsible({
  text,
  content,
  level = 0,
  open = false,
}: CollapsibleProps) {
  // const [opened, { toggle }] = useDisclosure(false);

  const [isOpen, setIsOpen] = useState(open);

  const toggle = () => {
    setIsOpen((open) => !open);
  };

  const renderObject = (object: any) => {
    return (
      <>
        {Object.keys(object).map((key: any, index: number) => (
          <div
            style={{
              paddingLeft: `calc(0.25rem * ${(level + 1) * 5})`,
            }}
            key={`${key}-${index}`}
          >
            {key}: {content[key]}
          </div>
        ))}
      </>
    );
  };

  const renderArray = (array: any[]) => {
    return array.map((obj: any, index: number) => {
      return (
        <Collapsible
          text={obj.parameterName}
          content={obj}
          level={level + 1}
          key={`${obj.parameterName}-${index}`}
        />
      );
    });
  };

  const renderItem = () => {
    if (Array.isArray(content)) {
      return renderArray(content);
    } else if (typeof content == "object") {
      return renderObject(content);
    } else {
      return null;
    }
  };

  return (
    <div>
      <button
        className="flex flex-row gap-1 items-center w-full text-left py-1.5 bg-gray-100 border-b border-gray-300 cursor-pointer"
        style={{
          paddingLeft: `calc(0.25rem * ${level * 5} + 10px)`,
        }}
        onClick={toggle}
      >
        <div>
          {isOpen ? (
            <MdKeyboardArrowUp></MdKeyboardArrowUp>
          ) : (
            <MdKeyboardArrowDown></MdKeyboardArrowDown>
          )}
        </div>
        <span className="font-medium">{text}</span>
      </button>
      <Collapse in={isOpen}>{renderItem()}</Collapse>
    </div>
  );
}
