import Collapsible from "../Collapsible";

export default function OperationItem({ data }: any) {
  const { metadata, parameters } = data;
  return (
    <div>
      {metadata && (
        <Collapsible text={"METADATA"} open={true}>
          {Object.keys(metadata).map((key) => (
            <div className="px-5">
              {key}: {metadata[key]}
            </div>
          ))}
        </Collapsible>
      )}

      {parameters && (
        <Collapsible text={"PARAMETERS"}>
          {parameters.map((parameter: any) => (
            <Collapsible text={parameter.parameterName} level={1}>
              {Object.keys(parameter).map((key) => (
                <div className="px-5">
                  {key}:{parameter[key]}
                </div>
              ))}
            </Collapsible>
          ))}
        </Collapsible>
      )}
    </div>
  );
}
