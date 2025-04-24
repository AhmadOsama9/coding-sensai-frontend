import React, { useState } from 'react';
import { fetchAllUsersProjects, markProjectAsReviewed } from '../services/AdminService';
import { useAuth } from "../hooks/UseAuth";
import Error from "../components/Error";

const AdminDashBoard = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [reviewNotes, setReviewNotes] = useState("");
    const [reviewStatus, setReviewStatus] = useState("");
    const [activeTab, setActiveTab] = useState(""); 
    const { token } = useAuth();
    const [error, setError] = useState(null);
    const [serverError, setServerError] = useState(null);

    // Fetch projects for the selected status
    const loadProjects = async (status) => {
        try {
            const data = await fetchAllUsersProjects(status, token);
            setProjects(data);
            setActiveTab(status);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            setServerError("Failed to fetch projects: ", error);
        }
    };

    const handleReviewSubmit = async () => {
        setError(null);
        if (!selectedProject || !reviewNotes || !reviewStatus) {
            setError("Please select a project, enter review notes and select a status.");
            return;
        }
        try {
            await markProjectAsReviewed(selectedProject.id, "succeeded", reviewNotes, token);
            setReviewNotes("");
            setSelectedProject(null);
            loadProjects(activeTab); // Reload the current tab
        } catch (error) {
            console.error("Failed to submit review:", error);
            setServerError("Failed to submit review: ", error);
        }
    };

    if (serverError) {
        return <Error message={serverError} />;
    }

    return (
      <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          
          <div className="flex space-x-4 mb-6">
              {["failed", "succeeded", "reviewing"].map((status) => (
                  <button
                      key={status}
                      onClick={() => loadProjects(status)}
                      className={`px-4 py-2 rounded ${activeTab === status ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
              ))}
          </div>
          
          {/* Projects List */}
          <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                  <thead>
                      <tr>
                          <th className="p-4">ID</th>
                          <th className="p-4">Username</th>
                          <th className="p-4">Course</th>
                          <th className="p-4">Project</th>
                          <th className="p-4">Repo URL</th>
                          <th className="p-4">Submission Notes</th>
                          <th className="p-4">Review Notes</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Submitted At</th>
                          <th className="p-4">Graded At</th>
                          <th className="p-4">Created At</th>
                          <th className="p-4">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {projects.map((project) => (
                          <tr key={project.id}>
                              <td className="p-4">{project.id}</td>
                              <td className="p-4">{project.username}</td>
                              <td className="p-4">{project.course_name}</td>
                              <td className="p-4">{project.project_name}</td>
                              <td className="p-4">
                                  <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                      Repo Link
                                  </a>
                              </td>
                              <td className="p-4">{project.submission_notes || 'N/A'}</td>
                              <td className="p-4">{project.review_notes || 'N/A'}</td>
                              <td className="p-4">{project.status}</td>
                              <td className="p-4">{project.submitted_at ? new Date(project.submitted_at).toLocaleDateString() : 'N/A'}</td>
                              <td className="p-4">{project.graded_at ? new Date(project.graded_at).toLocaleDateString() : 'N/A'}</td>
                              <td className="p-4">{project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}</td>
                              <td className="p-4">
                                  <button
                                      onClick={() => setSelectedProject(project)}
                                      className="text-blue-500"
                                  >
                                      Review
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

          {/* Review Modal */}
          {selectedProject && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                      <h2 className="text-xl font-semibold mb-4">Review Project</h2>
                      <p className="mb-2"><strong>Project:</strong> {selectedProject.project_name}</p>
                      <textarea
                          className="w-full p-2 border rounded"
                          placeholder="Enter review notes"
                          value={reviewNotes}
                          onChange={(e) => setReviewNotes(e.target.value)}
                      ></textarea>

                      <div className="mt-4">
                          <label className="block text-gray-700 font-semibold mb-2">Status:</label>
                          <select
                              value={reviewStatus}
                              onChange={(e) => setReviewStatus(e.target.value)}
                              className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          >
                              <option value="">Select Status</option>
                              <option value="succeeded">Succeeded</option>
                              <option value="failed">Failed</option>
                          </select>
                      </div>

                      <div className="flex justify-end space-x-2 mt-4">
                          <button
                              onClick={() => setSelectedProject(null)}
                              className="px-4 py-2 bg-gray-300 rounded"
                          >
                              Cancel
                          </button>
                          <button
                              onClick={handleReviewSubmit}
                              className="px-4 py-2 bg-blue-600 text-white rounded"
                          >
                              Submit Review
                          </button>
                      </div>

                      {error && (
                        <div className="mt-2 p-3 text-white bg-red-500 rounded-lg">
                            {error}
                        </div>
                    )}


                  </div>
              </div>
          )}
      </div>
  );
};

export default AdminDashBoard;
