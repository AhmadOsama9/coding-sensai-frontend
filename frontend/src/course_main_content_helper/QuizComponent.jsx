import React, { useState } from 'react';
import Popout from '../page_components/Popout';

const QuizComponent = ({ componentId, quiz, submitQuiz, setLoading }) => {
  const [answers, setAnswers] = useState({}); // State to collect answers

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (questionId, optionId) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Convert answers to the required format
      const formattedAnswers = Object.keys(answers).map((questionId) => ({
        question_id: questionId,
        selected_option_id: answers[questionId], // Adjust to match your backend expectations
      }));
    
      await submitQuiz(componentId, quiz.quiz_id, formattedAnswers);

    } catch (error) {
      console.error('Error submitting quiz:', error);
      setPopupMessage('Failed to submit quiz');
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5 className="font-bold">Quiz</h5>
      {quiz && quiz.quiz.length > 0 ? (
        quiz.quiz.map((question) => (
          <div key={question.question_id} className="mb-4 text-primary">
            <p>{question.question_text}</p>
            {question.options.map((option) => (
              <label key={option.option_id} className="block">
                <input
                  type="radio"
                  name={`question-${question.question_id}`}
                  value={option.option_id}
                  onChange={() => handleChange(question.question_id, option.option_id)}
                />
                {option.option_text}
              </label>
            ))}
          </div>
        ))
      ) : (
        <p>No questions available</p>
      )}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-hoverPrimary"
      >
        Submit Quiz
      </button>

      <Popout
        isVisible={showPopup}
        title="Quiz Submission"
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />

    </div>
  );
};

export default QuizComponent;
