const STARTED_COURSES_KEY = "startedCourses";
const REFRESH_THRESHOLD = 3;  // Number of allowed accesses before refreshing


export const getCachedStartedCourses = () => {
    const cachedData = localStorage.getItem(STARTED_COURSES_KEY);
    if (!cachedData) return null;

    const { data, count, timestamp } = JSON.parse(cachedData);
    const now = new Date().getTime();
    const dataAge = now - timestamp;

    if (count >= REFRESH_THRESHOLD || dataAge > 24 * 60 * 60 * 1000) {
        // Data is stale or accessed too many times; invalidate cache
        return null;
    }

    return { data, count };
}

export const cacheStartedCourses = (data) => {
    const timestamp = new Date().getTime();
    const cache = { data, count: 0, timestamp };
    localStorage.setItem(STARTED_COURSES_KEY, JSON.stringify(cache));
}

export const incrementStartedCoursesAccessCount = () => {
    const cachedData = localStorage.getItem(STARTED_COURSES_KEY);
    if (!cachedData) return;

    const { data, count, timestamp } = JSON.parse(cachedData);
    const updatedCache = { data, count: count + 1, timestamp };
    localStorage.setItem(STARTED_COURSES_KEY, JSON.stringify(updatedCache));
}

export const fetchStartedCoursesFromAPI = async (token) => {
    console.log("Fetching started courses from API");

    if (!token) {
        throw new Error("Unauthorized: Please log in to access this course.");
    }

    const response = await fetch("http://localhost:4000/api/course/user/started", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    

    if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch started courses");
    }

    const json = await response.json();
    console.log("Fetched started courses: ", json);

    return json;
};

export const fetchStartedCoursesWithCache = async (token) => {
    const cachedData = getCachedStartedCourses();

    if (cachedData) {
        incrementStartedCoursesAccessCount();
        return cachedData.data;
    }

    try {
        const data = await fetchStartedCoursesFromAPI(token);
        cacheStartedCourses(data);
        return data;
    } catch (error) {
        throw error;
    }
};