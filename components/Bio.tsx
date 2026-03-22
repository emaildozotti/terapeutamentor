import React from 'react';
import { Section } from './ui/Section';

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong className="font-bold text-navy-900">{children}</strong>
);

export const Bio: React.FC = () => {
  return (
    <Section className="bg-white border-t border-slate-100">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/3">
          <div className="relative">
             <div className="absolute inset-0 border-2 border-gold-700 transform translate-x-4 translate-y-4 rounded-sm"></div>
             <img 
               src="https://i.imgur.com/pkPLuqe.png" 
               alt="Mentor Matheus Zotti" 
               className="w-full h-auto rounded-sm relative z-10 shadow-lg grayscale hover:grayscale-0 transition-all duration-700"
             />
          </div>
        </div>
        
        <div className="w-full lg:w-2/3">
           <h2 className="font-serif text-3xl text-navy-900 mb-6">Sobre <span className="text-gold-700 italic">Matheus Zotti</span></h2>
           <div className="space-y-4 text-slate-600 leading-relaxed font-sans text-lg">
             <p>
               <Highlight>Matheus Zotti</Highlight> é <Highlight>Mentor de Terapeutas</Highlight> e Especialista em Posicionamento para Profissionais da Saúde/Bem-estar.
             </p>
             <p>
               Com vasta experiência no mercado, ele decodificou os padrões que diferenciam terapeutas que <Highlight>lutam para pagar as contas</Highlight> daquelas que têm <Highlight>lista de espera e cobram alto valor</Highlight>.
             </p>
             <p>
               Hoje, lidera um movimento que ensina terapeutas a tratarem seu <Highlight>consultório como uma empresa</Highlight>, unindo a técnica humanizada com <Highlight>estratégias de vendas</Highlight> e posicionamento ético.
             </p>
             <div className="p-6 bg-cream-50 border-l-4 border-gold-700 italic text-navy-900 font-serif mt-6">
               "O objetivo é simples: fazer você viver (muito bem) da sua missão."
             </div>
           </div>
        </div>
      </div>
    </Section>
  );
};