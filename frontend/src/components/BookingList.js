import React, { useState, useEffect } from 'react';
import { getBookings, getWorkspaces, deleteBooking } from '../api';

const STATUS_LABELS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
};

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [workspaces, setWorkspaces] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookingsData, workspacesData] = await Promise.all([
        getBookings(),
        getWorkspaces()
      ]);
      
      setBookings(bookingsData);
      
      const workspaceMap = {};
      workspacesData.forEach(ws => {
        workspaceMap[ws.id] = ws;
      });
      setWorkspaces(workspaceMap);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await deleteBooking(id);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="card" style={{ marginTop: '30px', textAlign: 'center' }}>
          <p>No bookings yet</p>
        </div>
      ) : (
        <div style={{ marginTop: '30px' }}>
          {bookings.map(booking => {
            const workspace = workspaces[booking.workspace];
            return (
              <div key={booking.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3>Booking #{booking.id}</h3>
                    {workspace && (
                      <div style={{ marginTop: '10px' }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
                          {workspace.name}
                        </div>
                        <div style={{ color: '#6c757d', marginTop: '5px' }}>
                          📍 {workspace.location}
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop: '10px', color: '#6c757d' }}>
                      <div>
                        📅 {formatDateTime(booking.start_time)} → {formatDateTime(booking.end_time)}
                      </div>
                      <div style={{ marginTop: '5px', fontWeight: 'bold', color: '#007bff', fontSize: '18px' }}>
                        Total: ${booking.total_price || '0.00'}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <span className={`badge badge-${booking.status.toLowerCase()}`}>
                      {STATUS_LABELS[booking.status] || booking.status}
                    </span>
                    {booking.status === 'PENDING' && (
                      <button 
                        onClick={() => handleDelete(booking.id)}
                        className="btn btn-danger"
                        style={{ fontSize: '12px', padding: '5px 10px' }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingList;
