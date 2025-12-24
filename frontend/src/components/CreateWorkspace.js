import React, { useState } from 'react';
import { createWorkspace } from '../api';

const CreateWorkspace = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    workspace_type: 'PRIVATE_OFFICE',
    capacity: '',
    location: '',
    price_per_hour: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await createWorkspace(formData);
      setFormData({
        name: '',
        description: '',
        workspace_type: 'PRIVATE_OFFICE',
        capacity: '',
        location: '',
        price_per_hour: '',
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2>Create New Workspace</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select
            name="workspace_type"
            value={formData.workspace_type}
            onChange={handleChange}
          >
            <option value="PRIVATE_OFFICE">Private Office</option>
            <option value="MEETING_ROOM">Meeting Room</option>
            <option value="HOT_DESK">Hot Desk</option>
          </select>
        </div>

        <div className="form-group">
          <label>Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price per hour ($)</label>
          <input
            type="number"
            name="price_per_hour"
            value={formData.price_per_hour}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={submitting}
          style={{ width: '100%' }}
        >
          {submitting ? 'Creating...' : 'Create Workspace'}
        </button>
      </form>
    </div>
  );
};

export default CreateWorkspace;
