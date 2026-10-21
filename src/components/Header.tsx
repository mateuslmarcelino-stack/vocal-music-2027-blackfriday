import React from 'react';
import { Calendar, Music2, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onScrollToForm: () => void;
  onOpenLeadsManager?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToForm }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0d10]/90 backdrop-blur-md border-b border-[#262a34]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#dfb963] to-[#85652d] flex items-center justify-center shadow-lg shadow-[#c5a059]/10">
            <Music2 className="w-5 h-5 text-[#0c0d10]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#f4efe6]">
              VOCAL MUSIC
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#c5a059] font-medium -mt-1">
              Músicos & Sonorização para Casamentos
            </span>
          </div>
        </div>

        {/* Live event reminder + CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-stone-300 bg-[#14161b] px-3.5 py-1.5 rounded-full border border-[#262a34]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-[#c5a059]">LIVE BLACK FRIDAY:</span>
            <span>12/Nov às 20h</span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
              +500 Celebrações
            </span>
          </div>

          <button
            onClick={onScrollToForm}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold bg-[#c5a059] hover:bg-[#dfb963] text-[#0c0d10] px-4 sm:px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md shadow-[#c5a059]/20 hover:scale-[1.02] cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Garantir Vaga 2027</span>
          </button>
        </div>
      </div>
    </header>
  );
};
