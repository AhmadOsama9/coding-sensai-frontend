// In CourseOverviewService.js

const COURSE_OVERVIEW_KEY = 'courseOverviewData';
const MAX_REFRESH_COUNT = 5; // Max refresh count before invalidating the cache

export const cacheCourseOverview = (courseId, data) => {
  const timestamp = new Date().getTime();
  const refreshCount = 0; // Reset the refresh count when caching new data
  const cache = { data, timestamp, refreshCount };
  localStorage.setItem(`${COURSE_OVERVIEW_KEY}_${courseId}`, JSON.stringify(cache));
};

export const getCachedCourseOverview = (courseId) => {
  const cachedData = localStorage.getItem(`${COURSE_OVERVIEW_KEY}_${courseId}`);
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

export const incrementRefreshCount = (courseId) => {
  const cachedData = localStorage.getItem(`${COURSE_OVERVIEW_KEY}_${courseId}`);
  if (!cachedData) return;

  const { data, timestamp, refreshCount } = JSON.parse(cachedData);
  localStorage.setItem(`${COURSE_OVERVIEW_KEY}_${courseId}`, JSON.stringify({
    data,
    timestamp,
    refreshCount: refreshCount + 1
  }));
};

export const fetchCourseOverviewFromAPI = async (courseId) => {
  console.log('Fetching course overview data from API');

  const response = await fetch(`http://localhost:4000/api/course/overview/${courseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch course overview');
  }

  const json = await response.json();
  console.log("Fetched course overview data: ", json);

  return json;
};

export const fetchCourseOverviewWithCache = async (courseId) => {
  console.log('Fetching course overview data with cache');

  const cachedData = getCachedCourseOverview(courseId);
  if (cachedData) {
    incrementRefreshCount(courseId); // Increment the refresh count if cache is used
    return cachedData.data;
  }

  const freshData = await fetchCourseOverviewFromAPI(courseId);
  cacheCourseOverview(courseId, freshData); // Cache the fresh data
  return freshData;
};
