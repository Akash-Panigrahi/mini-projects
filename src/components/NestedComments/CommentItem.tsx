import { useState } from "react";
import type { CommentItemProps, CommentType } from "./types";

function CommentItem({ comment, onReply }: CommentItemProps) {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div className="comment-item">
      <div className="comment-text">{comment.text}</div>

      <div className="actions">
        {!showInput && (
          <button onClick={() => setShowInput((prev) => !prev)}>Reply</button>
        )}

        {showInput && (
          <>
            <input value={input} onChange={(e) => setInput(e.target.value)} />

            <button
              onClick={() => {
                onReply(comment.id, input);
                setInput("");
                setShowInput(false);
              }}
            >
              Add
            </button>

            <button
              onClick={() => {
                setInput("");
                setShowInput(false);
              }}
            >
              Close
            </button>
          </>
        )}
      </div>

      {comment.children.map((childComment: CommentType) => (
        <CommentItem
          key={childComment.id}
          comment={childComment}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

export default CommentItem;
