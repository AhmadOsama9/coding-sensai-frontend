export const getAssignmentByTopicId = async (topicId, token) => {
    try {
        if (!topicId) {
            throw new Error("Topic ID is required.");
        }

        if (!token) {
            throw new Error("Token is required.");
        }

        const response = await fetch(`http://localhost:4000/api/assignment/${topicId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch assignments for topic");
        }

        const data = await response.json();
        console.log("get assignments for topic", data);
        return data;
    } catch (error) {
        console.error("Error in getAssignmentByTopicId:", error);
        throw error;
    }
}

export const markAssignmentAsCompleted = async (assignmentId, token) => {
    try {
        if (!assignmentId) {
            throw new Error("Assignment ID is required.");
        }

        if (!token) {
            throw new Error("Token is required.");
        }

        const response = await fetch(`http://localhost:4000/api/assignment/${assignmentId}/complete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to mark assignment as completed");
        }

        const data = await response.json();
        console.log("mark assignment as completed", data);
        return data;
    } catch (error) {
        console.error("Error in markAssignmentAsCompleted:", error);
        throw error;
    }
};