import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import WorkspaceList from './components/WorkspaceList';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';

const App = () => {
  return (
    <BrowserRouter>
      <nav className="nav">
        <div className="nav-container">
          <h2 style={{ margin: 0 }}>Coworking Booking</h2>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Workspaces
          </NavLink>
          <NavLink to="/bookings" className={({ isActive }) => isActive ? 'active' : ''}>
            My Bookings
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<WorkspaceList />} />
        <Route path="/book/:workspaceId" element={<BookingForm />} />
        <Route path="/bookings" element={<BookingList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
