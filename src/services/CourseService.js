const COURSES_KEY = 'coursesData';
const MAX_REFRESH_COUNT = 6; // Max refresh count before invalidating the cache

// Cache courses data in localStorage with timestamp and refresh count
export const cacheCoursesData = (data) => {
  const timestamp = new Date().getTime();
  const refreshCount = 0; // Reset the refresh count when caching new data
  const cache = { data, timestamp, refreshCount };
  localStorage.setItem(COURSES_KEY, JSON.stringify(cache));
};

// Get cached courses data from localStorage if valid
export const getCachedCoursesData = () => {
  const cachedData = localStorage.getItem(COURSES_KEY);
  if (!cachedData) return null; // No cached data
  
  const { data, timestamp, refreshCount } = JSON.parse(cachedData);
  const now = new Date().getTime();
  const dataAge = now - timestamp;

  console.log('Checking cache validity:', { data, dataAge, refreshCount }); // Add debugging log

  // Invalidate cache if data is older than 24 hours or refresh count exceeds the max
  if (dataAge > 24 * 60 * 60 * 1000 || refreshCount >= MAX_REFRESH_COUNT) {
    return null; // Cache is invalid, return null
  }

  return { data }; // Ensure returning the correct data format
};


// Increment the refresh count in the cache
export const incrementRefreshCount = () => {
  const cachedData = localStorage.getItem(COURSES_KEY);
  if (!cachedData) return;

  const { data, timestamp, refreshCount } = JSON.parse(cachedData);
  localStorage.setItem(COURSES_KEY, JSON.stringify({ data, timestamp, refreshCount: refreshCount + 1 }));
};

// Fetch courses from the API
export const fetchCoursesFromAPI = async (token) => {
  const response = await fetch('http://localhost:4000/api/course', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch courses data');
  }

  const json = await response.json();
  console.log('Fetched courses data: ', json);
  return json;
};


// Fetch and cache courses data with validation and token
export const fetchCoursesWithCache = async (token) => {
  const cachedData = getCachedCoursesData();
  
  if (cachedData) {
    console.log('Using cached courses data:', cachedData.data); // Add debugging log
    incrementRefreshCount(); // Increment the refresh count if cache is used
    return cachedData.data;  // Make sure this is not undefined or null
  }

  const freshData = await fetchCoursesFromAPI(token);
  console.log('Fetched fresh courses data:', freshData); // Add debugging log
  cacheCoursesData(freshData);  // Cache the fresh data
  return freshData;
};
