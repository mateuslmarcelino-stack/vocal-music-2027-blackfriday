import React from 'react';
import { MessageSquare, Flame, Video, Lock, ArrowRight } from 'lucide-react';

interface LaunchStepsProps {
  onScrollToForm: () => void;
}

export const LaunchSteps: React.FC<LaunchStepsProps> = ({ onScrollToForm }) => {
  const steps = [
    {
      step: '01',
      title: 'Entrada no Grupo VIP',
      desc: 'Cadastre-se na página e entre no nosso Grupo VIP no WhatsApp. Um grupo silencioso, sem spam e 100% focado no seu grande dia.',
      icon: MessageSquare,
      badge: 'Imediato'
    },
    {
      step: '02',
      title: 'Aquecimento & Curadoria',
      desc: 'Você receberá áudios inéditos de ensaios, guia de como escolher a trilha sonora sem erros e dicas de formação instrumental.',
      icon: Flame,
      badge: 'Antes da Live'
    },
    {
      step: '03',
      title: 'A Live de 12 de Novembro (20h)',
      desc: 'Transmissão ao vivo e online onde revelaremos a condição exclusiva de Black Friday para as datas de 2027.',
      icon: Video,
      badge: '12/Nov às 20h'
    },
    {
      step: '04',
      title: 'Abertura Prioritária da Agenda',
      desc: 'Quem estiver no Grupo VIP terá prioridade para reservar a data do casamento em 2027 antes do público geral.',
      icon: Lock,
      badge: 'Prioridade Total'
    }
  ];

  return (
    <section className="py-16 bg-[#0c0d10] border-t border-[#262a34]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a059] block mb-2">
            Metodologia & Etapas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4efe6]">
            Como funciona a Abertura da Agenda 2027?
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-2">
            Um processo transparente e direto para você garantir os melhores músicos para o seu casamento com a melhor condição do ano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#14161b] border border-[#262a34] hover:border-[#c5a059]/40 rounded-xl p-6 relative flex flex-col justify-between transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-[#c5a059]/40 group-hover:text-[#c5a059] transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#1c1f26] text-stone-300 border border-[#262a34]">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-[#1c1f26] group-hover:bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#f4efe6] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#dfb963] text-[#0c0d10] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-[#c5a059]/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Quero entrar no Grupo VIP agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
