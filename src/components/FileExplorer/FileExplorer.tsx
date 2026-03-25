import { useState } from "react";
import TreeNode from "./TreeNode";
import { addNode, deleteNode, renameNode } from "./utils";

const initialTree = [
  {
    id: crypto.randomUUID(),
    name: "mini-projects",
    type: "folder",
    children: [
      {
        id: crypto.randomUUID(),
        name: "src",
        type: "folder",
        children: [
          {
            id: crypto.randomUUID(),
            name: "index.html",
            type: "file",
          },
          {
            id: crypto.randomUUID(),
            name: "assets",
            type: "folder",
            children: [],
          },
          {
            id: crypto.randomUUID(),
            name: "components",
            type: "folder",
            children: [
              {
                id: crypto.randomUUID(),
                name: "FileExplorer",
                type: "folder",
                children: [],
              },
              {
                id: crypto.randomUUID(),
                name: "Home",
                type: "folder",
                children: [],
              },
              {
                id: crypto.randomUUID(),
                name: "Modal",
                type: "folder",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

function FileExplorer() {
  const [tree, setTree] = useState(initialTree);
  const [expanded, setExpanded] = useState(new Set());

  const handleFolderToggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  };

  const handleAddNode = (parentId) => {
    const name = prompt("Enter name");

    const newNode = {
      id: crypto.randomUUID(),
      name,
      type: "file",
    };

    setTree((prev) => addNode(prev, parentId, newNode));
    expanded.add(parentId);
  };

  const handleRenameNode = (id) => {
    const name = prompt("Enter new name");

    if (!name.trim()) return;

    setTree((prev) => renameNode(prev, id, name));
  };

  const handleDeleteNode = (id) => {
    setTree((prev) => deleteNode(prev, id));
  };

  return (
    <div className="tree">
      {tree.map((node) => {
        return (
          <TreeNode
            key={node.id}
            node={node}
            expanded={expanded}
            onFolderToggle={handleFolderToggle}
            onAddNode={handleAddNode}
            onRenameNode={handleRenameNode}
            onDeleteNode={handleDeleteNode}
          />
        );
      })}
    </div>
  );
}

export default FileExplorer;
