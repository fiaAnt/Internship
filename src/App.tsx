import { useState } from 'react';
import { ApolloProvider, useQuery } from '@apollo/client/react';
import { client } from './index';
import { GET_PROJECTS } from './queries.ts';
import Board from './components/Board.tsx';
import type { GetProjectsQuery } from './generated/graphql.ts';

const AppContent = () => {
  const { data, loading, error } = useQuery<GetProjectsQuery>(GET_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  if (loading) return <p>Loading projects...</p>;
  if (error) {
    console.error('Error loading projects:', error);
    return <p>Error loading projects!</p>;
  }

  console.log('Projects data:', data);

  const projects = (data?.projects || []).filter(Boolean);

  return (
    <div>
      <div>
        <h1>Select Project:</h1>
        <select
          className="select-project"
          onChange={(e) => setSelectedProjectId(e.target.value)}
          value={selectedProjectId || ''}
        >
          <option value="" disabled>
            -- Choose project --
          </option>
          {projects.map((project) => {
            if (!project?.id || !project?.title) return null;

            return (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            );
          })}
        </select>
      </div>

      {selectedProjectId ? (
        <Board projectId={selectedProjectId} />
      ) : (
        <p>Please select a project to view tasks.</p>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  );
}
