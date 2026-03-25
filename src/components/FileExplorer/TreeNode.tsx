import { highlight } from "./utils";

function TreeNode({
  node,
  expanded,
  onAddNode,
  onRenameNode,
  onDeleteNode,
  onFolderToggle,
  searchQuery,
  depth = 0,
}) {
  const isOpen = expanded.has(node.id);

  return (
    <div
      className="tree-node"
      style={{
        paddingLeft: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "4px",
          cursor: "pointer",
        }}
      >
        <div
          onClick={() => node.type === "folder" && onFolderToggle(node.id)}
          className="details"
          style={{
            display: "flex",
            gap: "4px",
            cursor: "pointer",
          }}
        >
          <span className="icon">
            {node.type === "file" ? "📃" : isOpen ? "📂" : "📁"}
          </span>
          <span>{highlight(node.name, searchQuery)}</span>[
        </div>
        {node.type === "folder" && (
          <span onClick={() => onAddNode(node.id)}>Add</span>
        )}
        <span onClick={() => onRenameNode(node.id)}>Rename</span>
        <span onClick={() => onDeleteNode(node.id)}>Delete</span>]
      </div>

      {node.type === "folder" &&
        isOpen &&
        node.children?.map((node) => {
          return (
            <TreeNode
              key={node.id}
              node={node}
              expanded={expanded}
              onAddNode={onAddNode}
              onFolderToggle={onFolderToggle}
              onRenameNode={onRenameNode}
              onDeleteNode={onDeleteNode}
              searchQuery={searchQuery}
              depth={depth + 1}
            />
          );
        })}
    </div>
  );
}

export default TreeNode;
