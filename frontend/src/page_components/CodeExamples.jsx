import React, { useState } from 'react';

const CodeExamples = ({ codeExamples }) => {
  const [expandedCodeExamples, setExpandedCodeExamples] = useState({});
  const [expandedCodeExampleItems, setExpandedCodeExampleItems] = useState({});

  const toggleCodeExamples = (topicId) => {
    setExpandedCodeExamples((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const toggleCodeExampleItems = (exampleId) => {
    setExpandedCodeExampleItems((prev) => ({
      ...prev,
      [exampleId]: !prev[exampleId],
    }));
  };

  return (
    <>
      {codeExamples && (
        <>
          <div className="cursor-pointer mt-2" onClick={() => toggleCodeExamples(codeExamples[0].topic_id)}>
            <h4 className="text-xl font-semibold text-primaryText flex justify-between">
              Code Examples
              <span>{expandedCodeExamples[codeExamples[0].topic_id] ? '-' : '+'}</span>
            </h4>
          </div>
          {expandedCodeExamples[codeExamples[0].topic_id] && (
            <ul className="mt-2 space-y-2">
              {codeExamples.map((example) => (
                <li key={example.example_id} className="p-2 bg-cardBg rounded-lg">
                  <div onClick={() => toggleCodeExampleItems(example.example_id)} className="cursor-pointer">
                    <h5 className="font-semibold text-primaryText flex justify-between">
                      {example.example_title}
                      <span>{expandedCodeExampleItems[example.example_id] ? '-' : '+'}</span>
                    </h5>
                  </div>
                  {expandedCodeExampleItems[example.example_id] && (
                    <p className="mt-2 text-secondaryText">{example.example_description}</p>
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

export default CodeExamples;
