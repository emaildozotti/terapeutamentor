import React from 'react';
import { Button } from './ui/Button';

interface FooterProps {
  onSchedule: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSchedule }) => {
  return (
    <footer className="bg-cream-200 text-white py-20">
      <div className="container mx-auto px-6 text-center max-w-4xl" id="footer-cta">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
          Construa um consultório que te dê <span className="text-gold-500 italic">orgulho e lucro.</span>
        </h2>
        <p className="text-slate-300 text-xl mb-10 font-light">
          Chega de agenda vazia e insegurança financeira.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <Button 
            className="w-full md:w-auto text-lg px-12 py-5 shadow-gold-500/20"
            onClick={onSchedule}
          >
            AGENDAR MEU PLANO DE CRESCIMENTO
          </Button>
          <p className="text-sm text-slate-400 mt-2">
            Gratuito | No zoom | Ao Vivo
          </p>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-800 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Mentoria Terapeuta Premium. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};