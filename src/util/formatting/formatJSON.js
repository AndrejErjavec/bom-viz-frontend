export function formatProduct(productJson) {
  let { operations, unregisteredOperations, processingInfo, ...metadata } =
    productJson;

  // process metadata
  metadata._id = metadata._id.$oid;
  metadata.lastOperationTimestamp = metadata.lastOperationTimestamp.$numberLong;

  operations = formatOperations(operations);

  return {
    label: metadata.productName,
    operations,
    unregisteredOperations,
    processingInfo,
  };
}

function formatInnerProduct(product) {
  let { productName, operations, unregisteredOperations, ...metadata } =
    product;
  operations = formatOperations(operations);
  return {
    label: productName,
    metadata,
    operations,
    unregisteredOperations,
  };
}

function formatOperations(operations) {
  return operations.map((operation) => {
    let { operationName, rawMaterials, products, parameters, ...metadata } =
      operation;

    // process metadata
    metadata.machineId = metadata.machineId.$numberLong;

    if (products.length > 0) {
      products = products.map((product) => formatInnerProduct(product));
    }

    return {
      label: operationName,
      metadata,
      rawMaterials,
      products,
      parameters,
    };
  });
}
