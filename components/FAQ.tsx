import React, { useState } from 'react';
import { Section } from './ui/Section';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-serif text-lg ${isOpen ? 'text-gold-700' : 'text-navy-900'} font-medium transition-colors`}>
          {question}
        </span>
        <span className="text-slate-400 group-hover:text-gold-700 transition-colors">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  return (
    <Section className="bg-cream-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-navy-900 mb-12">
          Perguntas Frequentes
        </h2>
        
        <div className="space-y-2">
          <FAQItem 
            question="Ainda não tenho muitos pacientes, essa sessão serve para mim?"
            answer="Sim. A melhor hora para definir seu posicionamento de valor é agora. Você aprenderá como começar cobrando o valor justo e como conseguir os primeiros clientes pagantes, sem passar anos cobrando barato 'para ganhar experiência'."
          />
          <FAQItem 
            question="Eu atendo por convênio/preço social. Vocês ensinam a transição?"
            answer="Com certeza. Esse é um dos maiores gargalos. Vamos traçar um plano para você substituir gradativamente sua agenda de baixo valor por pacientes particulares, sem risco financeiro abrupto."
          />
          <FAQItem 
            question="Preciso ser especialista em marketing digital?"
            answer="Não. Você precisa ser boa terapeuta. O plano de ação foca em estratégias simples e diretas para atrair clientes, sem que você precise virar uma 'blogueira' ou passar o dia fazendo dancinhas."
          />
          <FAQItem 
            question="Tem algum custo?"
            answer="Não. A sessão estratégica é gratuita. Fazemos isso porque sabemos que, ao receber um plano de grande valor, muitas terapeutas decidem continuar com nossa mentoria paga para implementar o processo com nosso acompanhamento. Mas a escolha é 100% sua e você sai com o plano em mãos de qualquer forma."
          />
        </div>
      </div>
    </Section>
  );
};