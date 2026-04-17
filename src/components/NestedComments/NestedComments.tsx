import { useState } from "react";
import type { CommentState, CommentTypeId } from "./types";
import CommentItem from "./CommentItem";
import "./style.css";

const initialState: CommentState = {
  nodes: {
    "1": {
      id: "1",
      text: "Root comment 1",
      parentId: null,
      isCollapsed: false,
      childrenIds: ["1.1", "1.2"],
    },
    "1.1": {
      id: "1.1",
      text: "Child comment 1.1",
      parentId: "1",
      isCollapsed: false,
      childrenIds: ["1.1.1"],
    },
    "1.1.1": {
      id: "1.1.1",
      text: "Child comment 1.1.1",
      parentId: "1.1",
      isCollapsed: false,
      childrenIds: [],
    },
    "1.2": {
      id: "1.2",
      text: "Child comment 1.2",
      parentId: "1",
      isCollapsed: false,
      childrenIds: [],
    },
    "2": {
      id: "2",
      text: "Root comment 2",
      parentId: null,
      isCollapsed: false,
      childrenIds: ["2.1"],
    },
    "2.1": {
      id: "2.1",
      text: "Child comment 2.1",
      parentId: "2",
      isCollapsed: false,
      childrenIds: [],
    },
    "3": {
      id: "3",
      text: "Root comment 3",
      parentId: null,
      isCollapsed: false,
      childrenIds: [],
    },
  },
  rootIds: ["1", "2", "3"],
};

function NestedComments() {
  const [state, setState] = useState(initialState);

  const handleReply = (parentId: CommentTypeId, newReply: string) => {
    const id = crypto.randomUUID();

    setState((prev) => {
      const parent = prev.nodes[parentId];

      return {
        nodes: {
          ...prev.nodes,
          [id]: {
            id,
            parentId,
            childrenIds: [],
            text: newReply,
            isCollapsed: false,
          },
          [parentId]: {
            ...parent,
            childrenIds: [...parent.childrenIds, id],
          },
        },
        rootIds: prev.rootIds,
      };
    });
  };

  const handleToggleCollapse = (id: CommentTypeId) => {
    setState((prev) => {
      return {
        ...prev,
        nodes: {
          ...prev.nodes,
          [id]: {
            ...prev.nodes[id],
            isCollapsed: !prev.nodes[id].isCollapsed,
          },
        },
      };
    });
  };

  return (
    <div className="nested-comments">
      {state.rootIds.map((rootId: CommentTypeId) => (
        <CommentItem
          key={rootId}
          state={state}
          id={rootId}
          onReply={handleReply}
          onToggleCollapse={handleToggleCollapse}
        />
      ))}
    </div>
  );
}

export default NestedComments;
