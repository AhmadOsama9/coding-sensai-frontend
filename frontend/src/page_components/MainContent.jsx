import React, { useState } from 'react';
import { fetchMilestoneContent, fetchCommonMistakeContent, fetchCodeContent } from '../services/TopicMainContentService'; 

import { useAuth } from '../hooks/UseAuth';
import RenderMilestoneContent from '../course_main_content_helper/RenderMilestoneContent';
import RenderCommonMistakeContent from '../course_main_content_helper/RenderCommonMistakeContent'; // Import new component
import TestControls from './TestControls';
import ResourcesComponent from '../course_main_content_helper/ResourcesComponent';
import RenderCodeContent from '../course_main_content_helper/RenderCodeContent';
import { getAssignmentByTopicId } from '../services/AssignmentService';
import AssignmentComponent from '../course_main_content_helper/AssignmentComponent';

const MainContent = ({ topic }) => {
  const [expandedMilestones, setExpandedMilestones] = useState({});
  const [expandedMistakes, setExpandedMistakes] = useState({});
  const [expandedResources, setExpandedResources] = useState(false);
  const [expandedCode, setExpandedCode] = useState({});
  const [expandedAssignment, setExpandedAssignment] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const { token } = useAuth();

  const toggleMilestone = async (milestoneId) => {
    const isCurrentlyExpanded = expandedMilestones[milestoneId]?.isExpanded;

    if (!isCurrentlyExpanded && !expandedMilestones[milestoneId]?.content) {
      const milestoneContent = await fetchMilestoneContent(milestoneId, token);
      setExpandedMilestones((prev) => ({
        ...prev,
        [milestoneId]: { content: milestoneContent, isExpanded: true },
      }));
    } else {
      setExpandedMilestones((prev) => ({
        ...prev,
        [milestoneId]: { ...prev[milestoneId], isExpanded: !isCurrentlyExpanded },
      }));
    }
  };

  const toggleCommonMistake = async (mistakeId) => {
    const isCurrentlyExpanded = expandedMistakes[mistakeId]?.isExpanded;

    if (!isCurrentlyExpanded && !expandedMistakes[mistakeId]?.content) {
      const mistakeContent = await fetchCommonMistakeContent(mistakeId, token); // Fetch mistake content
      setExpandedMistakes((prev) => ({
        ...prev,
        [mistakeId]: { content: mistakeContent, isExpanded: true },
      }));
    } else {
      setExpandedMistakes((prev) => ({
        ...prev,
        [mistakeId]: { ...prev[mistakeId], isExpanded: !isCurrentlyExpanded },
      }));
    }
  };

  const toggleCode = async (codeId) => {
    const isCurrentlyExpanded = expandedCode[codeId]?.isExpanded;

    if (!isCurrentlyExpanded && !expandedCode[codeId]?.content) {
      const codeContent = await fetchCodeContent(codeId, token);
      setExpandedCode((prev) => ({
        ...prev,
        [codeId]: { content: codeContent, isExpanded: true },
      }));
    }
    else {
      setExpandedCode((prev) => ({
        ...prev,
        [codeId]: { ...prev[codeId], isExpanded: !isCurrentlyExpanded },
      }));
    }
  };

  const toggleResources = () => {
    setExpandedResources(!expandedResources);
  }

  const toggleAssignment = async () => {
    const assignment = await getAssignmentByTopicId(topic.topic_id, token);
    setAssignment(assignment);
    setExpandedAssignment(!expandedAssignment);
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-primaryText mb-6">{topic.topic_name}</h2>

      {/* Milestones Section */}
      {topic.milestones.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primaryText mb-4">Milestones</h3>
          <ul className="space-y-4">
            {topic.milestones.map((milestone) => {
              const isExpanded = expandedMilestones[milestone.milestone_id]?.isExpanded;
              return (
                <li
                  key={milestone.milestone_id}
                  className={`border-b border-border pb-2 rounded-lg transition-all ${isExpanded ? 'bg-hoverPrimary text-white' : 'bg-cardBg text-primaryText'}`}
                >
                  <div
                    className={`flex justify-between items-center p-3 cursor-pointer shadow-sm rounded-md transition-colors ${isExpanded ? 'bg-hoverPrimary text-white' : 'bg-cardBg text-primaryText'}`}
                    onClick={() => toggleMilestone(milestone.milestone_id)}
                  >
                    <h4 className="font-semibold flex items-center space-x-3">
                      <span>{milestone.milestone_title}</span>
                      <span className={`ml-2 font-bold ${milestone.user_complete ? 'text-accent' : 'text-muted'}`}>
                        {milestone.user_complete ? '✅' : '❌'}
                      </span>
                    </h4>
                    <span className="text-lg">{isExpanded ? '▼' : '▶'}</span>
                  </div>
                  {isExpanded && (
                    <div className="bg-white p-4 mt-2 rounded-lg">
                      <RenderMilestoneContent user_complete={milestone.user_complete} milestone={expandedMilestones[milestone.milestone_id]?.content} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Common Mistakes Section */}
      {topic.commonMistakes.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primaryText mb-4">Common Mistakes</h3>
          <ul className="space-y-4">
            {topic.commonMistakes.map((mistake) => {
              const isExpanded = expandedMistakes[mistake.mistake_id]?.isExpanded;
              return (
                <li
                  key={mistake.mistake_id}
                  className={`border-b border-border pb-2 rounded-lg transition-all ${isExpanded ? 'bg-hoverPrimary text-white' : 'bg-cardBg text-primaryText'}`}
                >
                  <div
                    className={`flex justify-between items-center p-3 cursor-pointer shadow-sm rounded-md transition-colors ${isExpanded ? 'bg-hoverPrimary text-white' : 'bg-cardBg text-primaryText'}`}
                    onClick={() => toggleCommonMistake(mistake.mistake_id)}
                  >
                    <h4 className="font-semibold flex items-center space-x-3">
                      <span>{mistake.mistake_title}</span>
                      <span className={`ml-2 font-bold ${mistake.user_complete ? 'text-accent' : 'text-muted'}`}>
                        {mistake.user_complete ? '✅' : '❌'}
                      </span>
                    </h4>
                    <span className="text-lg">{isExpanded ? '▼' : '▶'}</span>
                  </div>
                  {isExpanded && (
                    <div className="bg-white p-4 mt-2 rounded-lg">
                      <RenderCommonMistakeContent user_complete={mistake.user_complete} mistake={expandedMistakes[mistake.mistake_id]?.content} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Code Example section */}
      {topic.codeExamples.length > 0 && (
        <section className="mb-8">
        <h3 className="text-xl font-semibold text-primaryText mb-4">Code Examples</h3>
          <ul className="space-y-4">
              {topic.codeExamples.map((code) => {
                const isExpanded = expandedCode[code.example_id]?.isExpanded;
                return (
                  <li
                    key={code.example_id}
                    className={`border-b border-border pb-2 rounded-lg transition-all ${isExpanded ? 'bg-hoverPrimary text-white' : 'bg-cardBg text-primaryText'}`}
                  >
                    <div
                      className={`flex justify-between items-center p-3 cursor-pointer shadow-sm rounded-md transition-colors ${isExpanded ? 'bg-hoverPrimary text-white' : 'bg-cardBg text-primaryText'}`}
                      onClick={() => toggleCode(code.example_id)}
                    >
                      <h4 className="font-semibold flex items-center space-x-3">
                        <span>{code.example_title}</span>
                      </h4>
                      <span className="text-lg">{isExpanded ? '▼' : '▶'}</span>
                    </div>
                    {isExpanded && (
                      <div className="bg-white p-4 mt-2 rounded-lg">
                        <RenderCodeContent code={expandedCode[code.example_id]?.content} />
                      </div>
                    )}

                  </li>
                )
              })}
            </ul>
        </section>
      )}

      {/* Resources Section */}
      <section className="mb-8">
        <div
          className={`flex justify-between items-center p-3 cursor-pointer shadow-sm rounded-md transition-colors ${expandedResources ? 'bg-hoverPrimary text-white' : 'bg-cardBg text-primaryText'}`}
          onClick={toggleResources}
        >
          <h3 className="text-xl font-semibold">Resources</h3>
          <span className="text-lg">{expandedResources ? '▼' : '▶'}</span>
        </div>
        {expandedResources && (
          <div className="bg-white p-4 mt-2 rounded-lg">
            <ResourcesComponent topicId={topic.topic_id} token={token} />
          </div>
        )}
      </section>


      {/*Assignment */}
      {topic.assignment && <section className="mb-8">
        <div
          className={`flex justify-between items-center p-3 cursor-pointer shadow-sm rounded-md transition-colors ${expandedAssignment ? 'bg-hoverPrimary text-white' : 'bg-cardBg text-primaryText'}`}
          onClick={toggleAssignment}
        >
         <h4 className="font-semibold flex items-center space-x-3">
            <span>{topic.assignment.assignment_title}</span>
            <span className={`ml-2 font-bold ${topic.assignment.completed ? 'text-accent' : 'text-muted'}`}>
              {topic.assignment.completed ? '✅' : '❌'}
            </span>
          </h4>
          <span className="text-lg">{expandedAssignment ? '▼' : '▶'}</span>
        </div>
        {expandedAssignment && (
          <div className="bg-white p-4 mt-2 rounded-lg">
            <AssignmentComponent topicId={topic.topic_id} token={token} assignment={assignment} completed={topic.assignment.completed} />
          </div>
        )}
      </section>
      }

      {/* Project Section */}
      
      

      <TestControls milestoneId={2} topicId={2} mistakeId={3} />

    </div>
  );
};

export default MainContent;
