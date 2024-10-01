// In FullUserCourseService.js

const FULL_USER_COURSE_KEY = 'fullUserCourseData';
const MAX_REFRESH_COUNT = 1; // Max refresh count before invalidating the cache
// Cause otherwise things is not being refreshed as it is suposed to so I'm kinda of forced to do this
// But in the future if I find something then I will update it insha'allah
const STORAGE_LIMIT = 5 * 1024 * 1024; // 5 MB in bytes
const CACHE_EXPIRY_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const shouldCacheData = (data) => {
  const dataString = JSON.stringify(data);
  const size = new Blob([dataString]).size;
  return size <= STORAGE_LIMIT;
};

export const cacheFullUserCourseData = (courseId, data) => {
  if (shouldCacheData(data)) {
    const cache = { data, timestamp: Date.now(), refreshCount: 0 }; 
    localStorage.setItem(`${FULL_USER_COURSE_KEY}_${courseId}`, JSON.stringify(cache));
  }
};

export const getCachedFullUserCourseData = (courseId) => {
  const cachedData = localStorage.getItem(`${FULL_USER_COURSE_KEY}_${courseId}`);
  if (!cachedData) return null;

  const { data, timestamp, refreshCount } = JSON.parse(cachedData);
  const dataAge = Date.now() - timestamp;

  // Invalidate cache if data is older than CACHE_EXPIRY_DURATION or refresh count exceeds the max
  if (dataAge > CACHE_EXPIRY_DURATION || refreshCount >= MAX_REFRESH_COUNT) {
    return null;
  }

  return { data, refreshCount };
};

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

// Fetch full user course data from API with proper error handling
export const fetchFullUserCourseDataFromAPI = async (courseId, token) => {
  if (!token) throw new Error('Unauthorized: Please log in to access this course.');

  const response = await fetch(`http://localhost:4000/api/course/user/full/${courseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.error || 'Failed to fetch user full course data');
  }

  const data = await response.json();

  console.log("user course data: ", data);

  return data;
};

export const fetchFullUserCourseDataWithCache = async (courseId, token) => {
  const cachedData = getCachedFullUserCourseData(courseId);
  if (cachedData) {
    incrementRefreshCount(courseId); 
    return cachedData.data;
  }

  const freshData = await fetchFullUserCourseDataFromAPI(courseId, token);
  if (shouldCacheData(freshData)) {
    cacheFullUserCourseData(courseId, freshData);
  }
  return freshData;
};
