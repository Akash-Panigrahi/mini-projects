import type { QuizReviewProps } from "./types";

function Review({ questions, answers }: QuizReviewProps) {
  return (
    <div className="review-quiz">
      <h2>Review</h2>

      {questions.map((question, index) => {
        const selected = answers[question.id];

        return (
          <div key={question.id} className="question">
            <div>
              {index + 1}. {question.question}
            </div>

            <div className="options">
              {question.options.map((option) => {
                let backgroundColor = "";
                let color = "";

                if (option === question.answer) {
                  backgroundColor = "#c8e6c9";
                  color = "#222";
                } else if (option === selected) {
                  backgroundColor = "#ffcdd2";
                  color = "#222";
                }

                return (
                  <label key={option} style={{ backgroundColor, color }}>
                    {option}
                  </label>
                );
              })}
            </div>

            <small>Your answer: {selected || "Not answered"}</small>
          </div>
        );
      })}
    </div>
  );
}

export default Review;
