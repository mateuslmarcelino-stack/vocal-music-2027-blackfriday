import React, { useState, useEffect } from 'react';
import { Calendar, Users, Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle2, Volume2 } from 'lucide-react';
import { Lead } from '../types';
import { sendLeadToGoogleSheets } from '../utils/googleSheets';

interface HeroCaptureProps {
  onLeadCaptured: (lead: Lead) => void;
  formRef: React.RefObject<HTMLDivElement | null>;
  sheetsWebhookUrl?: string;
}

export const HeroCapture: React.FC<HeroCaptureProps> = ({ onLeadCaptured, formRef, sheetsWebhookUrl }) => {
  // Target: November 12, 20:00 (Live Date)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [weddingMonth, setWeddingMonth] = useState('Outubro / 2027');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Countdown timer logic
  useEffect(() => {
    // Current year or next November 12 20:00
    const now = new Date();
    let liveDate = new Date(now.getFullYear(), 10, 12, 20, 0, 0); // Month is 0-indexed: 10 = Nov
    if (now.getTime() > liveDate.getTime()) {
      liveDate = new Date(now.getFullYear() + 1, 10, 12, 20, 0, 0);
    }

    const updateTimer = () => {
      const diff = liveDate.getTime() - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Phone mask helper
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else if (val.length > 0) {
      val = `(${val}`;
    }
    setPhone(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor, informe seu nome.');
      return;
    }
    const rawPhone = phone.replace(/\D/g, '');
    if (rawPhone.length < 10) {
      setErrorMsg('Informe um número de WhatsApp válido com DDD.');
      return;
    }

    setIsSubmitting(true);

    // Extract UTM parameters from current URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || 'Instagram Ads / Meta';
    const utmMedium = urlParams.get('utm_medium') || 'Stories / Feed';
    const utmCampaign = urlParams.get('utm_campaign') || 'Black Friday 2027';
    const utmContent = urlParams.get('utm_content') || 'Anuncio Live 12 Nov';

    const newLead: Lead = {
      id: 'lead_' + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      weddingDate: weddingMonth,
      city: city.trim() || 'Não informada',
      createdAt: new Date().toISOString(),
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent
    };

    // Dispatch to Google Sheets
    const targetUrl = sheetsWebhookUrl || (typeof window !== 'undefined' ? localStorage.getItem('vocal_music_sheets_webhook') : '') || '';
    if (targetUrl) {
      sendLeadToGoogleSheets(newLead, targetUrl).catch((err) => {
        console.warn('Falha no webhook Google Sheets:', err);
      });
    }

    // Fire Meta Pixel 'Lead' event for Meta Ads tracking
    try {
      import('../utils/pixel').then(({ trackMetaPixel }) => {
        trackMetaPixel('Lead', {
          content_name: 'Inscrição Live Black Friday 2027',
          wedding_month: weddingMonth,
          city: newLead.city
        });
      });
    } catch (e) {
      console.warn('Erro ao disparar pixel:', e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onLeadCaptured(newLead);
    }, 450);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-16">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#c5a059]/10 via-[#c5a059]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Scarcity Alert */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1f26] border border-[#c5a059]/30 text-xs sm:text-sm text-[#e8ca82] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
            <span className="font-semibold tracking-wide uppercase text-[11px] text-[#c5a059]">Black Friday</span>
            <span className="text-stone-500">|</span>
            <span className="text-stone-300">Datas de 2027 com condição especial</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Direct High-Impact Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#f4efe6] leading-[1.15]">
                Vai casar em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfb963] via-[#f4efe6] to-[#c5a059]">2027</span>?
                <br />
                A trilha sonora do seu grande dia com valor especial na condição de Black Friday.
              </h1>

              <p className="text-base sm:text-lg text-stone-300 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Músicos de orquestra ao vivo e <strong>toda a estrutura de som inclusa</strong>. 
                Participe da Live Exclusiva de Abertura da Agenda 2027 e receba acesso antecipado às vagas antes que esgotem.
              </p>
            </div>

            {/* Live Event Details Box */}
            <div className="bg-[#14161b]/90 border border-[#262a34] rounded-xl p-4 sm:p-5 shadow-lg backdrop-blur-sm max-w-lg mx-auto lg:mx-0">
              <div className="flex items-start gap-3 pb-3 border-b border-[#262a34]">
                <div className="p-2.5 rounded-lg bg-[#c5a059]/15 text-[#c5a059] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left space-y-0.5">
                  <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Data da Live Exclusiva</div>
                  <div className="text-sm sm:text-base font-bold text-[#f4efe6]">12 de Novembro às 20h00</div>
                  <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>100% Online & Gratuito</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Countdown */}
              <div className="pt-3">
                <div className="text-[11px] uppercase tracking-wider text-stone-400 mb-2 font-medium flex items-center justify-between">
                  <span>Abertura oficial em:</span>
                  <span className="text-[#c5a059] font-medium">Vagas no grupo limitadas</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-[#0c0d10] border border-[#262a34] rounded-lg py-2">
                    <span className="block text-xl sm:text-2xl font-bold text-[#f4efe6] font-mono">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-stone-400">Dias</span>
                  </div>
                  <div className="bg-[#0c0d10] border border-[#262a34] rounded-lg py-2">
                    <span className="block text-xl sm:text-2xl font-bold text-[#f4efe6] font-mono">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-stone-400">Horas</span>
                  </div>
                  <div className="bg-[#0c0d10] border border-[#262a34] rounded-lg py-2">
                    <span className="block text-xl sm:text-2xl font-bold text-[#f4efe6] font-mono">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-stone-400">Min</span>
                  </div>
                  <div className="bg-[#0c0d10] border border-[#262a34] rounded-lg py-2">
                    <span className="block text-xl sm:text-2xl font-bold text-[#c5a059] font-mono">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-[#c5a059]">Seg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Trust Checks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm sm:text-[15px] text-stone-200 pt-1">
              <div className="flex items-center gap-2.5 justify-start text-left">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Músicos + Estrutura de Som</span>
              </div>
              <div className="flex items-center gap-2.5 justify-start text-left">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Prioridade no Grupo VIP</span>
              </div>
              <div className="flex items-center gap-2.5 justify-start text-left">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Condições especiais para o grupo.</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Capture Form */}
          <div className="lg:col-span-5" ref={formRef}>
            <div className="bg-[#14161b] border-2 border-[#c5a059]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              {/* Badge */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#dfb963] to-[#c5a059] text-[#0c0d10] text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                Acesso ao Grupo VIP
              </div>

              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-[#f4efe6]">
                  Reserve sua vaga na Live
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Cadastre-se para receber o link da transmissão e entrar no Grupo VIP com condição exclusiva de Black Friday.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Nome da Noiva ou Noivo *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Maria Clara & Lucas"
                    className="w-full bg-[#0c0d10] border border-[#262a34] focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-lg px-3.5 py-2.5 text-sm text-[#f4efe6] placeholder-stone-600 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                    Seu WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-[#0c0d10] border border-[#262a34] focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-lg px-3.5 py-2.5 text-sm text-[#f4efe6] placeholder-stone-600 outline-none transition-all"
                    required
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Você será direcionado(a) imediatamente ao grupo VIP após o envio.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Previsão de 2027 *
                    </label>
                    <select
                      value={weddingMonth}
                      onChange={(e) => setWeddingMonth(e.target.value)}
                      className="w-full bg-[#0c0d10] border border-[#262a34] focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-lg px-3 py-2.5 text-sm text-[#f4efe6] outline-none transition-all cursor-pointer"
                    >
                      <option value="1º Trimestre (Jan-Mar / 2027)">1º Trim (Jan-Mar 2027)</option>
                      <option value="Abril / 2027">Abril / 2027</option>
                      <option value="Maio / 2027 (Mês Noivas)">Maio / 2027</option>
                      <option value="Junho a Julho / 2027">Junho-Julho / 2027</option>
                      <option value="Agosto / 2027">Agosto / 2027</option>
                      <option value="Setembro / 2027">Setembro / 2027</option>
                      <option value="Outubro / 2027">Outubro / 2027</option>
                      <option value="Novembro / 2027">Novembro / 2027</option>
                      <option value="Dezembro / 2027">Dezembro / 2027</option>
                      <option value="Data a definir em 2027">A definir em 2027</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                      Cidade / Região
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: São Paulo / SP"
                      className="w-full bg-[#0c0d10] border border-[#262a34] focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-lg px-3.5 py-2.5 text-sm text-[#f4efe6] placeholder-stone-600 outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-gradient-to-r from-[#dfb963] via-[#c5a059] to-[#a9833f] hover:from-[#e8ca82] hover:to-[#c5a059] text-[#0c0d10] font-bold text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-lg shadow-[#c5a059]/25 hover:shadow-[#c5a059]/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#0c0d10] border-t-transparent rounded-full animate-spin" />
                      Garantindo acesso...
                    </span>
                  ) : (
                    <>
                      <span>QUERO MINHA VAGA NO GRUPO VIP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-stone-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Grupo silencioso · Sem spam · Apenas comunicados oficiais</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
