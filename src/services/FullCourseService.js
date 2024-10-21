// In FullCourseService.js

const FULL_COURSE_KEY = 'fullCourseData';
const MAX_REFRESH_COUNT = 5; // Max refresh count before invalidating the cache

// Check if the data size exceeds the storage limit
const shouldCacheData = (data) => {
  const dataString = JSON.stringify(data);
  const size = new Blob([dataString]).size;
  const STORAGE_LIMIT = 5 * 1024 * 1024; // 5 MB in bytes
  return size <= STORAGE_LIMIT;
};

// Cache full course data in local storage if it fits within the limit
export const cacheFullCourseData = (courseId, data) => {
  if (shouldCacheData(data)) {
    const timestamp = new Date().getTime();
    const cache = { data, timestamp, refreshCount: 0 }; // Reset refresh count when caching new data
    localStorage.setItem(`${FULL_COURSE_KEY}_${courseId}`, JSON.stringify(cache));
  }
};

// Retrieve cached full course data
export const getCachedFullCourseData = (courseId) => {
  const cachedData = localStorage.getItem(`${FULL_COURSE_KEY}_${courseId}`);
  if (!cachedData) return null;

  const { data, timestamp, refreshCount } = JSON.parse(cachedData);
  const now = new Date().getTime();
  const dataAge = now - timestamp;

  // Invalidate cache if data is older than 24 hours or refresh count exceeds the max
  if (dataAge > 24 * 60 * 60 * 1000 || refreshCount >= MAX_REFRESH_COUNT) {
    return null;
  }

  return { data, refreshCount };
};

// Increment the refresh count for the cache
export const incrementRefreshCount = (courseId) => {
  const cachedData = localStorage.getItem(`${FULL_COURSE_KEY}_${courseId}`);
  if (!cachedData) return;

  const { data, timestamp, refreshCount } = JSON.parse(cachedData);
  localStorage.setItem(`${FULL_COURSE_KEY}_${courseId}`, JSON.stringify({
    data,
    timestamp,
    refreshCount: refreshCount + 1
  }));
};

// Fetch full course data from API
export const fetchFullCourseDataFromAPI = async (courseId, token) => {
  console.log('Fetching full course data from API');

  if (!token) {
    throw new Error('Please Login to access this course, if you are logged_in then log out and login again, sorry for the inconvenience');
  }


  const response = await fetch(`https://14gl3r3q1j.execute-api.us-east-1.amazonaws.com/api/course/full/${courseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in to access this course');
    } else if (response.status === 403) {
      throw new Error('Forbidden: You do not have permission to access this course');
    } else {
      throw new Error('Failed to fetch full course data');
    }
  }

  const json = await response.json();
  console.log("Fetched full course data: ", json);

  return json;
};

// Fetch full course data with caching
export const fetchFullCourseDataWithCache = async (courseId, token) => {
  console.log('Fetching full course data with cache');

  const cachedData = getCachedFullCourseData(courseId);
  if (cachedData) {
    incrementRefreshCount(courseId); // Increment the refresh count if cache is used
    return cachedData.data;
  }

  const freshData = await fetchFullCourseDataFromAPI(courseId, token);
  if (shouldCacheData(freshData)) {
    cacheFullCourseData(courseId, freshData); // Cache the fresh data if it fits within the limit
  }
  return freshData;
};
