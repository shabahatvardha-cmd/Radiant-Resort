import React from 'react';
import { roomsData } from '../data/roomsData';
import CinematicRoomsFolio from '../components/showcase/CinematicRoomsFolio';

export default function RoomsSuitesPage({ onOpenBooking }) {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#FAF5EE] text-forest-950 font-sans selection:bg-gold selection:text-forest-950">
      <CinematicRoomsFolio rooms={roomsData} onOpenBooking={onOpenBooking} />
    </div>
  );
}
