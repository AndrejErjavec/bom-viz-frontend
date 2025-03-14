export function formatProductD3(productJson) {
  let { productName, operations } = productJson;
  operations = formatOperationsD3(operations);
  return {
    name: productName,
    children: operations,
    type: "product",
  };
}

function formatOperationsD3(operations) {
  return operations.map((operation) => {
    let { operationName, rawMaterials, products } = operation;

    if (products.length > 0) {
      products = products.map((product) => formatInnerProductD3(product));
    }

    if (rawMaterials.length > 0) {
      rawMaterials = rawMaterials.map((rawMaterial) => {
        return {
          name: rawMaterial.name,
          children: [],
          type: "rawMaterial",
        };
      });
    }

    return {
      name: operationName,
      children: [...products, ...rawMaterials],
      type: "operation",
    };
  });
}

function formatInnerProductD3(product) {
  let { productName, operations } = product;
  operations = formatOperationsD3(operations);
  return {
    name: productName,
    children: operations,
    type: "product",
  };
}
