export const getResourcesByTopicId = async (topic_id, token) => {
    try {
        const response = await fetch(`http://localhost:4000/api/resource/${topic_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch resources for topic");
        }

        const data = await response.json();
        console.log("get resources for topic", data);

        return data;

    } catch (error) {
        console.error("Error in getResourceByTopicId");
        throw error;
    }
}

