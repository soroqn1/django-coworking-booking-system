import React from 'react';
import { Link } from 'react-router-dom';

const WORKSPACE_TYPE_LABELS = {
  PRIVATE_OFFICE: 'Private Office',
  MEETING_ROOM: 'Meeting Room',
  HOT_DESK: 'Hot Desk',
};

const WorkspaceCard = ({ workspace }) => {
  return (
    <div className="card">
      <h3>{workspace.name}</h3>
      <p style={{ color: '#6c757d', fontSize: '14px', marginTop: '5px' }}>
        {WORKSPACE_TYPE_LABELS[workspace.workspace_type] || workspace.workspace_type}
      </p>
      <p style={{ marginTop: '10px' }}>{workspace.description}</p>
      <div style={{ marginTop: '15px', color: '#6c757d', fontSize: '14px' }}>
        <div>📍 {workspace.location}</div>
        <div style={{ marginTop: '5px' }}>👥 Capacity: {workspace.capacity}</div>
        <div style={{ marginTop: '5px', fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
          ₽{workspace.price_per_hour}/hour
        </div>
      </div>
      <Link to={`/book/${workspace.id}`}>
        <button className="btn btn-primary" style={{ marginTop: '15px', width: '100%' }}>
          Book Now
        </button>
      </Link>
    </div>
  );
};

export default WorkspaceCard;
