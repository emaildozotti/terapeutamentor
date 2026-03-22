import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Lock } from 'lucide-react';
import { Button } from './ui/Button';
import { trackPixelEvent, trackPixelCustomEvent, initPixel } from '../lib/pixel';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'qualification' | 'calendly' | 'manual_review';

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('qualification');

  // Listen for Calendly events
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      // Check if the message is from Calendly
      const isCalendlyEvent = e.data.event && e.data.event.startsWith('calendly.');
      const isCalendlyAction = e.data.action && e.data.action.startsWith('calendly.');

      if (isCalendlyEvent || isCalendlyAction) {
        const action = e.data.event || e.data.action;
        console.log(`[Calendly] Event received: ${action}`, e.data);

        if (action === 'calendly.event_scheduled') {
          // Advanced Matching: If Calendly provides user data in the payload
          const payload = e.data.payload || {};
          const invitee = payload.invitee || {};

          if (invitee.email) {
            initPixel({
              em: invitee.email.toLowerCase().trim()
            });
          }

          trackPixelEvent('Lead');
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  // Reset modal state when closed or opened
  useEffect(() => {
    if (isOpen) {
      setStep('qualification');
    }
  }, [isOpen]);

  // Load Calendly script when step is 'calendly'
  useEffect(() => {
    if (step === 'calendly') {
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup if needed
      };
    }
  }, [step]);

  if (!isOpen) return null;

  const handleQualification = (hasBudget: boolean) => {
    if (hasBudget) {
      trackPixelCustomEvent('Qualified_Sim');
      setStep('calendly');
    } else {
      trackPixelCustomEvent('Qualified_Nao');
      setStep('manual_review');
    }
  };

  // Dynamic max-width based on step (Calendly needs more space)
  const maxWidthClass = step === 'calendly' ? 'max-w-5xl h-[90vh]' : 'max-w-md';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative bg-cream-50 rounded-lg shadow-2xl w-full ${maxWidthClass} transition-all duration-500 overflow-hidden flex flex-col border border-gold-700/20`}>

        {/* Header / Close Button */}
        <div className="flex justify-end p-4 absolute top-0 right-0 z-20">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-gold-700 transition-colors bg-white/80 rounded-full p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* STEP 1: QUALIFICATION QUESTION */}
        {step === 'qualification' && (
          <div className="p-8 animate-fade-in-up h-full flex flex-col justify-center py-12 md:py-16">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-700">
                <span className="font-serif text-2xl font-bold">?</span>
              </div>
              <h3 className="font-serif text-2xl text-navy-900 mb-4 leading-tight">
                Uma pergunta rápida para direcionar seu atendimento:
              </h3>
              <p className="text-lg text-slate-700 font-medium">
                Você tem de <span className="text-navy-900 font-bold">R$50 a R$100</span> para investir por dia no crescimento do seu negócio?
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleQualification(true)}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-sm font-semibold tracking-wide uppercase transition-all transform hover:-translate-y-1 shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={20} /> Sim, eu tenho
              </button>

              <button
                onClick={() => handleQualification(false)}
                className="w-full py-4 bg-white border-2 border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700 rounded-sm font-semibold tracking-wide uppercase transition-all"
              >
                Não, ainda não tenho
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CALENDLY (QUALIFIED) */}
        {step === 'calendly' && (
          <div className="w-full h-full bg-white flex flex-col animate-fade-in-up">
            <div className="p-4 bg-cream-100 border-b border-gold-700/10 text-center">
              <h3 className="font-serif text-xl text-navy-900">
                Parabéns! Selecione seu horário abaixo:
              </h3>
              <p className="text-xs text-slate-500">Agendamento oficial com Matheus Zotti</p>
            </div>
            <div className="flex-1 w-full relative overflow-hidden">
              <div
                className="calendly-inline-widget w-full h-full"
                data-url="https://calendly.com/maathzotti/30-min?hide_event_type_details=1&hide_gdpr_banner=1"
                style={{ minWidth: '320px', height: '100%' }}
              ></div>
            </div>
          </div>
        )}

        {/* STEP 3: DISQUALIFIED (NO BUDGET) */}
        {step === 'manual_review' && (
          <div className="p-8 animate-fade-in-up text-center py-12 md:py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
              <Lock size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-2xl text-navy-900 mb-4">
              Atenção: Vagas Restritas
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              No momento, estamos liberando a Sessão Estratégica Gratuita <strong>apenas para terapeutas que estão dispostas a investir</strong> no crescimento do próprio negócio.
              <br /><br />
              Como nosso método exige investimento em tráfego para gerar o faturamento de R$15k-30k, infelizmente não conseguiremos liberar um horário na agenda para você agora.
            </p>
            <Button onClick={onClose} variant="outline" className="min-w-[200px]">
              Voltar ao Site
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};