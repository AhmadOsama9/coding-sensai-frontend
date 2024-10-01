import React, { useState } from 'react';

const Milestones = ({ milestones }) => {
  const [expandedMilestones, setExpandedMilestones] = useState({});
  const [expandedMilestoneItems, setExpandedMilestoneItems] = useState({});

  const toggleMilestones = (topicId) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const toggleMilestoneItems = (milestoneId) => {
    setExpandedMilestoneItems((prev) => ({
      ...prev,
      [milestoneId]: !prev[milestoneId],
    }));
  };

  return (
    <>
      {milestones.length > 0 && (
        <>
          <div className="mt-4 cursor-pointer " onClick={() => toggleMilestones(milestones[0].topic_id)}>
            <h4 className="text-xl font-semibold mb-2 text-primaryText flex justify-between">
                Milestones
                <span>{expandedMilestones[milestones[0].topic_id] ? '-' : '+'}</span>
            </h4>
          </div>
          {expandedMilestones[milestones[0].topic_id] && (
          <ul className="space-y-3">
            {milestones.map((milestone) => (
              <li key={milestone.milestone_id} className="p-4 bg-cardBg rounded-lg shadow-md border border-border">
                <div className="cursor-pointer" onClick={() => toggleMilestoneItems(milestone.milestone_id)}>
                  <h5 className="font-bold text-primaryText flex justify-between">
                    {milestone.milestone_title}
                    <span>{expandedMilestoneItems[milestone.milestone_id] ? '-' : '+'}</span>
                  </h5>
                </div>

                {expandedMilestoneItems[milestone.milestone_id] && (
                  <>
                    <p className="text-secondaryText mt-2">{milestone.milestone_description}</p>
                    
                    {milestone.quiz && milestone.quiz.length > 0 && (
                      <div className="mt-2">
                        <h5 className="text-lg font-semibold text-primaryText">Quiz</h5>
                        <ul className="space-y-2">
                          {milestone.quiz.map((quiz) => (
                            <li key={quiz.quiz_id} className="p-2 bg-cardBg rounded-lg">
                              <h6>{quiz.quiz_title}</h6>
                              <p>{quiz.quiz_description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        </>
      )}
    </>
  );
};

export default Milestones;
