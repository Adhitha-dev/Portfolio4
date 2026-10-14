import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Mandate } from '../../types/connect';

interface Bay02Props {
  selectedMandateId: string;
  onSelectMandate: (id: string) => void;
}

const MANDATES: Mandate[] = [
  {
    id: 'architecture',
    code: '01 // CORE INFRA',
    label: '01 // CORE INFRA',
    title: 'Principal Systems Architecture',
    description: 'Distributed consensus & kernel designs',
  },
  {
    id: 'security',
    code: '02 // VERIFICATION',
    label: '02 // VERIFICATION',
    title: 'Offensive Security & Audit',
    description: 'Zero-day isolation & formal review',
  },
  {
    id: 'webgpu',
    code: '03 // GRAPHICS & SIM',
    label: '03 // GRAPHICS & SIM',
    title: 'WebGPU & Realtime Compute',
    description: 'Sub-millisecond shader pipelines',
  },
  {
    id: 'retainer',
    code: '04 // ADVISORY',
    label: '04 // ADVISORY',
    title: 'Quarterly Executive Retainer',
    description: 'Strategic board & principal sounding',
  },
];

export const Bay02MandateMatrix: React.FC<Bay02Props> = ({
  selectedMandateId,
  onSelectMandate,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adithya@sentinel.infra');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="w-[86vw] xs:w-[84vw] sm:w-[540px] md:w-[600px] lg:w-[720px] xl:w-[760px] lg:min-w-[680px] max-w-full flex-shrink-0 snap-center bg-gradient-to-b from-[#131317] to-[#0d0d10] border border-white/10 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.25rem] p-3.5 sm:p-5 lg:p-7 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
      {/* Bay Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 lg:pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#18181f] border border-white/15 flex items-center justify-center shadow-inner flex-shrink-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-300" />
          </div>
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-200 block font-medium">
              BAY 02 // MANDATE MATRIX
            </span>
            <span className="font-mono text-[8.5px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">
              TACTILE CONTROL DECK
            </span>
          </div>
        </div>
        <span className="font-mono text-zinc-500 tracking-widest text-[8.5px] sm:text-[10px]">
          4 ACTIVE MATRICES
        </span>
      </div>

      {/* Engagement Profile Selector */}
      <div className="my-2 sm:my-3 lg:my-3.5 flex flex-col gap-2 sm:gap-2.5">
        <div className="flex items-center justify-between">
          <label className="font-mono text-zinc-400 tracking-widest uppercase text-[9px] sm:text-[10px]">
            SELECT ENGAGEMENT PROFILE
          </label>
          <span className="font-mono text-zinc-600 text-[9px] sm:text-[10px]">
            CAPSULE MULTI-PASS
          </span>
        </div>

        {/* 2x2 Grid of Tactile Mandate Capsules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3" id="tactile-matrix-grid">
          {MANDATES.map((mandate) => {
            const isSelected = selectedMandateId === mandate.id;
            return (
              <button
                key={mandate.id}
                type="button"
                onClick={() => onSelectMandate(mandate.id)}
                className={`mandate-capsule group relative p-2.5 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 active:translate-y-0.5 cursor-pointer ${
                  isSelected
                    ? 'border-white/25 bg-[#181820] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.3)] hover:border-white/30'
                    : 'border-white/[0.08] bg-[#101014] shadow-inner hover:bg-[#15151c] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                  <span
                    className={`font-mono tracking-widest text-[9px] sm:text-[10px] ${
                      isSelected ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    {mandate.code}
                  </span>
                  <span
                    className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all ${
                      isSelected
                        ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                        : 'bg-zinc-700'
                    }`}
                  />
                </div>
                <div
                  className={`font-sans text-[11px] sm:text-sm font-medium transition-colors ${
                    isSelected ? 'text-white' : 'text-zinc-300'
                  }`}
                >
                  {mandate.title}
                </div>
                <div
                  className={`text-[9.5px] sm:text-[11px] font-mono mt-0.5 sm:mt-1 transition-colors ${
                    isSelected ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
                >
                  {mandate.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recessed Verified Endpoints */}
      <div className="pt-3 sm:pt-4 border-t border-white/[0.08] flex flex-col gap-2 sm:gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-zinc-500 uppercase tracking-widest text-[9px] sm:text-[10px]">
            RECESSED VERIFIED ENDPOINTS
          </span>
          <span className="font-mono text-zinc-500 text-[9px] sm:text-[10px]">
            PGP: 0x98E4B07B
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs w-full">
          {/* Email */}
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#0b0b0e] border border-white/[0.08] flex items-center justify-between group hover:border-white/20 transition-all shadow-inner">
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-wider">
                ELECTRONIC MAIL
              </span>
              <span className="text-zinc-200 text-[10px] sm:text-[11px] truncate max-w-[140px] sm:max-w-[110px]">
                adithya@sentinel.infra
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
              title="Copy Address"
            >
              {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          {/* Signal */}
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#0b0b0e] border border-white/[0.08] flex items-center justify-between group hover:border-white/20 transition-all shadow-inner">
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-wider">
                SIGNAL PROTOCOL
              </span>
              <span className="text-zinc-200 text-[10px] sm:text-[11px] truncate">
                adithya.01_secure
              </span>
            </div>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500/80 flex-shrink-0" />
          </div>

          {/* Federated Matrix */}
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#0b0b0e] border border-white/[0.08] flex items-center justify-between group hover:border-white/20 transition-all shadow-inner">
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-wider">
                FEDERATED MATRIX
              </span>
              <span className="text-zinc-200 text-[10px] sm:text-[11px] truncate">
                @adithya:matrix
              </span>
            </div>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-600 flex-shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
};
