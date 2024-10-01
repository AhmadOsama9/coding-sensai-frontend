import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../hooks/UseAuth';
import { markMilestoneAsComplete, getQuizForMilestone, submitQuiz, getAllQuizForSolvedMilestone } from '../services/MilestoneService';
import QuizComponent from './QuizComponent';
import QuizReviewComponent from './QuizReviewComponent';
import { useUserCourse } from '../hooks/UseUserCourse';
import { normalizeQuizData } from '../services/helper';
import Popout from '../page_components/Popout';

const RenderMilestoneContent = ({ user_complete, milestone }) => {
  const { token } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const { updateMilestoneCompletion, updateTopicCompletion, courseData } = useUserCourse();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  if (!milestone) return null;

  // I trying to update the page when the milestone is marked as completed
  // also same for the common mistakes but it doesn't seem to be working as expected
  useEffect(() => {
  }, [courseData]);

  const markAsComplete = async (milestoneId) => {
    setLoading(true);
    try {
      await markMilestoneAsComplete(milestoneId, token, updateMilestoneCompletion, updateTopicCompletion);
      setPopupMessage('Milestone marked as complete');
    } catch (error) {
      console.error(error);
      setPopupMessage(`Failed to mark milestone as complete: ${error.message}`);
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  const takeQuiz = async (quizId) => {
    setLoading(true);
    try {
      const fetchedQuiz = await getQuizForMilestone(quizId, token);
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

  const handleQuizSubmission = async (milestoneId, quizId, answers) => {
    setLoading(true);
    try {
      const submissionResult = await submitQuiz(milestoneId, quizId, answers, token, updateMilestoneCompletion, updateTopicCompletion);
      
      if (submissionResult.passed) {

        console.log("submissionResult.quiz in the milestone renderer: ", submissionResult.quiz);

        const normalizedQuiz = normalizeQuizData(submissionResult.quiz);
        
        setPopupMessage("Quiz passed, your score is: " + submissionResult.score);

        setQuiz(normalizedQuiz); // Set the quiz data for review
        setQuizPassed(true); // Mark quiz as passed
        setReviewMode(true); // Switch to review mode
        

      } else {
        setPopupMessage(submissionResult.message + "Your Score is: " + submissionResult.score);
      }
    } catch (error) {
      console.error(error);
      setPopupMessage(`Failed to submit quiz: ${error.message}`);
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  const showQuizQuestions = async (quizId) => {
    setLoading(true);
    try {
      const fetchedQuiz = await getAllQuizForSolvedMilestone(quizId, token);

      console.log("fetchedQuiz.quiz.quiz: ", fetchedQuiz.quiz.quiz);

      const normalizedQuiz = normalizeQuizData(fetchedQuiz.quiz.quiz);

      setQuiz(normalizedQuiz);
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

  return (
    <div className="space-y-4">
      <h4 className="text-2xl font-bold text-primaryText">{milestone.milestone_title}</h4>
      <div className="prose max-w-none text-primaryText">
        <ReactMarkdown>{milestone.milestone_description}</ReactMarkdown>
      </div>

      {milestone.milestone_video_url && (
        <video className="w-full rounded-lg" src={milestone.milestone_video_url} controls></video>
      )}

      {milestone.milestone_img_url && (
        <img className="w-full rounded-lg" src={milestone.milestone_img_url} alt={milestone.milestone_title} />
      )}

      {milestone.quiz_id && user_complete && (
        <button onClick={() => showQuizQuestions(milestone.quiz_id)} className="px-4 py-2 bg-primary text-white rounded hover:bg-hoverPrimary">
          Show Quiz Questions
        </button>
      )}

      {milestone.quiz_id && !user_complete && (
        <button onClick={() => takeQuiz(milestone.quiz_id)} className="px-4 py-2 bg-primary text-white rounded hover:bg-hoverPrimary">
          {loading ? 'Loading...' : 'Take Quiz'}
        </button>
      )}

      {!milestone.quiz_id && user_complete && (
        <button className="px-4 py-2 bg-success bg-primary text-white rounded hover:bg-hoverPrimary">Milestone Completed</button>
      )}

      {!milestone.quiz_id && !user_complete && (
        <button onClick={() => markAsComplete(milestone.milestone_id)} className="px-4 py-2 bg-muted text-white rounded hover:bg-secondary">
          {loading ? 'Loading...' : 'Mark as Complete'}
        </button>
      )}

      {quiz && !reviewMode && (
        <QuizComponent componentId={milestone.milestone_id} quiz={quiz} submitQuiz={handleQuizSubmission} setLoading={setLoading} />
      )}

      {quiz && reviewMode && quizPassed && (
        <QuizReviewComponent quiz={quiz} />
      )}


      <Popout
        isVisible={showPopup}
        title="Quiz Submission"
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
};

export default RenderMilestoneContent;
