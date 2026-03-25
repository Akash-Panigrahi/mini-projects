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

export function searchTree(nodes, text, expanded) {
  const results = [];

  for (const node of nodes) {
    const isMatch = node.name.toLowerCase().includes(text);

    if (node.children) {
      const filteredChildren = searchTree(node.children, text, expanded);

      if (filteredChildren.length) {
        expanded.add(node.id);

        results.push({
          ...node,
          children: filteredChildren,
        });

        continue;
      }
    }

    if (isMatch) {
      results.push(node);
    }
  }

  return results;
}

export function highlight(name, searchQuery) {
  const index = name.toLowerCase().indexOf(searchQuery.toLowerCase());

  if (index === -1) return name;

  return (
    <>
      {name.slice(0, index)}
      <mark>{name.slice(index, index + searchQuery.length)}</mark>
      {name.slice(index + searchQuery.length)}
    </>
  );
}
