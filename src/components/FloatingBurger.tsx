import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import burgerSource from '../assets/images/burger_cutout_1787665406117.jpg';

interface FloatingBurgerProps {
  className?: string;
}

export const FloatingBurger: React.FC<FloatingBurgerProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = burgerSource;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.naturalWidth || 1024;
      canvas.height = img.naturalHeight || 1024;

      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Chroma-key out white and off-white background with a smooth feather
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Check brightness / whiteness
          const minChannel = Math.min(r, g, b);
          const maxChannel = Math.max(r, g, b);
          const isWhiteish = minChannel > 225 && (maxChannel - minChannel) < 25;

          if (isWhiteish) {
            // Smooth alpha falloff for clean anti-aliased edge
            const brightness = (r + g + b) / 3;
            if (brightness > 245) {
              data[i + 3] = 0; // Fully transparent
            } else {
              const alphaRatio = (245 - brightness) / 20;
              data[i + 3] = Math.max(0, Math.min(255, Math.round(alphaRatio * 255)));
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setIsLoaded(true);
      } catch {
        // Fallback to normal draw if CORS blocks getImageData
        ctx.drawImage(img, 0, 0);
        setIsLoaded(true);
      }
    };
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* Hidden fallback image for initial paint */}
      {!isLoaded && (
        <img
          src={burgerSource}
          alt="Gourmet burger"
          className="w-full h-auto object-contain mix-blend-multiply opacity-95"
        />
      )}

      {/* Canvas with true transparent cutout drawn directly on yellow background */}
      <canvas
        ref={canvasRef}
        className={`w-full h-auto object-contain max-h-[480px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)] transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0 absolute'
        }`}
      />
    </div>
  );
};
