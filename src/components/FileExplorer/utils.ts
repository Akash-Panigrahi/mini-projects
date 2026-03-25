export function addNode(tree, parentId, newNode) {
  return tree.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    }

    if (node.children) {
      return {
        ...node,
        children: addNode(node.children, parentId, newNode),
      };
    }

    return node;
  });
}

export function renameNode(tree, id, name) {
  return tree.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        name,
      };
    }

    if (node.children) {
      return {
        ...node,
        children: renameNode(node.children, id, name),
      };
    }

    return node;
  });
}

export function deleteNode(tree, id) {
  return tree
    .filter((node) => node.id !== id)
    .map((node) => {
      if (node.children) {
        return {
          ...node,
          children: deleteNode(node.children, id),
        };
      }

      return node;
    });
}
