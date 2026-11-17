import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { playClickSound } from '../utils/audioEffects';
import { roomsData } from '../data/roomsData';
import CinematicRoomsFolio from '../components/showcase/CinematicRoomsFolio';

export default function RoomsSuitesPage({ onOpenBooking }) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#FAF5EE] text-forest-950 font-sans selection:bg-gold selection:text-forest-950">
      {/* Top-Left Back Arrow to Resort Overview (Clean Icon, Not Like a Button) */}
      <div className="absolute top-[66px] sm:top-[74px] left-3.5 sm:left-6 lg:left-10 z-40 pointer-events-auto">
        <Link
          to="/"
          onClick={() => playClickSound()}
          className="text-forest-950 hover:text-[#8C6D37] transition-colors p-1 -ml-1 inline-flex items-center cursor-pointer group bg-transparent border-none outline-none"
          aria-label="Back to resort overview"
        >
          <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:-translate-x-1.5 drop-shadow-sm" />
        </Link>
      </div>

      <CinematicRoomsFolio rooms={roomsData} onOpenBooking={onOpenBooking} />
    </div>
  );
}
