import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCapture } from './components/HeroCapture';
import { DateAvailabilityChecker } from './components/DateAvailabilityChecker';
import { StructureAndSound } from './components/StructureAndSound';
import { LaunchSteps } from './components/LaunchSteps';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { VipModal } from './components/VipModal';
import { LeadsManagerModal } from './components/LeadsManagerModal';
import { Footer } from './components/Footer';
import { MessageCircle, ArrowRight, Bell } from 'lucide-react';
import { Lead } from './types';

import { DEFAULT_GOOGLE_SHEETS_WEBHOOK } from './utils/googleSheets';

export const DEFAULT_WHATSAPP_GROUP = 'https://chat.whatsapp.com/L4bV0UTnSJZ75Qlh0BsDqr';

export function sanitizeWhatsAppUrl(url: string): string {
  if (!url) return DEFAULT_WHATSAPP_GROUP;
  // Remove tracking parameters like ?s=sw&p=i&mlu=4&ilr=4 that break WhatsApp Web
  const match = url.match(/https?:\/\/chat\.whatsapp\.com\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://chat.whatsapp.com/${match[1]}`;
  }
  return url.trim();
}

export default function App() {
  const formRef = useRef<HTMLDivElement | null>(null);

  // Stored leads
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem('vocal_music_leads');
      return saved ? JSON.parse(saved) : [
        {
          id: 'lead_demo_1',
          name: 'Juliana & Thiago',
          phone: '(11) 98765-4321',
          weddingDate: 'Outubro / 2027',
          city: 'São Paulo / SP',
          createdAt: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
          utmSource: 'Instagram Ads',
          utmCampaign: 'Black Friday 2027'
        },
        {
          id: 'lead_demo_2',
          name: 'Renata & Carlos',
          phone: '(11) 97123-9876',
          weddingDate: 'Maio / 2027',
          city: 'Campinas / SP',
          createdAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
          utmSource: 'Meta Ads Feed',
          utmCampaign: 'Black Friday 2027'
        }
      ];
    } catch {
      return [];
    }
  });

  const [whatsappGroupUrl, setWhatsappGroupUrl] = useState<string>(() => {
    const saved = localStorage.getItem('vocal_music_wa_group');
    return saved ? sanitizeWhatsAppUrl(saved) : DEFAULT_WHATSAPP_GROUP;
  });

  const [sheetsWebhookUrl, setSheetsWebhookUrl] = useState<string>(() => {
    return localStorage.getItem('vocal_music_sheets_webhook') || DEFAULT_GOOGLE_SHEETS_WEBHOOK;
  });

  const [modalLead, setModalLead] = useState<Lead | null>(null);
  const [isLeadsManagerOpen, setIsLeadsManagerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vocal_music_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('vocal_music_wa_group', whatsappGroupUrl);
  }, [whatsappGroupUrl]);

  useEffect(() => {
    localStorage.setItem('vocal_music_sheets_webhook', sheetsWebhookUrl);
  }, [sheetsWebhookUrl]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleLeadCaptured = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
    setModalLead(newLead);
  };

  const handleClearLeads = () => {
    setLeads([]);
    localStorage.removeItem('vocal_music_leads');
  };

  // Secret shortcut for traffic manager: Ctrl+Shift+G or ?admin=true
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('admin')) {
      setIsLeadsManagerOpen(true);
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'G' || e.key === 'g')) {
        e.preventDefault();
        setIsLeadsManagerOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f4efe6] flex flex-col font-sans selection:bg-[#c5a059] selection:text-[#0c0d10]">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#85652d] via-[#c5a059] to-[#85652d] text-[#0c0d10] py-2 px-4 text-center text-xs font-bold tracking-wide flex items-center justify-center gap-2">
        <Bell className="w-3.5 h-3.5 fill-current" />
        <span>
          BLACK FRIDAY 2027 · Abertura oficial dia 12 de Novembro às 20h no YouTube exclusivo para inscritos.
        </span>
      </div>

      {/* Main Header */}
      <Header onScrollToForm={scrollToForm} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Direct Capture Form & Google Sheets Dispatch */}
        <HeroCapture
          onLeadCaptured={handleLeadCaptured}
          formRef={formRef}
          sheetsWebhookUrl={sheetsWebhookUrl}
        />

        {/* Date Availability Simulator for 2027 */}
        <DateAvailabilityChecker onSelectMonth={scrollToForm} />

        {/* Complete Sound Infrastructure & Musicians Synergy */}
        <StructureAndSound />

        {/* How the Mini Launch Works (Steps) */}
        <LaunchSteps onScrollToForm={scrollToForm} />

        {/* Social Proof & Testimonials */}
        <Testimonials />

        {/* FAQs */}
        <FaqSection />

        {/* Bottom High-Impact Conversion Section */}
        <section className="py-20 bg-gradient-to-b from-[#14161b] to-[#0c0d10] border-t border-[#262a34] text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">
              Agenda 2027 · Vagas Restritas por Data
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f4efe6] max-w-2xl mx-auto leading-tight">
              Não deixe para depois a trilha sonora do dia mais inesquecível da sua vida
            </h2>

            <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
              Casamentos em 2027 já estão sendo planejados. Garanta os melhores músicos e toda a estrutura de som com a maior vantagem financeira do ano.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToForm}
                className="w-full sm:w-auto bg-gradient-to-r from-[#dfb963] via-[#c5a059] to-[#a9833f] hover:from-[#e8ca82] hover:to-[#c5a059] text-[#0c0d10] font-bold text-sm sm:text-base py-4 px-8 rounded-xl shadow-xl shadow-[#c5a059]/25 hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ENTRAR NO GRUPO VIP & ASSEGURAR CONDICÃO</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Live em 12 de Novembro às 20h · Acesso 100% online e gratuito
            </p>
          </div>
        </section>
      </main>

      {/* Footer with plenty of bottom padding for mobile sticky bar */}
      <Footer onSecretOpenLeadsManager={() => setIsLeadsManagerOpen(true)} />

      {/* Floating WhatsApp Action Button for Quick Access */}
      <div className="fixed bottom-6 right-6 z-30 hidden sm:block">
        <button
          onClick={scrollToForm}
          className="bg-[#25d366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl shadow-[#25d366]/40 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="Entrar no Grupo VIP do WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white text-[#25d366]" />
          <span className="text-xs font-bold pr-1 max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300">
            Grupo VIP WhatsApp 2027
          </span>
        </button>
      </div>

      {/* Mobile Sticky Bar for conversion */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#0c0d10]/95 backdrop-blur-md border-t border-[#262a34] p-3 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-[#c5a059]">Live 12/Nov às 20h</span>
          <span className="text-xs font-semibold text-white">Vagas Black Friday 2027</span>
        </div>
        <button
          onClick={scrollToForm}
          className="bg-[#c5a059] text-[#0c0d10] font-bold text-xs py-2.5 px-4 rounded-lg shrink-0 cursor-pointer shadow-md"
        >
          Entrar no Grupo VIP
        </button>
      </div>

      {/* Lead Conversion Success / WhatsApp Group Modal */}
      {modalLead && (
        <VipModal
          lead={modalLead}
          onClose={() => setModalLead(null)}
          whatsappGroupUrl={whatsappGroupUrl}
        />
      )}

      {/* Traffic Manager Leads Dashboard Modal */}
      {isLeadsManagerOpen && (
        <LeadsManagerModal
          leads={leads}
          onClearLeads={handleClearLeads}
          onClose={() => setIsLeadsManagerOpen(false)}
          whatsappGroupUrl={whatsappGroupUrl}
          onUpdateWhatsappGroupUrl={(url) => setWhatsappGroupUrl(url)}
          sheetsWebhookUrl={sheetsWebhookUrl}
          onUpdateSheetsWebhookUrl={(url) => setSheetsWebhookUrl(url)}
        />
      )}
    </div>
  );
}
