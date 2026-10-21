import React, { useState } from 'react';
import { CalendarCheck, AlertTriangle, ArrowRight, Sparkles, Check } from 'lucide-react';
import { MONTHS_2027 } from '../data/mockData';

interface DateAvailabilityCheckerProps {
  onSelectMonth: (month: string) => void;
}

export const DateAvailabilityChecker: React.FC<DateAvailabilityCheckerProps> = ({ onSelectMonth }) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(10); // Default: Outubro 2027

  const currentMonthData = MONTHS_2027.find((m) => m.monthIndex === selectedMonthIndex) || MONTHS_2027[0];

  return (
    <section className="py-14 bg-[#14161b]/60 border-y border-[#262a34]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c5a059] mb-2">
            <CalendarCheck className="w-4 h-4" />
            <span>Termômetro de Agenda 2027</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#f4efe6]">
            Consulte a disponibilidade do seu mês em 2027
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-2">
            Não terceirizamos equipes musicais. Por isso, atendemos no máximo <strong>1 a 2 casamentos por sábado</strong> para manter nosso padrão de excelência acústica e sonorização.
          </p>
        </div>

        {/* Month selector chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {MONTHS_2027.map((item) => (
            <button
              key={item.month}
              onClick={() => setSelectedMonthIndex(item.monthIndex)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedMonthIndex === item.monthIndex
                  ? 'bg-[#c5a059] text-[#0c0d10] font-bold shadow-md shadow-[#c5a059]/20'
                  : 'bg-[#1c1f26] text-stone-300 hover:bg-[#262a34] border border-[#262a34]'
              }`}
            >
              {item.month.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Selected Month Status Card */}
        <div className="max-w-3xl mx-auto bg-[#0c0d10] border border-[#c5a059]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262a34]">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-400">Mês Selecionado</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f4efe6]">
                {currentMonthData.month}
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Temporada: <strong className="text-stone-300">{currentMonthData.season}</strong> · {currentMonthData.note}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                currentMonthData.demandStatus === 'Quase Esgotado'
                  ? 'bg-red-950/80 text-red-300 border border-red-800'
                  : 'bg-amber-950/80 text-amber-300 border border-amber-800'
              }`}>
                <AlertTriangle className="w-3.5 h-3.5" />
                {currentMonthData.demandStatus}
              </span>
              <span className="text-xs text-stone-400 mt-1.5">
                Restam apenas <strong className="text-[#e8ca82] font-bold">{currentMonthData.availableDates} datas</strong> com a condição Black Friday
              </span>
            </div>
          </div>

          {/* Progress Bar of Scarcity */}
          <div className="py-6 space-y-2">
            <div className="flex justify-between text-xs text-stone-400 font-medium">
              <span>Capacidade da Equipe Titular</span>
              <span className="text-[#c5a059] font-bold">{currentMonthData.percentageFilled}% Pré-Reservado / Bloqueado</span>
            </div>
            <div className="w-full bg-[#1c1f26] h-3 rounded-full overflow-hidden p-0.5 border border-[#262a34]">
              <div
                className="bg-gradient-to-r from-[#85652d] via-[#c5a059] to-[#dfb963] h-full rounded-full transition-all duration-500"
                style={{ width: `${currentMonthData.percentageFilled}%` }}
              />
            </div>
          </div>

          <div className="bg-[#14161b] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#262a34]">
            <div className="text-xs text-stone-300 space-y-1">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sonorização completa inclusa sem taxa extra de deslocamento local</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Congelamento do valor de 2026 para o seu casamento de 2027</span>
              </div>
            </div>

            <button
              onClick={() => onSelectMonth(currentMonthData.month)}
              className="w-full sm:w-auto shrink-0 bg-[#c5a059] hover:bg-[#dfb963] text-[#0c0d10] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Garantir Este Mês</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
