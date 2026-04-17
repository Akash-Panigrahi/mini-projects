export type CommentTypeId = string;

export type CommentType = {
  id: CommentTypeId;
  text: string;
  children: CommentType[];
};

export type CommentItemProps = {
  comment: CommentType;
  onReply: (id: CommentTypeId, newReply: string) => void;
};
