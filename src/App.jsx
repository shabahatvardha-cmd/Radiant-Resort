import React, { useState } from 'react';
import RegalNavbar from './components/layout/RegalNavbar';
import BookingDrawer from './components/booking/BookingDrawer';
import SpatialScrollStage from './components/stage/SpatialScrollStage';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSuiteForBooking, setSelectedSuiteForBooking] = useState(null);

  const handleOpenBooking = (suite = null) => {
    setSelectedSuiteForBooking(suite);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedSuiteForBooking(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white text-charcoal font-sans selection:bg-gold selection:text-forest-950">
      {/* Regal Navbar with Centered Logo */}
      <RegalNavbar onOpenBooking={() => handleOpenBooking()} />

      {/* SPATIAL 3D STAGE (Zero Vertical Document Scroll - Elements arrive from back, left, right, diagonals) */}
      <main className="w-full h-full">
        <SpatialScrollStage onOpenBooking={handleOpenBooking} />
      </main>

      {/* Interactive VIP Reservation Drawer */}
      <BookingDrawer
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        preselectedSuite={selectedSuiteForBooking}
      />
    </div>
  );
}
