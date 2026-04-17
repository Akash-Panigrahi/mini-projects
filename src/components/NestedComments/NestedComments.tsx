import { useState } from "react";
import type { CommentType, CommentTypeId } from "./types";
import CommentItem from "./CommentItem";
import "./style.css";

const initialComments: CommentType[] = [
  {
    id: "1",
    text: "Root comment 1",
    children: [
      {
        id: "1.1",
        text: "Child comment 1.1",
        children: [
          {
            id: "1.1.1",
            text: "Child comment 1.1.1",
            children: [],
          },
        ],
      },
      {
        id: "1.2",
        text: "Child comment 1.2",
        children: [],
      },
    ],
  },
  {
    id: "2",
    text: "Root comment 2",
    children: [
      {
        id: "2.1",
        text: "Child comment 2.1",
        children: [],
      },
    ],
  },
  {
    id: "3",
    text: "Root comment 3",
    children: [],
  },
];

function addReply(
  comments: CommentType[],
  parentId: CommentTypeId,
  newReply: string,
) {
  return comments.map((comment): CommentType => {
    if (comment.id === parentId) {
      return {
        ...comment,
        children: [
          ...comment.children,
          {
            id: crypto.randomUUID(),
            text: newReply,
            children: [],
          },
        ],
      };
    }

    return {
      ...comment,
      children: addReply(comment.children, parentId, newReply),
    };
  });
}

function NestedComments() {
  const [comments, setComments] = useState(initialComments);

  const handleReply = (parentId: CommentTypeId, newReply: string) => {
    setComments((prev) => addReply(prev, parentId, newReply));
  };

  return (
    <div className="nested-comments">
      {comments.map((comment: CommentType) => (
        <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
      ))}
    </div>
  );
}

export default NestedComments;
