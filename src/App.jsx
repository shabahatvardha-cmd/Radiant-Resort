import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import RegalNavbar from './components/layout/RegalNavbar';
import BookingDrawer from './components/booking/BookingDrawer';
import SpatialScrollStage from './components/stage/SpatialScrollStage';

// Code-split secondary depth pages for optimal initial load performance
const RoomsSuitesPage = lazy(() => import('./pages/RoomsSuitesPage'));
const MalibuPage = lazy(() => import('./pages/MalibuPage'));
const DiningPage = lazy(() => import('./pages/DiningPage'));
const WellnessSpaPage = lazy(() => import('./pages/WellnessSpaPage'));
const BanquetPage = lazy(() => import('./pages/BanquetPage'));

function PageLoadingFallback() {
  return (
    <div className="w-full h-screen h-[100dvh] flex items-center justify-center bg-[#FAF6F0] text-forest-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#D6B878]/30 border-t-[#8C6D37] animate-spin" />
        <span className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
          The Radiant
        </span>
      </div>
    </div>
  );
}

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

  return (
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden bg-white text-charcoal font-sans selection:bg-gold selection:text-forest-950">
      {/* Universal Regal Navbar across all pages */}
      <RegalNavbar onOpenBooking={() => handleOpenBooking()} />

      {/* Primary Application Route Content */}
      <main className="w-full h-full overflow-hidden">
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<SpatialScrollStage onOpenBooking={handleOpenBooking} />} />
            <Route path="/rooms" element={<RoomsSuitesPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/malibu" element={<MalibuPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/dining" element={<DiningPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/wellness" element={<WellnessSpaPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/banquet" element={<BanquetPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/spa" element={<Navigate to="/wellness" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
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
