import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Copy, Check, ExternalLink, Calendar, X, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lead } from '../types';

interface VipModalProps {
  lead: Lead | null;
  onClose: () => void;
  whatsappGroupUrl: string;
}

export const VipModal: React.FC<VipModalProps> = ({ lead, onClose, whatsappGroupUrl }) => {
  const [copied, setCopied] = useState(false);

  if (!lead) return null;

  // Trigger celebration confetti
  React.useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c5a059', '#dfb963', '#25d366', '#ffffff']
    });
  }, []);

  // Clean URL to avoid query parameter issues on WhatsApp Web & mobile
  const cleanUrl = whatsappGroupUrl
    ? (whatsappGroupUrl.match(/https?:\/\/chat\.whatsapp\.com\/([a-zA-Z0-9_-]+)/)?.[0] || whatsappGroupUrl.trim())
    : 'https://chat.whatsapp.com/L4bV0UTnSJZ75Qlh0BsDqr';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(cleanUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#14161b] border-2 border-[#25d366]/40 rounded-2xl overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg bg-[#0c0d10]/60 hover:bg-[#262a34] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-center text-white">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-serif text-2xl font-bold">
            Quase lá, {lead.name.split(' ')[0]}!
          </h3>
          <p className="text-xs text-emerald-100 mt-1 max-w-sm mx-auto">
            Seus dados foram pré-registrados. Agora, dê o último passo entrando no Grupo VIP.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Registration summary badge */}
          <div className="bg-[#0c0d10] border border-[#262a34] rounded-xl p-3.5 text-xs text-stone-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#c5a059]" />
              <span>Casamento previsto: <strong>{lead.weddingDate}</strong></span>
            </div>
            <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              Vaga Reservada
            </span>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-xs sm:text-sm text-stone-200 font-medium">
              Clique no botão verde abaixo para entrar no grupo oficial no WhatsApp:
            </p>
          </div>

          {/* Primary Action Button */}
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              try {
                import('../utils/pixel').then(({ trackMetaCustomEvent }) => {
                  trackMetaCustomEvent('WhatsAppVIPClick', {
                    content_name: 'Entrada no Grupo VIP',
                    lead_name: lead.name,
                    wedding_date: lead.weddingDate
                  });
                });
              } catch (err) {
                console.warn(err);
              }
            }}
            className="w-full bg-[#25d366] hover:bg-[#20ba59] text-white font-extrabold text-base py-4 px-6 rounded-xl shadow-lg shadow-[#25d366]/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-white text-[#25d366]" />
            <span>ENTRAR NO GRUPO VIP AGORA</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Share with partner / Copy link */}
          <div className="pt-2 flex items-center justify-between gap-3 text-xs text-stone-400">
            <span className="truncate">Envie também para o noivo/noiva:</span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1f26] hover:bg-[#262a34] text-stone-200 border border-[#262a34] shrink-0 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>

          {/* Trust points */}
          <div className="p-3 bg-[#0c0d10]/60 rounded-lg border border-[#262a34]/60 space-y-1 text-[11px] text-stone-400">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Grupo 100% silencioso. Somente administradores enviam informações.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span>Link da live dia 12/Nov às 20h e condição especial liberados lá dentro.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
