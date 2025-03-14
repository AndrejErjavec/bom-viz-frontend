import { v4 as uuidv4 } from "uuid";

export function formatProduct(json) {
  assignNodeUUIDs(json);

  let nodes = [];
  let edges = [];

  function traverseProduct(product) {
    const { nodeId, productName, operations } = product;

    nodes.push({
      id: nodeId,
      text: productName || "NO NAME",
      data: {
        type: "product",
      },
    });

    if (operations) {
      operations.forEach((operation) => {
        nodes.push({
          id: operation.nodeId,
          text: operation.operationName || "NO NAME",
          data: {
            type: "operation",
          },
        });

        edges.push({
          id: `${operation.nodeId}-${product.nodeId}`,
          from: product.nodeId,
          to: operation.nodeId,
        });

        // Traverse raw materials
        if (operation.rawMaterials) {
          operation.rawMaterials.forEach((material) => {
            nodes.push({
              id: material.nodeId,
              text: material.materialName,
              data: {
                type: "material",
              },
            });

            edges.push({
              id: `${material.nodeId}-${operation.nodeId}`,
              from: operation.nodeId,
              to: material.nodeId,
            });
          });
        }

        // Traverse resulting products recursively
        if (operation.products) {
          operation.products.forEach((subProduct) => {
            // add edge from subproducts to operation
            edges.push({
              id: `${subProduct.nodeId}-${operation.nodeId}`,
              from: operation.nodeId,
              to: subProduct.nodeId,
            });

            traverseProduct(subProduct);
          });
        }
      });
    }
  }

  traverseProduct(json);
  return { nodes, edges };
}

function assignNodeUUIDs(product) {
  // uuid for top-level product
  product.nodeId = uuidv4();
  product.operations.map((operation) => {
    operation.nodeId = uuidv4();

    operation.products.map((product) => {
      assignNodeUUIDs(product);
    });

    operation.rawMaterials.map((material) => {
      material.nodeId = uuidv4();
    });
  });
}
