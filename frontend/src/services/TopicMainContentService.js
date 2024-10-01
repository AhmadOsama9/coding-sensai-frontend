/*
    So assuming that I will start with the milestones
    I will need to have an API to get the milestone data
    and then return and displays it on the page
    and also the quiz on each milestone should be requested independently
    we should check the data being returned for that milestone if there's was no quiz available 
    the passing of that milestone will be an API and it will be just a click
    but if there was a quiz then the user will have to solve it correctly and then it will be marked as completed from the backend

    we will have to handle what we requested before which was as follows, 
    so will be a random quiz of 5 questions
    each time he fails we will only show the score
    but when he succeeds we will show all the questions and their correct answers
    and whenever he tries to enter the quiz for that milestone we will do that
    
*/

export const fetchMilestoneContent = async (milestoneId, token) => {
    
    if (!token) {
        throw new Error("No token saved!");
    }

    const response = await fetch(`http://localhost:4000/api/milestone/${milestoneId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Unauthorized: Please log in to access this milestone");
        } else {
            throw new Error("Failed to fetch milestone data");
        }
    }

    console.log("Fetched milestone data: ", json);

    return json;
}

export const fetchCommonMistakeContent = async (commonMisatkeId, token) => {
    try {
        if (!token) {
            throw new Error("No token saved!");
        }

        const response = await fetch(`http://localhost:4000/api/mistake/${commonMisatkeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Unauthorized: Please log in to access this common mistake");
            } else {
                throw new Error("Failed to fetch common mistake data");
            }
        }

        console.log("Fetched common mistake data: ", json);

        return json;
    } catch (error) {
        console.error("Error in fetchCommonMistakeContent:", error);
        throw error;
    }
}

export const fetchCodeContent = async (codeId, token) => {
    try {
        const response = await fetch(`http://localhost:4000/api/code/${codeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch code");
        }

        const data = await response.json();
        console.log("get code by id", data);

        return data;

    } catch (error) {
        console.error("Error in getCodeById");
        throw error;
    }
}

// okay now we need to create the quiz API
// and a submit API
// And if the milestone is completed we should return the quiz data answered 
// We also need to add the API to mark the milestone as completed
// We also need to make sure that the markdown data is working fine
// Then I should complete the cloudFront setup and have the website as https using cloudfront and the BLOB
// Also update the topic completion number for the milestone and the common_mistake
// It is weird that I still use the milesstone as a common name 

