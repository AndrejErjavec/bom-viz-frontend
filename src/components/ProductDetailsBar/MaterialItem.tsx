import Collapsible from "../Collapsible";

export default function MaterialItem({ data }: any) {
  const { metadata } = data;
  return (
    <div>
      {metadata && (
        <Collapsible text={"METADATA"} open={true}>
          {Object.keys(metadata).map((key) => (
            <div>
              {key}: {metadata[key]}
            </div>
          ))}
        </Collapsible>
      )}
    </div>
  );
}
