import { Button, Box, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";

interface CollapsibleProps {
  text: string;
  children?: ReactNode;
}

export default function Collapsible({ text, children }: CollapsibleProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <button className="w-full" onClick={toggle}>
        {text}
      </button>
      <Collapse in={opened}>{children}</Collapse>
    </>
  );
}
