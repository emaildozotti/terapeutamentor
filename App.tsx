import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { Qualification } from './components/Qualification';
import { Bio } from './components/Bio';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

import { trackPixelEvent } from './lib/pixel';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    trackPixelEvent('Contact');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero onSchedule={openModal} />
        <Benefits />
        <HowItWorks onSchedule={openModal} />
        <Qualification />
        <Bio />
        <FAQ />
      </main>

      <Footer onSchedule={openModal} />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;