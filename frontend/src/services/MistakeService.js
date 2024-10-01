export const getmistakeById = async (mistake_id, token) => {
    try {
        const response = await fetch(`http://localhost:4000/api/mistake/${mistake_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch mistake details");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in getmistakeById:", error);
        throw error;
    }
};

export const markMistakeAsComplete = async (mistake_id, token, updateCommonMistakeCompletion, updateTopicCompletion) => {
    try {

        if (!token) {
            throw new Error("No token saved!");
        }

        if (!mistake_id) {
            throw new Error("No mistake_id provided!");
        }

        const response = await fetch(`http://localhost:4000/api/mistake/${mistake_id}/complete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to mark mistake as complete");
        }

        const completion_status = await response.json();

        if (completion_status.mistake_completed) {
            updateCommonMistakeCompletion(mistake_id, true);
        }

        if (completion_status.topic_completed) {
            // Assuming that the mistake is tied to a topic and you have topic_id available.
            updateTopicCompletion(completion_status.topic_id, true);
        }

        return completion_status;
    } catch (error) {
        console.error("Error in markmistakeAsComplete:", error);
        throw error;
    }
};

export const getQuizForMistake = async (mistake_id, token) => {
    try {
        if (!mistake_id) {
            throw new Error("Mistake ID is required.");
        }

        if (!token) {
            throw new Error("Token is required.");
        }

        const response = await fetch(`http://localhost:4000/api/mistake/${mistake_id}/quiz`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch quiz for mistake, double check that you didn't pass it before");
        }

        const data = await response.json();
        console.log("get quiz for mistake", data);
        return data;
    } catch (error) {
        console.error("Error in getQuizFormistake:", error);
        throw error;
    }
};

export const getAllQuizForSolvedMistake = async (mistake_id, token) => {
    try {

        if (!mistake_id) {
            throw new Error("Mistake ID is required.");
        }

        if (!token) {
            throw new Error("Token is required.");
        }

        const response = await fetch(`http://localhost:4000/api/mistake/${mistake_id}/quiz/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch all quiz questions for solved mistake");
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error in getAllQuizForSolvedmistake:", error);
        throw error;
    }
};

export const submitQuiz = async (mistake_id, quiz_id, answers, token, updateCommonMistakeCompletion, updateTopicCompletion) => {
  try {
    if (!mistake_id) {
        throw new Error("Mistake ID is required.");
    }

    if (!quiz_id) {
        throw new Error("Quiz ID is required in the mistake service.");
    }

    if (!answers) {
        throw new Error("Answers are required.");
    }

    if (!token) {
        throw new Error("Token is required.");
    }

    const response = await fetch(`http://localhost:4000/api/mistake/quiz/${mistake_id}/${quiz_id}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answers }),
    });

    console.log("response: ", response);

    if (!response.ok) {
      throw new Error("Failed to submit quiz in mistake service");
    }

    const json = await response.json();

    console.log("json: ", json);

    const { data: completion_status } = json;

    console.log("completion_status: ", completion_status);


    if (completion_status.mistake_completed) {
      updateCommonMistakeCompletion(mistake_id, true);
    }

    if (completion_status.topic_completed) {
      // Assuming that the mistake is tied to a topic and you have topic_id available.
      updateTopicCompletion(completion_status.topic_id, true);
    }

    return completion_status; // Return the data for further use if needed
  } catch (error) {
    console.error("Error in submitQuiz:", error);
    throw error;
  }
};
