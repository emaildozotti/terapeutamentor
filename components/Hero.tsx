import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

interface HeroProps {
  onSchedule: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSchedule }) => {
  // Content for the marquee repeated to ensure smoothness
  const marqueeText = "GRATUITO | NO ZOOM | AO VIVO | GRATUITO | NO ZOOM | AO VIVO | GRATUITO | NO ZOOM | AO VIVO | GRATUITO | NO ZOOM | AO VIVO |";

  return (
    <section className="relative w-full min-h-[90vh] bg-cream-50 flex items-center overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-700/5 -skew-x-12 hidden lg:block translate-x-1/4" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 py-8 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
          
          {/* Content Left */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 animate-fade-in-up text-center lg:text-left order-1 relative z-30">
            
            {/* Tag - Smaller and tighter */}
            <div className="inline-block px-3 py-1 bg-white/5 border border-gold-700/40 rounded-full mx-auto lg:mx-0 shadow-sm">
              <span className="text-[10px] md:text-xs font-semibold tracking-widest text-gold-700 uppercase whitespace-nowrap">
                Exclusivo para Terapeutas e Psicólogas
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15]">
              Terapeuta: Pare de sofrer com agenda instável e <span className="italic text-gold-700">clientes que pedem desconto.</span>
            </h1>
            
            {/* Sub-headline */}
            <p className="font-sans text-sm md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Em uma <strong>Sessão Estratégica Gratuita</strong>, receba o Plano de Ação de 90 dias para lotar sua agenda com clientes qualificados e atingir de <strong>R$15 mil a R$30 mil por mês</strong>, cobrando o valor que o seu trabalho realmente vale.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-4 pt-2">
              <Button 
                onClick={onSchedule}
                className="w-full md:w-auto shadow-xl shadow-gold-700/10"
              >
                Quero Agendar Meu Plano
              </Button>
              
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs md:text-sm text-slate-400 font-medium bg-white/5 backdrop-blur-sm p-2 rounded-lg lg:bg-transparent lg:p-0">
                <div className="flex gap-1 text-green-600">
                  <CheckCircle2 size={14} className="md:w-4 md:h-4" />
                </div>
                <p>Gratuito | No Zoom | Ao Vivo</p>
              </div>
            </div>
          </div>

          {/* Image Right with Integrated Marquee */}
          <div className="w-full lg:w-1/2 relative order-2 -mt-10 lg:mt-0">
            {/* On Desktop: removed shadow, background, rounded corners. Added blend-multiply for seamless BG integration */}
            <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl shadow-gold-900/5 bg-cream-100 lg:shadow-none lg:bg-transparent lg:rounded-none">
              <img 
                src="https://i.imgur.com/7L09i9o.jpeg" 
                alt="Terapeuta de sucesso confiante em seu consultório" 
                className="w-full h-auto object-cover relative z-10"
              />
              
              {/* Overlay Marquee Banner - Keeping it, but it will float over the blended image on desktop */}
              <div className="absolute bottom-0 left-0 right-0 z-30 bg-gold-700/95 backdrop-blur-[2px] py-3 border-t border-gold-600">
                <div className="flex whitespace-nowrap overflow-hidden">
                  {/* First Loop */}
                  <div className="animate-marquee flex gap-4 items-center">
                    <span className="text-white font-sans text-[10px] md:text-xs tracking-[0.25em] font-bold uppercase px-4">{marqueeText}</span>
                    <span className="text-white font-sans text-[10px] md:text-xs tracking-[0.25em] font-bold uppercase px-4">{marqueeText}</span>
                  </div>
                  {/* Second Loop (Duplicate for seamless animation) */}
                  <div className="animate-marquee flex gap-4 items-center" aria-hidden="true">
                    <span className="text-white font-sans text-[10px] md:text-xs tracking-[0.25em] font-bold uppercase px-4">{marqueeText}</span>
                    <span className="text-white font-sans text-[10px] md:text-xs tracking-[0.25em] font-bold uppercase px-4">{marqueeText}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};