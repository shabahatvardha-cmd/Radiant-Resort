import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import RegalNavbar from './components/layout/RegalNavbar';
import BookingDrawer from './components/booking/BookingDrawer';
import SpatialScrollStage from './components/stage/SpatialScrollStage';
import RoomsSuitesPage from './pages/RoomsSuitesPage';
import MalibuPage from './pages/MalibuPage';
import DiningPage from './pages/DiningPage';
import WellnessSpaPage from './pages/WellnessSpaPage';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSuiteForBooking, setSelectedSuiteForBooking] = useState(null);
  const location = useLocation();

  const handleOpenBooking = (suite = null) => {
    setSelectedSuiteForBooking(suite);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedSuiteForBooking(null);
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className={`relative w-full ${isHomePage ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto'} bg-white text-charcoal font-sans selection:bg-gold selection:text-forest-950`}>
      {/* Regal Navbar: rendered on Home Page */}
      {isHomePage && <RegalNavbar onOpenBooking={() => handleOpenBooking()} />}

      {/* Primary Application Route Content */}
      <main className="w-full h-full">
        <Routes>
          <Route path="/" element={<SpatialScrollStage onOpenBooking={handleOpenBooking} />} />
          <Route path="/rooms" element={<RoomsSuitesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/malibu" element={<MalibuPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/dining" element={<DiningPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wellness" element={<WellnessSpaPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/spa" element={<Navigate to="/wellness" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Interactive VIP Reservation Drawer */}
      <BookingDrawer
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        preselectedSuite={selectedSuiteForBooking}
      />
    </div>
  );
}
