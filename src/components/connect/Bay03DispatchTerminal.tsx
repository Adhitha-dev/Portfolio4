import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Bay03DispatchTerminal: React.FC = () => {
  const [sender, setSender] = useState('');
  const [email, setEmail] = useState('');
  const [payload, setPayload] = useState('');
  const [isPgpArmed, setIsPgpArmed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSender('');
      setEmail('');
      setPayload('');
    }, 3200);
  };

  const handleReset = () => {
    setSender('');
    setEmail('');
    setPayload('');
  };

  return (
    <section className="w-[86vw] xs:w-[84vw] sm:w-[540px] md:w-[600px] lg:w-[740px] xl:w-[780px] lg:min-w-[700px] max-w-full flex-shrink-0 snap-center bg-gradient-to-b from-[#131317] to-[#0d0d10] border border-white/10 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.25rem] p-3.5 sm:p-5 lg:p-7 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
      {/* Bay Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 lg:pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#18181f] border border-white/15 flex items-center justify-center shadow-inner flex-shrink-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-300" />
          </div>
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-200 block font-medium">
              BAY 03 // DISPATCH TERMINAL
            </span>
            <span className="font-mono text-[8.5px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">
              DIRECT PAYLOAD BUFFER
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500/70" />
          <span className="font-mono text-zinc-400 uppercase tracking-wider text-[8.5px] sm:text-[10px]">
            ECDSA READY
          </span>
        </div>
      </div>

      {/* Terminal Form */}
      <form
        onSubmit={handleSubmit}
        className="my-2 sm:my-3 lg:my-3.5 flex flex-col gap-2.5 sm:gap-3.5 lg:gap-4 flex-1 justify-between"
      >
        {/* Name and Email 2-column strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5">
          <div className="rounded-xl sm:rounded-2xl bg-[#0c0c10] border border-white/[0.08] p-2.5 sm:p-3 focus-within:border-white/30 transition-colors shadow-inner">
            <label
              htmlFor="terminal-sender"
              className="block font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5 sm:mb-1"
            >
              TRANSMITTING ENTITY // NAME
            </label>
            <input
              id="terminal-sender"
              type="text"
              required
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Dr. Elena Vance / CERN"
              className="w-full bg-transparent border-0 p-0 text-white font-sans text-[11px] sm:text-sm placeholder-zinc-600 focus:ring-0 focus:outline-none"
            />
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-[#0c0c10] border border-white/[0.08] p-2.5 sm:p-3 focus-within:border-white/30 transition-colors shadow-inner">
            <label
              htmlFor="terminal-email"
              className="block font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5 sm:mb-1"
            >
              RETURN VECTOR // EMAIL
            </label>
            <input
              id="terminal-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vance@cern.ch"
              className="w-full bg-transparent border-0 p-0 text-white font-mono text-[11px] sm:text-sm placeholder-zinc-600 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        {/* Payload Dossier Textarea */}
        <div className="rounded-xl sm:rounded-2xl bg-[#0c0c10] border border-white/[0.08] p-2.5 sm:p-3.5 focus-within:border-white/30 transition-colors shadow-inner flex flex-col flex-1 min-h-[100px] sm:min-h-[120px] lg:min-h-[140px]">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <label
              htmlFor="terminal-brief"
              className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500"
            >
              PAYLOAD DOSSIER &amp; ARCHITECTURAL SPECIFICATION
            </label>
            <span className="font-mono text-zinc-600 text-[8px] sm:text-[9px]">MAX 4096 BYTES</span>
          </div>
          <textarea
            id="terminal-brief"
            required
            rows={3}
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            placeholder="Specify mandate requirements, hardware boundary conditions, security criteria, or engagement timeline..."
            className="w-full bg-transparent border-0 p-0 text-zinc-200 font-mono text-[11px] sm:text-xs placeholder-zinc-600 focus:ring-0 focus:outline-none resize-none flex-1 leading-relaxed"
          />
        </div>

        {/* PGP Arming Toggle Chassis */}
        <div
          onClick={() => setIsPgpArmed(!isPgpArmed)}
          className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#101014] border border-white/[0.08] text-xs shadow-inner select-none cursor-pointer group hover:border-white/20 transition-all"
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded border flex items-center justify-center transition-all shadow-inner ${
                isPgpArmed
                  ? 'border-[#ff003c]/30 bg-[#181820]'
                  : 'border-white/10 bg-[#0b0b0e]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  isPgpArmed
                    ? 'bg-[#ff003c] shadow-[0_0_8px_#ff003c]'
                    : 'bg-zinc-700'
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-zinc-300 uppercase tracking-widest text-[9px] sm:text-[10px] font-medium">
                SIGN PAYLOAD WITH ADVISORY PGP KEY
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-zinc-500 tracking-wider">
                HARDWARE ENCLAVE SECURED
              </span>
            </div>
          </div>
          <span
            className={`font-mono text-[9px] sm:text-[10px] tracking-wider transition-colors ${
              isPgpArmed ? 'text-[#ff003c]' : 'text-zinc-500'
            }`}
          >
            {isPgpArmed ? 'ARMED // PGP 0x98E4B07B' : 'OFFLINE // 0x98E4B07B'}
          </span>
        </div>

        {/* Buttons */}
        <div className="pt-1 sm:pt-2 flex items-center justify-between gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 sm:px-5 py-2 sm:py-3 rounded-full text-zinc-400 hover:text-white bg-transparent hover:bg-white/[0.04] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest transition-colors cursor-pointer"
          >
            RESET BUFFER
          </button>

          <button
            type="submit"
            disabled={isSubmitted}
            className={`group px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 sm:gap-2.5 shadow-[0_4px_20px_rgba(255,255,255,0.15)] active:scale-[0.98] cursor-pointer ${
              isSubmitted
                ? 'bg-zinc-800 text-zinc-200'
                : 'bg-gradient-to-r from-zinc-200 to-white text-[#0a0a0c] hover:from-white hover:to-zinc-100'
            }`}
          >
            {isSubmitted ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>TRANSMISSION QUEUED</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c]" />
                <span>INITIATE DISPATCH</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Status Bar */}
      <div className="pt-2 sm:pt-3 lg:pt-4 border-t border-white/[0.08] flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-500">
        <span className="tracking-widest uppercase">TERMINAL BUFFER STATUS: 0 ERRORS</span>
        <span className="font-mono text-zinc-400">TELEMETRY SYNCED</span>
      </div>
    </section>
  );
};
