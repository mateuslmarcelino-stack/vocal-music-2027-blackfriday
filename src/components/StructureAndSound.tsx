import React from 'react';
import { Sliders, Mic2, Speaker, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const StructureAndSound: React.FC = () => {
  return (
    <section className="py-16 bg-[#14161b] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c5a059]">
              <Speaker className="w-4 h-4" />
              <span>Diferencial Exclusivo Vocal Music</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4efe6] leading-tight">
              Músicos de Orquestra + Toda a Estrutura de Som Inclusa
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              O maior pesadelo dos noivos é contratar músicos incríveis, mas a sonorização do local chiar, dar microfonia ou não dar conta do ambiente. 
              Na Vocal Music, você <strong>não precisa contratar empresa de som à parte</strong>: nós levamos toda a aparelhagem técnica e operadores de áudio.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#262a34] space-y-2">
                <div className="flex items-center gap-2 text-[#c5a059] font-bold text-sm">
                  <Mic2 className="w-4 h-4" />
                  <span>Microfones Sem Fio Profissionais</span>
                </div>
                <p className="text-xs text-stone-400">
                  Microfones para o celebrante e para os votos dos noivos. Cada palavra de amor dita no altar será ouvida com nitidez cristalina por todos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#262a34] space-y-2">
                <div className="flex items-center gap-2 text-[#c5a059] font-bold text-sm">
                  <Sliders className="w-4 h-4" />
                  <span>Mesa Digital & Técnico Presente</span>
                </div>
                <p className="text-xs text-stone-400">
                  Equalização e mixagem ao vivo adaptada à acústica da igreja, salão fechado ou sítio/campo ao ar livre.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#262a34] space-y-2">
                <div className="flex items-center gap-2 text-[#c5a059] font-bold text-sm">
                  <Speaker className="w-4 h-4" />
                  <span>Caixas Acústicas Discretas</span>
                </div>
                <p className="text-xs text-stone-400">
                  Equipamentos elegantes e posicionamento milimétrico para não poluir o cenário visual das suas fotos e vídeos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0d10] border border-[#262a34] space-y-2">
                <div className="flex items-center gap-2 text-[#c5a059] font-bold text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Zero Estresse de Logística</span>
                </div>
                <p className="text-xs text-stone-400">
                  Chegamos horas antes para passagem de som e alinhamento acústico. No dia, você só se preocupa em viver seu sonho.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#1c1f26] to-[#0c0d10] border border-[#c5a059]/30 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#262a34]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#c5a059]">Pacote Casamento 2027</span>
                  <h4 className="font-serif text-xl font-bold text-[#f4efe6]">Experiência Completa</h4>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-400 block">Condição Especial</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
                    Black Friday
                  </span>
                </div>
              </div>

              <ul className="py-4 space-y-3 text-xs sm:text-sm text-stone-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Curadoria musical com escolha livre de repertório</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Arranjos instrumentais personalizados para as entradas</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Músicos profissionais de orquestra (piano, cordas, metais, vozes)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Sistema completo de som próprio para a cerimônia e cortejo</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Sonorização dos votos dos noivos e celebrante</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Técnico de áudio exclusivo durante toda a celebração</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-[#262a34] text-center">
                <p className="text-xs text-[#e8ca82] font-medium">
                  ★ Condição especial exclusiva de Black Friday liberada na Live para os membros do Grupo VIP.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
