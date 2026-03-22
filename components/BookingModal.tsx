import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, CheckCircle2, Lock } from 'lucide-react';
import { Button } from './ui/Button';
import { trackPixelEvent, trackPixelCustomEvent } from '../lib/pixel';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'qualification' | 'booking' | 'manual_review';

// Separate component for Cal.com embed — mounts fresh each time
const CalEmbed: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Ensure Cal.com script is loaded
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

    // Use a unique namespace each mount to avoid stale references
    const ns = "booking-" + Date.now();
    Cal("init", ns, { origin: "https://app.cal.com" });

    Cal.ns[ns]("inline", {
      elementOrSelector: containerRef.current,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "matheus-zotti/50min",
    });

    Cal.ns[ns]("ui", { hideEventTypeDetails: true, layout: "month_view" });

    Cal.ns[ns]("on", {
      action: "bookingSuccessful",
      callback: () => {
        trackPixelEvent('Lead');
      },
    });

    // Cleanup: remove injected iframe on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
    />
  );
};

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('qualification');

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setStep('qualification');
    }
  }, [isOpen]);

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

      {/* QUALIFICATION / DISQUALIFIED modal */}
      {step !== 'booking' && (
        <div className="relative bg-cream-50 rounded-lg shadow-2xl w-full max-w-md transition-all duration-500 overflow-hidden border border-gold-700/20">
          <div className="absolute top-2 right-2 z-20">
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-gold-700 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm"
            >
              <X size={20} />
            </button>
          </div>

          {step === 'qualification' && (
            <div className="p-8 animate-fade-in-up flex flex-col justify-center py-12 md:py-16">
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
      )}

      {/* CAL.COM BOOKING — monta embed fresco a cada abertura */}
      {step === 'booking' && (
        <div className="relative w-full max-w-4xl max-h-[95vh] rounded-xl shadow-2xl overflow-auto animate-fade-in-up">
          <button
            onClick={onClose}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 text-slate-400 hover:text-white transition-colors bg-slate-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
          >
            <X size={22} />
          </button>

          <CalEmbed />
        </div>
      )}
    </div>
  );
};
