import React, { useState } from 'react';

const ProjectSubmissionForm = ({ courseId, projectId, onSubmitProject }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');

  const handleSubmit = () => {
    if (!repoUrl) {
      alert("Please enter a valid repository URL.");
      return;
    }
    onSubmitProject(courseId, projectId, repoUrl, submissionNotes);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="font-bold text-lg text-primaryText mb-4">Submit Project</h4>
      <div className="mb-2">
        <label className="block text-primaryText font-semibold mb-1">Repository URL</label>
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full border border-border p-2 rounded-md focus:outline-none focus:border-secondary"
          placeholder="https://github.com/username/repository"
        />
      </div>
      <div className="mb-4">
        <label className="block text-primaryText font-semibold mb-1">Submission Notes</label>
        <textarea
          value={submissionNotes}
          onChange={(e) => setSubmissionNotes(e.target.value)}
          className="w-full border border-border p-2 rounded-md focus:outline-none focus:border-secondary"
          placeholder="Add any notes or details you want the reviewer to consider."
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-primary text-white p-2 rounded-md hover:bg-hoverPrimary w-full transition-colors"
      >
        Submit Project
      </button>
    </div>
  );
};

export default ProjectSubmissionForm;
