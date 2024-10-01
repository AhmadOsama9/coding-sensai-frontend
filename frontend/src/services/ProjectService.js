export const fetchProjectContent = async (courseId, token) => {
    try {
        if (!token) {
            throw new Error("No token saved!");
        }

        if (!courseId) {
            throw new Error("No CourseId sent!");
        }

        const response = await fetch(`http://localhost:4000/api/project/${courseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Unauthorized: Please log in to access this project");
            } else {
                throw new Error("Failed to fetch project data");
            }
        }

        console.log("Fetched project data: ", json);

        return json;
    } catch (error) {
        console.error("Error in fetchProjectContent:", error);
        throw error;
    }
}


export const submitProject = async (courseId, projectId, token, repoUrl, submissionNotes) => {
    try {

        if (!token) {
            throw new Error("No token saved!");
        }

        if (!courseId) {
            throw new Error("No CourseId sent!");
        }

        if (!projectId) {
            throw new Error("No ProjectId sent!");
        }

        if (!repoUrl) {
            throw new Error("No RepoUrl sent!");
        }

        console.log("courseId: ", courseId);

        const response = await fetch(`http://localhost:4000/api/project/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                course_id: courseId,
                course_project_id: projectId,
                repo_url: repoUrl,
                submission_notes: submissionNotes,
            }),
        });

        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.error || "Failed to submit project.");
        }

        return json;
    } catch (error) {
        console.error("Error in submitProject:", error);
        throw error;
    }
};


export const fetchProjectReview = async (projectId, token) => {
    try {

        if (!token) {
            throw new Error("No token saved!");
        }

        if (!projectId) {
            throw new Error("No ProjectId sent!");
        }


        const response = await fetch(`http://localhost:4000/api/project/review/${projectId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.error || "Failed to fetch project review.");
        }

        return json;
    } catch (error) {
        console.error("Error in fetchProjectReview:", error);
        throw error;
    }
};
