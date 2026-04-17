export type CommentTypeId = string;

export type CommentType = {
  id: CommentTypeId;
  text: string;
  parentId: string | null;
  childrenIds: CommentTypeId[];
  isCollapsed: boolean;
};

export type CommentState = {
  nodes: Record<CommentTypeId, CommentType>;
  rootIds: CommentTypeId[];
};

export type CommentItemProps = {
  state: CommentState;
  id: CommentTypeId;
  onReply: (id: CommentTypeId, newReply: string) => void;
  onToggleCollapse: (id: CommentTypeId) => void;
};
