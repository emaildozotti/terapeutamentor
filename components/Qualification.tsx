import React, { useEffect, useRef, useState } from 'react';
import { Section } from './ui/Section';
import { Wallet, Activity, Gem, Megaphone, TrendingUp } from 'lucide-react';

interface CheckItemProps {
  children: React.ReactNode;
  index: number;
  icon: React.ElementType;
}

const CheckItem: React.FC<CheckItemProps> = ({ children, index, icon: Icon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={ref}
      className={`
        flex flex-col items-center text-center gap-5 p-8 rounded-lg border transition-all duration-700 ease-out group
        bg-cream-200 shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-2 h-full justify-center
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        borderColor: 'rgba(180, 83, 9, 0.2)' // gold-700 with low opacity
      }}
    >
      <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-gold-700 group-hover:bg-gold-700 group-hover:text-white transition-colors duration-300 shadow-md mb-2">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
        {children}
      </p>
    </div>
  );
};

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong className="font-bold text-white">{children}</strong>
);

export const Qualification: React.FC = () => {
  return (
    <Section className="bg-cream-100">
      {/* Container with a slightly distinct background for separation */}
      <div className="bg-cream-50/50 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden border border-gold-700/15">
         
         {/* Decorative Background Elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-gold-700/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-700/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
         
         <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
              Para quem é esta sessão?
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Essa reunião <strong className="text-white">NÃO</strong> é uma sessão de terapia... é uma reunião de negócios para terapeutas que:
            </p>
          </div>

          {/* Row 1: 3 Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <CheckItem index={0} icon={Wallet}>
              Já atende, mas sente que está <Highlight>'pagando para trabalhar'</Highlight> ou cobrando <Highlight>muito abaixo do mercado</Highlight>.
            </CheckItem>
            
            <CheckItem index={1} icon={Activity}>
              Está cansada da <Highlight>instabilidade</Highlight>, onde em um mês ganha bem e no outro a <Highlight>agenda esvazia</Highlight>.
            </CheckItem>
            
            <CheckItem index={2} icon={Gem}>
              Quer <Highlight>sair dos convênios</Highlight> e migrar para <Highlight>atendimentos particulares de alto valor</Highlight>.
            </CheckItem>
          </div>

          {/* Row 2: 2 Items (Centered) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <CheckItem index={3} icon={Megaphone}>
              Sabe que é boa no que faz, gera transformação, mas <Highlight>não sabe se vender</Highlight> ou atrair as pessoas certas.
            </CheckItem>

            <CheckItem index={4} icon={TrendingUp}>
              Deseja faturar entre <Highlight>R$ 15 mil e R$ 30 mil mensais</Highlight> trabalhando com propósito, mas com <Highlight>segurança financeira</Highlight>.
            </CheckItem>
          </div>

         </div>
      </div>
    </Section>
  );
};