import { v4 as uuidv4 } from "uuid";

export function formatProduct(json: any) {
  assignNodeUUIDs(json);

  let nodes: any[] = [];
  let edges: any[] = [];

  traverseProduct(json, nodes, edges);
  return { nodes, edges };
}

function traverseProduct(product: any, nodes: any[], edges: any[]) {
  let {
    nodeId,
    productName,
    operations,
    processingInfo,
    unregisteredOperations,
    ...metadata
  } = product;

  if (metadata._id) {
    metadata._id = metadata._id.$oid;
  }

  if (metadata.lastOperationTimestamp) {
    metadata.lastOperationTimestamp =
      metadata.lastOperationTimestamp.$numberLong;
  }

  if (processingInfo) {
    processingInfo.mesid
      ? (processingInfo.mesid = processingInfo.mesid.$numberLong)
      : null;
    processingInfo.procesTimestamp
      ? (processingInfo.procesTimestamp =
          processingInfo.procesTimestamp.$numberLong)
      : null;
  }

  nodes.push({
    id: nodeId,
    text: productName || "NO NAME",
    data: {
      type: "product",
      content: {
        metadata,
        processingInfo,
      },
    },
  });

  if (operations) {
    operations.forEach((operation: any) => {
      traverseOperation(operation, product, nodes, edges, false);
    });
  }

  if (unregisteredOperations.length > 0) {
    unregisteredOperations.forEach((operation: any) => {
      traverseOperation(operation, product, nodes, edges, true);
    });
  }
}

function traverseOperation(
  operation: any,
  product: any,
  nodes: any[],
  edges: any[],
  isUnregistered: boolean
) {
  let {
    nodeId,
    operationName,
    parameters,
    rawMaterials,
    products,
    ...metadata
  } = operation;

  metadata.machineId = metadata.machineId.$numberLong;

  nodes.push({
    id: nodeId,
    text: operationName || "NO NAME",
    data: {
      type: "operation",
      isUnregistered,
      content: { metadata, parameters },
    },
  });

  edges.push({
    id: `${operation.nodeId}-${product.nodeId}`,
    from: product.nodeId,
    to: operation.nodeId,
  });

  // Traverse raw materials
  if (rawMaterials) {
    rawMaterials.forEach((material: any) => {
      const { materialName, nodeId, ...metadata } = material;
      nodes.push({
        id: nodeId,
        text: materialName,
        data: {
          type: "material",
          content: {
            metadata,
          },
        },
      });

      edges.push({
        id: `${material.nodeId}-${operation.nodeId}`,
        from: operation.nodeId,
        to: material.nodeId,
      });
    });
  }

  // Traverse subproducts
  if (operation.products) {
    products.forEach((subProduct: any) => {
      // add edge from subproducts to operation
      edges.push({
        id: `${subProduct.nodeId}-${operation.nodeId}`,
        from: operation.nodeId,
        to: subProduct.nodeId,
      });

      traverseProduct(subProduct, nodes, edges);
    });
  }
}

function assignNodeUUIDs(product: any) {
  // uuid for top-level product
  product.nodeId = uuidv4();
  product.operations.map((operation: any) => {
    operation.nodeId = uuidv4();

    operation.products.map((product: any) => {
      assignNodeUUIDs(product);
    });

    operation.rawMaterials.map((material: any) => {
      material.nodeId = uuidv4();
    });
  });

  product.unregisteredOperations.map((operation: any) => {
    operation.nodeId = uuidv4();

    operation.products.map((product: any) => {
      assignNodeUUIDs(product);
    });

    operation.rawMaterials.map((material: any) => {
      material.nodeId = uuidv4();
    });
  });
}
