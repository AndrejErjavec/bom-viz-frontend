import { Button, Box, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface CollapsibleProps {
  text: string;
  open?: boolean;
  children?: ReactNode;
}

export default function Collapsible({
  text,
  open,
  children,
}: CollapsibleProps) {
  // const [opened, { toggle }] = useDisclosure(false);

  const [isOpen, setIsOpen] = useState(() => (open != null ? open : false));
  const toggle = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      <button
        className="flex flex-row items-center w-full text-left bg-gray-600"
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
      <Collapse in={isOpen}>{children}</Collapse>
    </>
  );
}
