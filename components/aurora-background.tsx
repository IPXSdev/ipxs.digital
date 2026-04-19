'use client'

export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base light gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      
      {/* Aurora blobs with subtle neon colors for light mode */}
      <div className="aurora-blob absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[oklch(0.55_0.22_220/0.06)] blur-[100px]" />
      <div className="aurora-blob absolute -right-24 top-[10%] h-[400px] w-[400px] rounded-full bg-[oklch(0.50_0.24_285/0.05)] blur-[100px]" />
      <div className="aurora-blob absolute left-[20%] top-[45%] h-[350px] w-[350px] rounded-full bg-[oklch(0.55_0.26_340/0.04)] blur-[100px]" />
      <div className="aurora-blob absolute -bottom-32 right-[25%] h-[450px] w-[450px] rounded-full bg-[oklch(0.52_0.18_188/0.04)] blur-[100px]" />
      <div className="aurora-blob absolute bottom-[20%] -left-16 h-[300px] w-[300px] rounded-full bg-[oklch(0.50_0.24_285/0.03)] blur-[100px]" />

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .aurora-blob {
            animation: auroraFloat 28s ease-in-out infinite;
          }
          .aurora-blob:nth-child(2) { animation-delay: -4s; animation-duration: 32s; }
          .aurora-blob:nth-child(3) { animation-delay: -8s; animation-duration: 26s; }
          .aurora-blob:nth-child(4) { animation-delay: -12s; animation-duration: 30s; }
          .aurora-blob:nth-child(5) { animation-delay: -16s; animation-duration: 24s; }
          .aurora-blob:nth-child(6) { animation-delay: -20s; animation-duration: 34s; }
        }
        @keyframes auroraFloat {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1); 
            opacity: 1;
          }
          25% { 
            transform: translate3d(15px, -20px, 0) scale(1.05); 
            opacity: 0.9;
          }
          50% { 
            transform: translate3d(-10px, -30px, 0) scale(0.98); 
            opacity: 1;
          }
          75% { 
            transform: translate3d(-20px, -10px, 0) scale(1.02); 
            opacity: 0.95;
          }
        }
      `}</style>
    </div>
  )
}
