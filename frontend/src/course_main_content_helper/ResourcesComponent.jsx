import React, { useEffect, useState } from 'react';
import { getResourcesByTopicId } from '../services/ResourceService';

const ResourcesComponent = ({ topicId, token }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const fetchedResources = await getResourcesByTopicId(topicId, token);
        setResources(fetchedResources);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [topicId, token]);

  if (loading) {
    return <p>Loading resources...</p>;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-primaryText">Resources</h3>
      <ul className="list-disc pl-5">
        {resources.map((resource) => (
          <li key={resource.resource_id} className="flex items-center space-x-2">
            <span className="font-medium">{resource.resource_title}</span>
            <a
              href={resource.resource_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {resource.resource_type}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourcesComponent;
