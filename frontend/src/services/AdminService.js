export const adminLogin = async (username, password) => {
    const response = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}


export const fetchAllUsersProjects = async (status, token) => {
    const response = await fetch (`http://localhost:4000/api/admin/projects?status=${status}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}


export const markProjectAsReviewed = async (project_id, status, review_notes, token) => {
    const response = await fetch("http://localhost:4000/api/admin/projects/review", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ project_id, status, review_notes }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
}

