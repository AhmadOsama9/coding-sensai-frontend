import React, { createContext, useContext, useState } from 'react';
import { cacheFullUserCourseData } from '../services/FullUserCourseService';

const CourseContext = createContext();

export const UserCourseProvider = ({ children }) => {
  const [courseData, updateCourseData] = useState(null);

  const updateMilestoneCompletion = (milestoneId, isCompleted) => {
    updateCourseData((prevCourse) => {
      if (!prevCourse) return prevCourse;

      // Ensure topics exist
      const updatedTopics = prevCourse.topics.map((topic) => {
        // Check if milestones exist in the topic
        const updatedMilestones = topic.milestones.map((milestone) => {
          if (milestone.milestone_id === milestoneId) {
            return { ...milestone, user_complete: isCompleted }; // Update completion status
          }
          return milestone;
        });
        return { ...topic, milestones: updatedMilestones }; // Return updated topic
      });

      const updatedCourse = { ...prevCourse, topics: updatedTopics };
      cacheFullUserCourseData(prevCourse.course_id, updatedCourse); // Update cache with the new state
      return updatedCourse;
    });
  };

  const updateTopicCompletion = (topicId, isCompleted) => {
    updateCourseData((prevCourse) => {
      if (!prevCourse) return prevCourse;

      // Check if the topic exists
      const updatedTopics = prevCourse.topics.map((topic) => {
        if (topic.topic_id === topicId) {
          return { ...topic, user_completed: isCompleted }; // Update completion status
        }
        return topic;
      });

      const updatedCourse = { ...prevCourse, topics: updatedTopics };
      cacheFullUserCourseData(prevCourse.course_id, updatedCourse); // Update cache with the new state
      return updatedCourse;
    });
  };

  // New function to update completion status of a common mistake
  const updateCommonMistakeCompletion = (mistakeId, isCompleted) => {
    updateCourseData((prevCourse) => {
      if (!prevCourse) return prevCourse;

      console.log("common mistakeId is: ", mistakeId);

      // Ensure topics exist
      const updatedTopics = prevCourse.topics.map((topic) => {
        // Check if common mistakes exist in the topic
        const updatedCommonMistakes = topic.commonMistakes.map((mistake) => {
          if (mistake.mistake_id === mistakeId) {
            return { ...mistake, user_complete: isCompleted }; // Update completion status
          }
          return mistake;
        });
        return { ...topic, commonMistakes: updatedCommonMistakes }; // Return updated topic with updated common mistakes
      });

      const updatedCourse = { ...prevCourse, topics: updatedTopics };
      cacheFullUserCourseData(prevCourse.course_id, updatedCourse); // Update cache with the new state
      return updatedCourse;
    });
  };

  const updateAssignmentCompletion = (topicId, isCompleted) => {
    updateCourseData((prevCourse) => {
      if (!prevCourse) return prevCourse;
  
      // Ensure topics exist
      const updatedTopics = prevCourse.topics.map((topic) => {
        if (topic.topic_id === topicId) {
          // Check if the assignment exists in the topic
          const updatedAssignment = { 
            ...topic.assignment, 
            completed: isCompleted 
          }; // Update completion status
          
          return { ...topic, assignment: updatedAssignment }; // Return updated topic with updated assignment
        }
        return topic; // Return unchanged topic
      });
  
      const updatedCourse = { ...prevCourse, topics: updatedTopics };
      cacheFullUserCourseData(prevCourse.course_id, updatedCourse); // Update cache with the new state
      return updatedCourse;
    });
  };

  return (
    <CourseContext.Provider
      value={{
        courseData,
        updateCourseData,
        updateMilestoneCompletion,
        updateTopicCompletion,
        updateCommonMistakeCompletion,
        updateAssignmentCompletion,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
