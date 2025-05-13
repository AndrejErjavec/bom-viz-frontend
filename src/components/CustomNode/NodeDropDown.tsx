import { useLayoutEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useTree } from "../../context/graphContext";
import clsx from "clsx";

enum CollapsibleType {
  METADATA,
  PARAMETER_LIST,
  PARAMETER,
}

interface CollapsibleProps {
  text: string;
  type: CollapsibleType;
  content: any;
  level?: number;
  open?: boolean;
  isSearchView: boolean;
}

function Collapsible({
  text,
  type,
  content,
  level = 0,
  open = false,
  // updateNode,
  isSearchView = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(open);

  const handleClick = () => {
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

  const renderParameters = () => {
    return content.map((obj: any, index: number) => {
      return (
        <Collapsible
          text={obj.parameterName}
          type={CollapsibleType.PARAMETER}
          content={obj}
          level={level + 1}
          key={`${obj.parameterName}-${index}`}
          isSearchView={isSearchView}
        />
      );
    });
  };

  const renderItem = () => {
    if (
      type === CollapsibleType.METADATA ||
      type === CollapsibleType.PARAMETER
    ) {
      return renderObject(content);
    } else if (type == CollapsibleType.PARAMETER_LIST) {
      return renderParameters();
    } else {
      return null;
    }
  };

  return (
    <div>
      <button
        className={clsx(
          "flex flex-row gap-1 items-center w-full text-left py-1.5 cursor-pointer border-b bg-gray-100 border-gray-300",
          {
            "bg-green-200": isSearchView && type === CollapsibleType.PARAMETER,
          }
        )}
        style={{
          paddingLeft: `calc(0.25rem * ${level * 5} + 10px)`,
        }}
        onClick={handleClick}
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
      {isOpen && renderItem()}
    </div>
  );
}

interface NodeDropDownProps {
  data: any;
  open: boolean;
}

export default function NodeDropDown({ data, open }: NodeDropDownProps) {
  const { isSearchView } = useTree();

  const renderCollapsibles = () => {
    const { metadata, parameters } = data.content;

    const items = [];

    if (metadata) {
      items.push(
        <Collapsible
          text={"metadata"}
          type={CollapsibleType.METADATA}
          content={metadata}
          key="metadata"
          open={false}
          isSearchView={isSearchView}
        />
      );
    }

    if (parameters && parameters.length > 0) {
      items.push(
        <Collapsible
          text={"parameters"}
          type={CollapsibleType.PARAMETER_LIST}
          content={parameters}
          key="parameters"
          open={isSearchView}
          isSearchView={isSearchView}
        />
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col">
      {open && (
        <>
          <div className="overflow-y-auto w-full">{renderCollapsibles()}</div>
        </>
      )}
    </div>
  );
}
