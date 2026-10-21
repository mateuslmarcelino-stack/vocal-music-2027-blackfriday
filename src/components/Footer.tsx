import React from 'react';
import { Music2, ExternalLink, ShieldCheck, Settings } from 'lucide-react';

interface FooterProps {
  onOpenLeadsManager: () => void;
  leadsCount: number;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLeadsManager, leadsCount }) => {
  return (
    <footer className="bg-[#08090b] border-t border-[#262a34] py-12 text-stone-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#262a34]/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#dfb963] to-[#85652d] flex items-center justify-center">
              <Music2 className="w-4 h-4 text-[#0c0d10]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#f4efe6] tracking-wider block">
                VOCAL MUSIC
              </span>
              <span className="text-[10px] uppercase text-[#c5a059] tracking-widest font-medium">
                Músicos & Sonorização para Casamentos
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href="https://vocalmusic.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5"
            >
              <span>Site Institucional (vocalmusic.com.br)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <span className="text-stone-600">·</span>

            <button
              onClick={onOpenLeadsManager}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14161b] hover:bg-[#1c1f26] text-stone-300 border border-[#262a34] transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Painel do Gestor de Tráfego ({leadsCount} leads)</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>
            © {new Date().getFullYear()} Vocal Music. Todos os direitos reservados. Campanha oficial de Mini Lançamento Black Friday Casamentos 2027.
          </p>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Página Segura · Seus dados estão protegidos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
