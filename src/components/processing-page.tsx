"use client"
import { toast } from "sonner"
import BackgroundShapes from "./background-shapes"
import { useEffect } from "react"
import confetti from 'canvas-confetti'

interface ProcessingPageProps {
  onNext: () => void
}

export default function ProcessingPage({ onNext }: ProcessingPageProps) {
  const fireConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    const fire = (particleRatio: number, opts: any) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    };

    // Realistic confetti effect
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fireConfetti();
      onNext();
      toast.success(
        "Tu solicitud ya está completa y en proceso de revisión. Pronto nos contactaremos contigo."
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center fade-in px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-white bg-opacity-50 z-0">
        <BackgroundShapes />
      </div>

      <div className="bg-primary text-white p-6 sm:p-8 md:p-10 rounded-3xl max-w-xl w-full mx-auto z-10 shadow-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            No Actualices la Pantalla
          </h2>
          <p className="text-sm sm:text-base md:text-lg">
            Estamos estudiando tu solicitud
            <br className="hidden sm:block" />
            y en un instante te daremos una respuesta
          </p>
        </div>

        <div className="flex justify-center space-x-2 sm:space-x-4 mt-8 sm:mt-12">
          {[0, 0.2, 0.4, 0.6, 0.8].map((delay, index) => (
            <div
              key={delay}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                index === 4 ? 'bg-accent' : 'bg-secondary'
              }`}
              style={{
                opacity: 0.3 + (index * 0.2),
                animation: 'pulse 1.5s infinite',
                animationDelay: `${delay}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
