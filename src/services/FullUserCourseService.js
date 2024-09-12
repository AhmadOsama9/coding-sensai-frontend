// In FullUserCourseService.js

const FULL_USER_COURSE_KEY = 'fullUserCourseData';
const MAX_REFRESH_COUNT = 5; // Max refresh count before invalidating the cache

// Check if the data size exceeds the storage limit
const shouldCacheData = (data) => {
  const dataString = JSON.stringify(data);
  const size = new Blob([dataString]).size;
  const STORAGE_LIMIT = 5 * 1024 * 1024; // 5 MB in bytes
  return size <= STORAGE_LIMIT;
};

// Cache full user course data in local storage if it fits within the limit
export const cacheFullUserCourseData = (courseId, data) => {
  if (shouldCacheData(data)) {
    const timestamp = new Date().getTime();
    const cache = { data, timestamp, refreshCount: 0 }; // Reset refresh count when caching new data
    localStorage.setItem(`${FULL_USER_COURSE_KEY}_${courseId}`, JSON.stringify(cache));
  }
};

// Retrieve cached full user course data
export const getCachedFullUserCourseData = (courseId) => {
  const cachedData = localStorage.getItem(`${FULL_USER_COURSE_KEY}_${courseId}`);
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
  const cachedData = localStorage.getItem(`${FULL_USER_COURSE_KEY}_${courseId}`);
  if (!cachedData) return;

  const { data, timestamp, refreshCount } = JSON.parse(cachedData);
  localStorage.setItem(`${FULL_USER_COURSE_KEY}_${courseId}`, JSON.stringify({
    data,
    timestamp,
    refreshCount: refreshCount + 1
  }));
};

// Fetch full user course data from API
export const fetchFullUserCourseDataFromAPI = async (courseId, token) => {
  console.log('Fetching full user course data from API');

  if (!token) {
    throw new Error('Unauthorized: Please log in to access this course.');
  }

  const response = await fetch(`http://localhost:4000/api/course/user/full/${courseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in to access this course');
    } else if (response.status === 403 && json.error == "No active subscription. Please subscribe to access this content.") {
      throw new Error('Subscription required: Please subscribe to access this course');
    } else {
      throw new Error('Failed to fetch user full course data');
    }
  }

  console.log("Fetched full user course data: ", json);

  return json;
};

// Fetch full user course data with caching
export const fetchFullUserCourseDataWithCache = async (courseId, token) => {
  console.log('Fetching full user course data with cache');

  const cachedData = getCachedFullUserCourseData(courseId);
  if (cachedData) {
    incrementRefreshCount(courseId); // Increment the refresh count if cache is used
    return cachedData.data;
  }

  const freshData = await fetchFullUserCourseDataFromAPI(courseId, token);
  if (shouldCacheData(freshData)) {
    cacheFullUserCourseData(courseId, freshData); // Cache the fresh data if it fits within the limit
  }
  return freshData;
};
