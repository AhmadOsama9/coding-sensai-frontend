export const normalizeQuizData = (quizData) => {
    if (!quizData) return [];
  
    // Case 1: If quizData is an array and contains objects with a "questions" array
    if (Array.isArray(quizData) && quizData[0]?.questions) {
      return quizData[0].questions;
    }
  
    // Case 2: If quizData is already an array of questions directly
    if (Array.isArray(quizData)) {
      return quizData;
    }
  
    // Default: Return an empty array if quizData is not in a recognized format
    return [];
  };
  