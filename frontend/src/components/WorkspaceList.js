import React, { useState, useEffect } from 'react';
import { getWorkspaces } from '../api';
import WorkspaceCard from './WorkspaceCard';
import CreateWorkspace from './CreateWorkspace';

function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const loadWorkspaces = () => {
    setLoading(true);
    getWorkspaces()
      .then(data => {
        setWorkspaces(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const handleWorkspaceCreated = () => {
    setShowCreate(false);
    loadWorkspaces();
  };

  if (loading) return <div className="loading">Loading workspaces...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Available Workspaces</h1>
        <button 
          className="btn btn-success" 
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? 'Cancel' : '+ Create Workspace'}
        </button>
      </div>

      {showCreate && (
        <div style={{ marginBottom: '30px' }}>
          <CreateWorkspace onSuccess={handleWorkspaceCreated} />
        </div>
      )}

      <div className="grid grid-2">
        {workspaces && workspaces.length === 0 ? (
          <p>No workspaces available</p>
        ) : (
          workspaces?.map(workspace => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))
        )}
      </div>
    </div>
  );
}

export default WorkspaceList;