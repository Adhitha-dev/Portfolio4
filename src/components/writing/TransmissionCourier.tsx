import React, { useState } from 'react';

interface TransmissionCourierProps {
  onEngage?: (email: string) => void;
}

export const TransmissionCourier: React.FC<TransmissionCourierProps> = ({ onEngage }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [buttonText, setButtonText] = useState('ENGAGE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setButtonText('ENGAGING...');
    if (onEngage) {
      onEngage(email.trim());
    } else {
      setTimeout(() => {
        setIsSubscribed(true);
        setButtonText('ENGAGED');
        setTimeout(() => {
          setButtonText('ENGAGE');
        }, 4000);
      }, 450);
    }
  };

  return (
    <section className="relative z-10 w-full mb-16 sm:mb-20 p-5 sm:p-8 md:p-12 bg-[#1c1b1e]/70 rounded-2xl border border-white/[0.08] backdrop-blur-md shadow-2xl">
      <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201f22] font-mono text-[9px] sm:text-[10px] text-[#c6c6cf] tracking-widest uppercase border border-white/[0.06]">
          <span className="w-1 h-1 rounded-full bg-[#e5e1e4]" />
          TRANSMISSION COURIER // SUBSCRIBER BUS
        </div>

        <h2
          className="font-giant text-2xl sm:text-3xl md:text-4xl text-[#e5e1e4] uppercase tracking-tight font-normal leading-snug sm:leading-normal mb-3 sm:mb-4"
          style={{ lineHeight: '1.28' }}
        >
          SUBSCRIBE TO CELESTIAL DISPATCHES
        </h2>

        <p className="font-sans text-xs sm:text-sm text-[#c6c6cf] font-light leading-relaxed max-w-lg mx-auto">
          Receive uncompressed cryptographic papers, system architecture proofs, and GPU shaders directly to your transmission terminal inbox. Zero marketing bloat.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 max-w-md mx-auto pt-2 sm:pt-4 w-full"
          id="stream-form"
        >
          <div className="relative w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="$ engineer@stellar.io"
              required
              className="w-full bg-[#0e0e10] text-[#e5e1e4] placeholder:text-[#c6c6cf]/40 font-mono text-xs sm:text-sm px-4 py-3 border border-white/15 focus:outline-none focus:border-white transition-colors rounded-full"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-[#353437] hover:bg-[#e5e1e4] text-[#e5e1e4] hover:text-[#040406] font-mono text-[10px] sm:text-[11px] tracking-widest uppercase transition-all duration-200 shrink-0 cursor-pointer rounded-full active:scale-95 font-medium border border-white/10"
          >
            {buttonText}
          </button>
        </form>

        {/* Realtime Attestation Success State */}
        {isSubscribed && (
          <div
            className="text-center pt-2 font-mono text-[9.5px] sm:text-[10px] text-[#c6c6cf] tracking-widest uppercase transition-opacity duration-300 animate-fadeIn"
            id="stream-attest"
          >
            <span className="text-[#e5e1e4] font-semibold">✓ STREAM LINKED</span> // PGP VERIFIED · DISPATCH PACKETS ROUTED
          </div>
        )}
      </div>
    </section>
  );
};
