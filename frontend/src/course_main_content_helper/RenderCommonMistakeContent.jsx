import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../hooks/UseAuth';
import { markMistakeAsComplete, getQuizForMistake, submitQuiz, getAllQuizForSolvedMistake } from '../services/MistakeService';
import QuizComponent from './QuizComponent';
import QuizReviewComponent from './QuizReviewComponent';
import { useUserCourse } from '../hooks/UseUserCourse';
import { normalizeQuizData } from "../services/helper";
import TestControls from '../page_components/TestControls';
import Popout from '../page_components/Popout';

const RenderCommonMistakeContent = ({ user_complete, mistake }) => {
  const { token } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const { updateCommonMistakeCompletion, updateTopicCompletion, courseData } = useUserCourse();
  
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  if (!mistake) return null;

  useEffect(() => {
    if (quizPassed && reviewMode) {
      console.log('Quiz passed and review mode enabled:', quiz);
    }
  }, [quizPassed, reviewMode, quiz, courseData]);

  const markAsComplete = async (mistakeId) => {
    setLoading(true);
    try {
      await markMistakeAsComplete(mistakeId, token, updateCommonMistakeCompletion, updateTopicCompletion);
      setPopupMessage('Mistake marked as complete');
    } catch (error) {
      console.error(error);
      setPopupMessage(`Failed to mark mistake as complete: ${error.message}`);
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  const takeQuiz = async (mistakeId) => {
    setLoading(true);
    try {
      const fetchedQuiz = await getQuizForMistake(mistakeId, token);
      setQuiz(fetchedQuiz);
      setReviewMode(false);
    } catch (error) {
      console.error(error);
      setPopupMessage(`Failed to load the quiz: ${error.message}`);
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const showQuizQuestions = async (mistakeId) => {
    setLoading(true);
    try {
      const fetchedQuiz = await getAllQuizForSolvedMistake(mistakeId, token);
      console.log("fetchedQuiz.quiz.quiz: ", fetchedQuiz.quiz.quiz);

      const normailizedQuiz = normalizeQuizData(fetchedQuiz.quiz.quiz);

      setQuiz(normailizedQuiz);
      setReviewMode(true);
      setQuizPassed(true);

    } catch (error) {
      console.error(error);
      setPopupMessage(`Failed to show the quiz questions: ${error.message}`);
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleQuizSubmission = async (componentId, quizId, quizData) => {
    setLoading(true);
    try {
      const submissionResult = await submitQuiz(componentId, quizId, quizData, token, updateCommonMistakeCompletion, updateTopicCompletion);

      if (submissionResult.passed) {

        console.log("submissionResult.quiz: " + submissionResult.quiz);

        const normalizedQuiz = normalizeQuizData(submissionResult.quiz);

        setPopupMessage("Quiz passed, your score is: " + submissionResult.score);

        setQuiz(normalizedQuiz);
        setQuizPassed(true);
        setReviewMode(true);
      } else { 
        setPopupMessage(submissionResult.message +  "your score is: " + submissionResult.score);
      }
    } catch (error) {
      console.error(error);
      setPopupMessage(`Failed to submit the quiz: ${error.message}`);
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Render Mistake Details */}
      <h4 className="text-2xl font-bold text-primaryText">{mistake.mistake_title}</h4>
      <div className="prose max-w-none text-primaryText">
        <ReactMarkdown>{mistake.mistake_description}</ReactMarkdown>
      </div>

      {mistake.mistake_video_url && <video className="w-full rounded-lg" src={mistake.mistake_video_url} controls></video>}
      {mistake.mistake_img_url && <img className="w-full rounded-lg" src={mistake.mistake_img_url} alt={mistake.mistake_title} />}

      {/* Conditional Buttons Based on Completion and Quiz Status */}
      {mistake.quiz_id && user_complete && !quizPassed && (
        <button onClick={() => showQuizQuestions(mistake.mistake_id)} className="px-4 py-2 bg-primary text-white rounded hover:bg-hoverPrimary">
          Show Quiz Questions
        </button>
      )}
      {mistake.quiz_id && !user_complete && !quizPassed && (
        <button onClick={() => takeQuiz(mistake.mistake_id)} className="px-4 py-2 bg-primary text-white rounded hover:bg-hoverPrimary">
          {loading ? 'Loading...' : 'Take Quiz'}
        </button>
      )}
      {!mistake.quiz_id && user_complete && (
        <button className="px-4 py-2 bg-success bg-primary text-white rounded hover:bg-hoverPrimary">
          Mistake Completed
        </button>
      )}
      {!mistake.quiz_id && !user_complete && (
        <button onClick={() => markAsComplete(mistake.mistake_id)} className="px-4 py-2 bg-muted text-white rounded hover:bg-secondary">
          {loading ? 'Loading...' : 'Mark as Complete'}
        </button>
      )}

      {/* Quiz Passed Message and Review Button */}
      {quizPassed && (
        <div className="space-y-4">
          <p className="text-xl text-success">Congratulations! You have passed the quiz.</p>
          <button onClick={() => showQuizQuestions(mistake.mistake_id)} className="px-4 py-2 bg-primary text-white rounded hover:bg-hoverPrimary">
            Review Quiz with Correct Answers
          </button>
        </div>
      )}

      {/* Render QuizComponent for quiz-taking mode */}
      {quiz && !reviewMode && !quizPassed && (
        <QuizComponent componentId={mistake.mistake_id} quiz={quiz} submitQuiz={handleQuizSubmission} setLoading={setLoading} />
      )}

      {/* Render QuizReviewComponent for quiz review mode */}
      {quiz && reviewMode && quizPassed && <QuizReviewComponent quiz={quiz} />}
      

      <Popout
        isVisible={showPopup}
        title="Notification"
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />

    </div>
  );
};

export default RenderCommonMistakeContent;
