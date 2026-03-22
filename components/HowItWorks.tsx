import React, { useEffect, useRef, useState } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';

interface HowItWorksProps {
  onSchedule: () => void;
}

const Step = ({ number, title, description, isLast }: { number: string, title: string, description: React.ReactNode, isLast?: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Dispara quando 30% do elemento está visível na tela
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.3,
        // rootMargin ajuda a disparar a animação um pouco antes do centro da tela para ficar fluido
        rootMargin: "0px 0px -10% 0px" 
      }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  return (
    <div ref={stepRef} className="flex gap-6 relative">
      {/* Vertical Line Connector (Mobile Only) */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-[2px] -ml-[1px] md:hidden">
          {/* Background Track (Faint line) */}
          <div className="absolute inset-0 bg-gold-700/10 h-full w-full"></div>
          
          {/* Animated Fill (Solid Gold line) - Grows as user scrolls/reads this step */}
          <div 
            className="absolute top-0 left-0 w-full bg-gold-700 transition-all ease-out"
            style={{ 
              height: isVisible ? '100%' : '0%',
              // 1.5s duration ensures the line draws while the user is likely reading the title/text
              transitionDuration: '1500ms', 
              transitionDelay: '300ms' // Slight delay so the number pops first, then line draws
            }}
          ></div>
        </div>
      )}
      
      {/* Number Bubble */}
      <div className="flex-shrink-0 z-10">
        <div 
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-cream-50 transition-all duration-700 ease-out`}
          style={{
             transform: isVisible ? 'scale(1)' : 'scale(0.5)',
             opacity: isVisible ? 1 : 0,
             borderColor: isVisible ? '#B45309' : '#334155', // gold-700 : slate-700
          }}
        >
          <span 
            className={`font-serif text-xl font-bold transition-colors duration-500`}
            style={{ color: isVisible ? '#B45309' : '#94a3b8' }}
          >
            {number}
          </span>
        </div>
      </div>
      
      {/* Text Content */}
      <div 
        className={`pb-12 md:pb-0 md:pr-8 transition-all duration-1000 ease-out`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
          transitionDelay: '200ms' // Text appears slightly after the bubble
        }}
      >
        <h3 className="font-serif text-xl text-white mb-2 font-semibold">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export const HowItWorks: React.FC<HowItWorksProps> = ({ onSchedule }) => {
  return (
    <Section className="bg-cream-100">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Left Header */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-24">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Como funciona esta <span className="block text-gold-700 italic">Sessão Estratégica?</span>
            </h2>
            <p className="text-slate-400 mb-8">
              Um processo estruturado para diagnosticar e resolver os gargalos do seu consultório.
            </p>
            <Button className="hidden md:inline-flex" onClick={onSchedule}>
              Quero meu plano personalizado
            </Button>
            <p className="text-xs text-gold-700 mt-2 font-medium hidden md:block">Vagas limitadas para garantir a qualidade.</p>
          </div>
        </div>

        {/* Right Steps */}
        <div className="w-full md:w-2/3 space-y-0 md:space-y-12">
          <div className="md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-16">
            <Step 
              number="1" 
              title="Agendamento e Filtro"
              description="Após preencher sua aplicação, minha equipe especialista analisará seu perfil. Entraremos em contato para confirmar o horário se entendermos que você está pronta para este nível de crescimento."
            />
            <Step 
              number="2" 
              title="Diagnóstico do seu Consultório"
              description="Vamos analisar seu momento atual: seu preço, seu público, como você capta clientes hoje e, principalmente, por que sua agenda ainda não está cheia ou rentável."
            />
            <Step 
              number="3" 
              title="Mapeamento de Gargalos"
              description="Identificaremos exatamente o que impede você de cobrar mais caro: é insegurança técnica? Falha de posicionamento? Ou falta de estratégia de vendas?"
            />
            <Step 
              number="4" 
              title="O Plano de Ação Perfeito"
              isLast
              description={
                <span className="block space-y-2">
                  <span>Montaremos juntas um plano personalizado para os próximos 90 dias, focado em:</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300">
                    <li>Como se posicionar para cobrar 2x ou 3x mais.</li>
                    <li>Criar pacotes que geram previsibilidade.</li>
                    <li>Atrair pacientes particulares semanalmente.</li>
                  </ul>
                </span>
              }
            />
          </div>
          
          <div className="mt-8 md:hidden">
             <Button fullWidth onClick={onSchedule}>
              Quero meu plano personalizado
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};
