import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import juiceSource from '../assets/images/bridges_juice_splash_1787666131771.jpg';
import coffeeSource from '../assets/images/bridges_coffee_splash_1787666150386.jpg';
import { BridgesScriptLogo } from './icons/BridgesScriptLogo';

export const BrandedBeverageBackdrop: React.FC = () => {
  const juiceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const coffeeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isJuiceReady, setIsJuiceReady] = useState(false);
  const [isCoffeeReady, setIsCoffeeReady] = useState(false);

  // Chroma-key out pure white studio backgrounds for transparent integration
  useEffect(() => {
    // Process Juice Splash
    const juiceImg = new Image();
    juiceImg.crossOrigin = 'anonymous';
    juiceImg.src = juiceSource;
    juiceImg.onload = () => {
      const canvas = juiceCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = juiceImg.naturalWidth || 1024;
      canvas.height = juiceImg.naturalHeight || 1024;
      ctx.drawImage(juiceImg, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const minC = Math.min(r, g, b);
          const maxC = Math.max(r, g, b);
          if (minC > 228 && maxC - minC < 25) {
            const brightness = (r + g + b) / 3;
            if (brightness > 246) {
              data[i + 3] = 0;
            } else {
              const alpha = (246 - brightness) / 18;
              data[i + 3] = Math.max(0, Math.min(255, Math.round(alpha * 255)));
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setIsJuiceReady(true);
      } catch {
        ctx.drawImage(juiceImg, 0, 0);
        setIsJuiceReady(true);
      }
    };

    // Process Coffee Splash
    const coffeeImg = new Image();
    coffeeImg.crossOrigin = 'anonymous';
    coffeeImg.src = coffeeSource;
    coffeeImg.onload = () => {
      const canvas = coffeeCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = coffeeImg.naturalWidth || 1024;
      canvas.height = coffeeImg.naturalHeight || 1024;
      ctx.drawImage(coffeeImg, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const minC = Math.min(r, g, b);
          const maxC = Math.max(r, g, b);
          if (minC > 228 && maxC - minC < 25) {
            const brightness = (r + g + b) / 3;
            if (brightness > 246) {
              data[i + 3] = 0;
            } else {
              const alpha = (246 - brightness) / 18;
              data[i + 3] = Math.max(0, Math.min(255, Math.round(alpha * 255)));
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setIsCoffeeReady(true);
      } catch {
        ctx.drawImage(coffeeImg, 0, 0);
        setIsCoffeeReady(true);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. Left Side: Branded Tropical Banana/Mango Splash */}
      <div className="absolute -left-12 sm:-left-16 lg:-left-20 top-28 sm:top-24 w-60 sm:w-80 lg:w-[420px] max-w-none opacity-85 select-none transition-transform">
        <div className="relative">
          {/* Fallback image with mix-blend for immediate paint */}
          {!isJuiceReady && (
            <img
              src={juiceSource}
              alt="Bridges tropical juice splash"
              className="w-full h-auto object-contain mix-blend-multiply opacity-90 -rotate-12 scale-105"
            />
          )}

          {/* High-res transparent cutout */}
          <canvas
            ref={juiceCanvasRef}
            className={`w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(255,194,68,0.25)] -rotate-12 transition-opacity duration-300 ${
              isJuiceReady ? 'opacity-100' : 'opacity-0 absolute inset-0'
            }`}
          />

          {/* Branded Bridges Logo Badge placed directly over the cup */}
          <div className="absolute top-[48%] left-[28%] -translate-x-1/2 -translate-y-1/2 -rotate-12 bg-black/90 text-[#FFC244] px-2.5 py-1 rounded-xl shadow-lg border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <BridgesScriptLogo className="w-14 sm:w-18 h-auto" color="#FFC244" />
          </div>
        </div>
      </div>

      {/* 2. Right Side: Branded Iced Coffee / Latte Splash */}
      <div className="absolute -right-12 sm:-right-16 lg:-right-20 top-36 sm:top-32 w-64 sm:w-84 lg:w-[440px] max-w-none opacity-85 select-none transition-transform">
        <div className="relative">
          {/* Fallback image with mix-blend */}
          {!isCoffeeReady && (
            <img
              src={coffeeSource}
              alt="Bridges iced coffee cold brew splash"
              className="w-full h-auto object-contain mix-blend-multiply opacity-90 rotate-6 scale-105"
            />
          )}

          {/* High-res transparent cutout */}
          <canvas
            ref={coffeeCanvasRef}
            className={`w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] rotate-6 transition-opacity duration-300 ${
              isCoffeeReady ? 'opacity-100' : 'opacity-0 absolute inset-0'
            }`}
          />

          {/* Branded Bridges Logo Badge on the foreground iced cup */}
          <div className="absolute top-[52%] left-[45%] -translate-x-1/2 -translate-y-1/2 rotate-6 bg-black/90 text-[#FFC244] px-2.5 py-1 rounded-xl shadow-lg border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <BridgesScriptLogo className="w-14 sm:w-18 h-auto" color="#FFC244" />
          </div>
        </div>
      </div>
    </div>
  );
};
