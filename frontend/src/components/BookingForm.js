import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkspace, createBooking } from '../api';

const BookingForm = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    user: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    getWorkspace(workspaceId)
      .then(setWorkspace)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [workspaceId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculatePrice = () => {
    if (!formData.start_time || !formData.end_time || !workspace) return 0;
    const start = new Date(formData.start_time);
    const end = new Date(formData.end_time);
    const hours = (end - start) / (1000 * 60 * 60);
    return hours * parseFloat(workspace.price_per_hour);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.user) {
      setError('Please enter your user ID');
      return;
    }

    setError(null);
    setSubmitting(true);

    const totalPrice = calculatePrice();

    const bookingData = {
      ...formData,
      user: parseInt(formData.user),
      workspace: parseInt(workspaceId),
      total_price: totalPrice,
    };

    try {
      await createBooking(bookingData);
      setSuccess(true);
      setTimeout(() => navigate('/bookings'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!workspace) return <div className="error">Workspace not found</div>;

  const totalPrice = calculatePrice();

  return (
    <div className="container">
      <h1>Book {workspace.name}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
        <div className="card">
          <h3>Workspace Details</h3>
          <p style={{ marginTop: '15px' }}>{workspace.description}</p>
          <div style={{ marginTop: '20px' }}>
            <div>📍 {workspace.location}</div>
            <div style={{ marginTop: '5px' }}>👥 Capacity: {workspace.capacity}</div>
            <div style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
              ${workspace.price_per_hour}/hour
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Booking Details</h3>
          {success && (
            <div className="success" style={{ marginBottom: '15px' }}>
              Booking created successfully! Redirecting...
            </div>
          )}
          {error && <div className="error" style={{ marginBottom: '15px' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your User ID</label>
              <input
                type="number"
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="Enter your user ID (e.g. 1)"
                required
              />
              <small style={{ color: '#6c757d' }}>Get your ID from admin or use 1</small>
            </div>

            <div className="form-group">
              <label>Start Time</label>
              <input
                type="datetime-local"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="datetime-local"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                required
              />
            </div>

            {totalPrice > 0 && (
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa', 
                borderRadius: '5px',
                marginBottom: '15px'
              }}>
                <strong>Total Price: ${totalPrice}</strong>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={submitting}
              style={{ width: '100%' }}
            >
              {submitting ? 'Creating Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
