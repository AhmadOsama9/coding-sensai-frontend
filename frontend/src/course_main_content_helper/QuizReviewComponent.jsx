import React from 'react';

const QuizReviewComponent = ({ quiz }) => {
  console.log("quiz: ", quiz);

  if (!quiz) return null;

  return (
    <div className="space-y-6">
      <h4 className="text-3xl font-bold text-primaryText mb-4">Quiz Review</h4>
      {quiz.map((question, index) => (
        <div key={index} className="p-4 bg-cardBg rounded-lg shadow-md">
          <h5 className="text-xl font-semibold text-primaryText mb-3">{`Q${index + 1}: ${question.question_text}`}</h5>
          <ul className="space-y-2">
            {question.options.map((option, optIndex) => (
              <li
                key={optIndex}
                className={`p-2 rounded-md ${
                  option.is_correct
                    ? 'bg-green-100 text-green-800'
                    : 'bg-background text-primaryText'
                }`}
              >
                {option.option_text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizReviewComponent;
