import Collapsible from "../Collapsible";

export default function ProductItem({ data }: any) {
  const { metadata, processingInfo } = data;
  return (
    <div>
      {metadata && (
        <Collapsible text={"METADATA"} open={true}>
          {Object.keys(metadata).map((key) => (
            <div>
              {key}:{metadata[key]}
            </div>
          ))}
        </Collapsible>
      )}

      {processingInfo && (
        <Collapsible text={"PROCESSING INFO"}>
          {Object.keys(processingInfo).map((key) => (
            <div>
              {key}: {processingInfo[key]}
            </div>
          ))}
        </Collapsible>
      )}
    </div>
  );
}
