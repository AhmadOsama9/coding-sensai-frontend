import React, { useState } from 'react';

const CommonMistakes = ({ commonMistakes }) => {
  const [expandedCommonMistakes, setExpandedCommonMistakes] = useState({});
  const [expandedCommonMistakeItems, setExpandedCommonMistakeItems] = useState({});

  const toggleCommonMistakes = (topicId) => {
    setExpandedCommonMistakes((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const toggleCommonMistakeItems = (mistakeId) => {
    setExpandedCommonMistakeItems((prev) => ({
      ...prev,
      [mistakeId]: !prev[mistakeId],
    }));
  };

  return (
    <>
      {commonMistakes.length > 0 && (
        <>
          <div className="cursor-pointer mt-2" onClick={() => toggleCommonMistakes(commonMistakes[0].topic_id)}>
            <h4 className="text-xl font-semibold text-primaryText flex justify-between">
              Common Mistakes
              <span>{expandedCommonMistakes[commonMistakes[0].topic_id] ? '-' : '+'}</span>
            </h4>
          </div>
          {expandedCommonMistakes[commonMistakes[0].topic_id] && (
            <ul className="mt-2 space-y-2">
              {commonMistakes.map((mistake) => (
                <li key={mistake.mistake_id} className="p-2 bg-cardBg rounded-lg">
                  <div onClick={() => toggleCommonMistakeItems(mistake.mistake_id)} className="cursor-pointer">
                    <h5 className="font-bold text-primaryText flex justify-between">
                      {mistake.mistake_title}
                      <span>{expandedCommonMistakeItems[mistake.mistake_id] ? '-' : '+'}</span>
                    </h5>
                  </div>

                  {expandedCommonMistakeItems[mistake.mistake_id] && (
                    <div>
                      <p>{mistake.mistake_description}</p>
                      {mistake.quiz && mistake.quiz.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-lg font-semibold text-primaryText">Quiz</h4>
                          <ul className="space-y-2">
                            {mistake.quiz.map((quiz) => (
                              <li key={quiz.quiz_id} className="p-2 bg-cardBg rounded-lg">
                                <h5>{quiz.quiz_title}</h5>
                                <p>{quiz.quiz_description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
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

export default CommonMistakes;
