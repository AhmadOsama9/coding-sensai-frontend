const COMPLETED_TOPICS_KEY = 'completedTopicsData';
const REFRESH_THRESHOLD = 3;

// Get completed topics data from localStorage if valid
export const getCachedCompletedTopicsData = () => {
    const cachedData = localStorage.getItem(COMPLETED_TOPICS_KEY);
    if (!cachedData) return null;

    const { data, count, timestamp } = JSON.parse(cachedData);
    const now = new Date().getTime();
    const dataAge = now - timestamp;

    if (count >= REFRESH_THRESHOLD || dataAge > 24 * 60 * 60 * 1000) {
        // Data is stale or accessed too many times; invalidate cache
        return null;
    }

    return { data, count };
};

// Cache new completed topics data in localStorage
export const cacheCompletedTopicsData = (data) => {
    const timestamp = new Date().getTime();
    const cache = { data, count: 0, timestamp };
    localStorage.setItem(COMPLETED_TOPICS_KEY, JSON.stringify(cache));
};

// Increment access count in localStorage
export const incrementCompletedTopicsAccessCount = () => {
    const cachedData = localStorage.getItem(COMPLETED_TOPICS_KEY);
    if (!cachedData) return;

    const { data, count, timestamp } = JSON.parse(cachedData);
    const updatedCache = { data, count: count + 1, timestamp };
    localStorage.setItem(COMPLETED_TOPICS_KEY, JSON.stringify(updatedCache));
};

// Fetch completed topics data from API
export const fetchCompletedTopicsDataFromAPI = async (token) => {
    console.log("Fetching completed topics data from API");

    const response = await fetch("http://localhost:4000/api/dashboard/completed_topics", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        return new Error("Failed to fetch completed topics data");
    }

    const json = await response.json();

    console.log("Fetched completed topics data: ", json);

    return json;
};
