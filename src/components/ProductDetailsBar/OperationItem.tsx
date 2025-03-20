import Collapsible from "../Collapsible";

export default function OperationItem({ data }: any) {
  const { metadata, parameters } = data;
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

      {parameters && (
        <Collapsible text={"PARAMETERS"}>
          {parameters.map((parameter: any) => (
            <Collapsible text={parameter.parameterName}>
              {Object.keys(parameter).map((key) => (
                <div>
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
