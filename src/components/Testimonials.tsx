import React from 'react';
import { Star, Heart, Award, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-[#14161b]/80 border-t border-[#262a34]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#c5a059] mb-2">
            <Award className="w-4 h-4" />
            <span>Mais de 500 Sonhos Realizados</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4efe6]">
            A experiência contada por quem viveu
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-2">
            Veja o depoimento de casais que confiaram a trilha sonora e a sonorização do dia mais importante de suas vidas à Vocal Music.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0c0d10] border border-[#262a34] rounded-xl p-6 flex flex-col justify-between relative shadow-md"
            >
              <div>
                <div className="flex items-center gap-1 text-[#dfb963] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#262a34]">
                <div className="font-serif text-base font-bold text-[#f4efe6]">
                  {item.names}
                </div>
                <div className="text-xs text-stone-400 mt-0.5">
                  {item.venue}
                </div>
                <div className="text-[11px] text-[#c5a059] mt-2 font-medium">
                  {item.formation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
