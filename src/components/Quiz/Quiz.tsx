import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import type { QuizStatus, QuizAnswer } from "./types";
import questions from "./questions.json";
import "./style.css";
import Review from "./Review";

const duration = 3;

function Quiz() {
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState<QuizStatus>("running");
  const [timeLeft, setTimeLeft] = useState(duration); // in seconds
  const intervalRef = useRef<number | null>(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (status !== "running") return;

    setTimeLeft(duration);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000); // run every second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, currentIndex]);

  const next = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setStatus("finished");
    }
  }, [currentIndex]);

  const nextRef = useRef(next);

  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  useEffect(() => {
    if (timeLeft > 0) return;

    nextRef.current?.();
  }, [timeLeft]);

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: e.target.value,
    }));
  };

  const calculateScore = () => {
    return questions.reduce((score, question) => {
      return score + (answers[question.id] === question.answer ? 1 : 0);
    }, 0);
  };

  if (status === "finished") {
    return (
      <div className="quiz">
        <strong>
          Your total score is {calculateScore()} / {questions.length}
        </strong>
        <hr />
        <Review questions={questions} answers={answers} />
      </div>
    );
  }

  return (
    <div className="quiz">
      <h3>
        Question {currentIndex + 1}/{questions.length}
      </h3>
      <p>{currentQuestion.question}</p>
      <div className="options">
        {currentQuestion.options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="option"
              value={option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>

      <div className="timer">Time Left: {timeLeft}s</div>

      <button
        onClick={next}
        disabled={answers[currentQuestion.id] === undefined}
      >
        {currentIndex === questions.length ? "Submit" : "Next"}
      </button>
    </div>
  );
}

export default Quiz;
