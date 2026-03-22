import React from 'react';
import { Section } from './ui/Section';
import { TrendingUp, Diamond, CalendarCheck, Award, Target } from 'lucide-react';

const BenefitItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-cream-200 p-8 rounded-sm shadow-lg shadow-black/20 border-t-2 border-gold-700 hover:-translate-y-1 transition-transform duration-300 group h-full">
    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gold-700 group-hover:bg-gold-700 group-hover:text-white transition-colors duration-300">
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <h3 className="font-serif text-xl text-white mb-3 font-semibold">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </div>
);

export const Benefits: React.FC = () => {
  return (
    // Override default py-16 with pt-6 on mobile to close the gap between Hero image and this text
    <Section className="bg-cream-100 pt-6 pb-16 md:pt-24 md:pb-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
          Você sairá desta reunião com um <span className="text-gold-700 italic">mapa claro</span> para:
        </h2>
        <div className="w-24 h-1 bg-gold-700 mx-auto rounded-full opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BenefitItem 
          icon={TrendingUp}
          title="Eliminar a Instabilidade"
          description="Viver com previsibilidade de faturamento, sem o medo de não saber quanto vai ganhar no próximo mês."
        />
        <BenefitItem 
          icon={Diamond}
          title="Atrair Clientes 'High Ticket'"
          description="Parar de atrair curiosos e começar a fechar com pacientes que pagam o seu valor sem pedir desconto."
        />
        <BenefitItem 
          icon={CalendarCheck}
          title="Lotar a Agenda (com qualidade)"
          description="Ter demanda constante sem precisar trabalhar 12 horas por dia ou depender de planos de saúde que pagam pouco."
        />
        <BenefitItem 
          icon={Award}
          title="Posicionamento de Autoridade"
          description="Deixar de ser vista como 'apenas mais uma terapeuta' e se tornar referência absoluta na sua área de atuação."
        />
        <BenefitItem 
          icon={Target}
          title="Escalar para R$ 15k - R$ 30k"
          description="Entender a matemática e a estrutura de ofertas necessária para atingir esse faturamento em até 90 dias."
        />
        
        {/* Summary Card */}
        <div className="bg-navy-900 p-8 rounded-sm shadow-2xl text-white flex flex-col justify-center items-center text-center border-t-2 border-gold-500 hover:-translate-y-1 transition-transform duration-300 h-full">
          <div className="bg-gold-700 px-4 py-2 mb-6 shadow-md">
            <p className="font-serif text-xl italic text-white">"O Método Validado"</p>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            Você vai sair com o passo a passo para aplicar o mesmo método que validou consultórios de alto faturamento em todo o país.
          </p>
        </div>
      </div>
    </Section>
  );
};