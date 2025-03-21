import React from "react";
import { Button, Box, Collapse } from "@mantine/core";
import { ReactNode, useState } from "react";
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
  open,
}: CollapsibleProps) {
  // const [opened, { toggle }] = useDisclosure(false);

  const [isOpen, setIsOpen] = useState(() => (open != null ? open : false));
  const toggle = () => {
    setIsOpen((open) => !open);
  };

  const renderObject = (object: any) => {
    return (
      <>
        {Object.keys(object).map((key: any) => (
          <div className={`px-${(level + 1) * 5}`}>
            {key}: {content[key]}
          </div>
        ))}
      </>
    );
  };

  const renderArray = (array: any[]) => {
    return array.map((obj: any) => {
      return (
        <Collapsible text={obj.parameterName} content={obj} level={level + 1} />
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
        className={`flex flex-row items-center w-full text-left py-1 bg-gray-200 px-${
          level * 5
        }`}
        onClick={toggle}
      >
        <div>
          {isOpen ? (
            <MdKeyboardArrowUp></MdKeyboardArrowUp>
          ) : (
            <MdKeyboardArrowDown></MdKeyboardArrowDown>
          )}
        </div>
        {text}
      </button>
      <Collapse in={isOpen}>{renderItem()}</Collapse>
    </div>
  );
}
