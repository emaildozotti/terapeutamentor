import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Lock } from 'lucide-react';
import { Button } from './ui/Button';
import { trackPixelEvent, trackPixelCustomEvent } from '../lib/pixel';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'qualification' | 'booking' | 'manual_review';

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('qualification');
  const calLoaded = useRef(false);

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setStep('qualification');
    }
  }, [isOpen]);

  // Load Cal.com embed script when step is 'booking'
  useEffect(() => {
    if (step === 'booking' && !calLoaded.current) {
      calLoaded.current = true;

      // Load Cal.com embed script
      (function (C: any, A: string, L: string) {
        let p = function (a: any, ar: any) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      const Cal = (window as any).Cal;
      Cal("init", "50min", { origin: "https://app.cal.com" });

      Cal.ns["50min"]("inline", {
        elementOrSelector: "#my-cal-inline-50min",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink: "matheus-zotti/50min",
      });

      Cal.ns["50min"]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand-color": "#0f172a",
          },
        },
      });

      // Listen for Cal.com booking confirmed event
      Cal.ns["50min"]("on", {
        action: "bookingSuccessful",
        callback: () => {
          trackPixelEvent('Lead');
        },
      });
    }
  }, [step]);

  if (!isOpen) return null;

  const handleQualification = (hasBudget: boolean) => {
    if (hasBudget) {
      trackPixelCustomEvent('Qualified_Sim');
      setStep('booking');
    } else {
      trackPixelCustomEvent('Qualified_Nao');
      setStep('manual_review');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative shadow-2xl w-full transition-all duration-500 overflow-hidden flex flex-col border border-gold-700/20 ${
        step === 'booking'
          ? 'max-w-4xl h-[95vh] sm:h-[90vh] rounded-xl bg-white'
          : 'max-w-md rounded-lg bg-cream-50'
      }`}>

        {/* Close Button */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-gold-700 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm"
          >
            <X size={20} />
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

        {/* STEP 2: CAL.COM BOOKING (QUALIFIED) */}
        {step === 'booking' && (
          <div className="w-full h-full flex flex-col animate-fade-in-up">
            <div
              id="my-cal-inline-50min"
              style={{ width: '100%', height: '100%', minHeight: '600px', overflow: 'auto' }}
            ></div>
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
