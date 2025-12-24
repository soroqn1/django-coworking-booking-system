const API_BASE = 'http://localhost:8000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Network error' }));
    throw new Error(error.detail || 'Request failed');
  }
  return response.json();
};

export const getWorkspaces = () =>
  fetch(`${API_BASE}/workspaces/`).then(handleResponse);

export const getWorkspace = (id) =>
  fetch(`${API_BASE}/workspaces/${id}/`).then(handleResponse);

export const createWorkspace = (data) =>
  fetch(`${API_BASE}/workspaces/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const getBookings = () =>
  fetch(`${API_BASE}/bookings/`).then(handleResponse);

export const createBooking = (data) =>
  fetch(`${API_BASE}/bookings/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteBooking = (id) =>
  fetch(`${API_BASE}/bookings/${id}/`, {
    method: 'DELETE',
  });

export const getUsers = () =>
  fetch(`${API_BASE}/../admin/auth/user/?format=json`).catch(() => []);
