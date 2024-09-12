const DASHBOARD_KEY = 'dashboardData';
const REFRESH_THRESHOLD = 3;  // Number of allowed accesses before refreshing

// Get dashboard data from localStorage if valid
export const getCachedDashboardData = () => {
    const cachedData = localStorage.getItem(DASHBOARD_KEY);
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

// Cache new dashboard data in localStorage
export const cacheDashboardData = (data) => {
    const timestamp = new Date().getTime();
    const cache = { data, count: 0, timestamp };
    localStorage.setItem(DASHBOARD_KEY, JSON.stringify(cache));
};


// Increment access count in localStorage
export const incrementDashboardAccessCount = () => {
    const cachedData = localStorage.getItem(DASHBOARD_KEY);
    if (!cachedData) return;

    const { data, count, timestamp } = JSON.parse(cachedData);
    const updatedCache = { data, count: count + 1, timestamp };
    localStorage.setItem(DASHBOARD_KEY, JSON.stringify(updatedCache));
};

// Fetch dashboard data from the API
export const fetchDashboardDataFromAPI = async (token) => {
    console.log("Fetching dashboard data from API");

    const response = await fetch("http://localhost:4000/api/dashboard", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch dashboard data");
    }

    const json = await response.json();
    console.log("Fetched dashboard data: ", json);

    return json;
};
