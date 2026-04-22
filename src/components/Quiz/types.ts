export type QuizStatus = "running" | "finished";

export type QuestionTypeId = number;

export type QuestionType = {
  id: QuestionTypeId;
  question: string;
  options: string[];
  answer: string;
};

export type QuizAnswer = Record<QuestionTypeId, QuestionType["answer"]>;

export type QuizReviewProps = {
  questions: QuestionType[];
  answers: QuizAnswer;
};
