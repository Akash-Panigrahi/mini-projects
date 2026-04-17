import { useState } from "react";
import type { CommentItemProps, CommentTypeId } from "./types";

function CommentItem({ state, id, onReply }: CommentItemProps) {
  const comment = state.nodes[id];
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
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

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

      {!comment.isCollapsed &&
        comment.childrenIds.map((childId: CommentTypeId) => (
          <CommentItem
            key={childId}
            state={state}
            id={childId}
            onReply={onReply}
          />
        ))}
    </div>
  );
}

export default CommentItem;
