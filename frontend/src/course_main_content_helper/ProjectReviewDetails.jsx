import React from 'react';
import ReactMarkdown from 'react-markdown';

const ProjectReviewDetails = ({ reviewData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="font-bold text-lg text-primaryText mb-4">Project Review</h4>
      <div className="mb-4">
        <label className="block text-primaryText font-semibold mb-1">Review Status</label>
        <p className={`p-2 rounded-md ${reviewData.status === 'approved' ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
          {reviewData.status === 'approved' ? 'Approved ✅' : 'Not Reviewed yet ❌'}
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-primaryText font-semibold mb-1">Review Notes</label>
        <div className="prose max-w-none text-primaryText">
          <ReactMarkdown>{reviewData.review_notes || 'No additional notes provided by the reviewer.'}</ReactMarkdown>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-primaryText font-semibold mb-1">Graded At</label>
        <p>{reviewData.graded_at ? new Date(reviewData.graded_at).toLocaleString() : 'Not graded yet'}</p>
      </div>
    </div>
  );
};

export default ProjectReviewDetails;
