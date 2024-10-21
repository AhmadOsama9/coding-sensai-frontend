// services/userActivityService.js
const LOGGING_KEY = 'userLoggedIn';

// Check if the user has already been logged in today
export const hasLoggedInToday = () => {
    const logData = localStorage.getItem(LOGGING_KEY);
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD

    if (!logData) return false;

    const { date } = JSON.parse(logData);
    return date === today;
};

// Store log status in localStorage with today's date
export const setLoggedInToday = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(LOGGING_KEY, JSON.stringify({ date: today }));
};

// Log user activity if not already logged in today
export const logUserActivityOncePerDay = async (token) => {
    try {
        if (!hasLoggedInToday()) {
            await logUserActivity(token);  // Call the API to log user activity
            setLoggedInToday();  // Update localStorage to prevent duplicate logging
        }
    } catch (err) {
        throw err;
    }
};

const logUserActivity = async (token) => {
    console.log("Logging user activity");
    const response = await fetch("https://14gl3r3q1j.execute-api.us-east-1.amazonaws.com/api/dashboard/log", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        console.log(response);
        return new Error("Failed to log user activity");
    }

    return true;
}
