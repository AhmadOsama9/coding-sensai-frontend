export const getMilestoneById = async (milestone_id, token) => {
    try {
        const response = await fetch(`http://localhost:4000/api/milestone/${milestone_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch milestone details");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in getMilestoneById:", error);
        throw error;
    }
};

export const markMilestoneAsComplete = async (milestone_id, token, updateMilestoneCompletion, updateTopicCompletion) => {
    try {

        if (!token) {
            throw new Error("No token saved!");
        }

        if (!milestone_id) {
            throw new Error("No milestone_id provided!");
        }

        const response = await fetch(`http://localhost:4000/api/milestone/${milestone_id}/complete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to mark milestone as complete");
        }

        const completion_status = await response.json();



        if (completion_status.milestone_completed) {
            updateMilestoneCompletion(milestone_id, true);
        }

        if (completion_status.topic_completed) {
            // Assuming that the milestone is tied to a topic and you have topic_id available.
            updateTopicCompletion(completion_status.topic_id, true);
        }

        return completion_status;
    } catch (error) {
        console.error("Error in markMilestoneAsComplete:", error);
        throw error;
    }
};

export const getQuizForMilestone = async (milestone_id, token) => {
    try {
        const response = await fetch(`http://localhost:4000/api/milestone/${milestone_id}/quiz`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch quiz for milestone");
        }

        const data = await response.json();
        console.log("get quiz for milestone", data);
        return data;
    } catch (error) {
        console.error("Error in getQuizForMilestone:", error);
        throw error;
    }
};

export const getAllQuizForSolvedMilestone = async (milestone_id, token) => {
    try {
        const response = await fetch(`http://localhost:4000/api/milestone/${milestone_id}/quiz/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch all quiz questions for solved milestone");
        }

        const data = await response.json();
        console.log("get all quiz for solved milestone", data);
        return data;
    } catch (error) {
        console.error("Error in getAllQuizForSolvedMilestone:", error);
        throw error;
    }
};


export const submitQuiz = async (milestone_id, quiz_id, answers, token, updateMilestoneCompletion, updateTopicCompletion) => {
    try {

      if (!milestone_id || !quiz_id || !answers || !token) {
        throw new Error("Missing required fields for quiz submission");
      }

      const response = await fetch(`http://localhost:4000/api/milestone/quiz/${milestone_id}/${quiz_id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit quiz in milestone service");
      }
  
      const json = await response.json();
      const { data: completion_status } = json;

      console.log("completion_status", completion_status);
  
      if (completion_status.milestone_completed) {
        updateMilestoneCompletion(milestone_id, true);
      }
  
      if (completion_status.topic_completed) {
        updateTopicCompletion(completion_status.topic_id, true);
      }
  
      // Return additional quizWithAnswers data if passed is true
      return  completion_status;
    } catch (error) {
      console.error("Error in submitQuiz:", error);
      throw error;
    }
  };
  