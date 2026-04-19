export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden aurora-mesh"
    >
      <div className="aurora-blob absolute -left-24 top-[-7rem] h-80 w-80 rounded-full bg-[oklch(0.72_0.16_220/0.18)] blur-3xl mix-blend-multiply" />
      <div className="aurora-blob absolute right-[-4rem] top-[8%] h-[22rem] w-[22rem] rounded-full bg-[oklch(0.63_0.18_285/0.15)] blur-3xl mix-blend-multiply" />
      <div className="aurora-blob absolute left-[28%] top-[48%] h-72 w-72 rounded-full bg-[oklch(0.67_0.2_332/0.12)] blur-3xl mix-blend-multiply" />
      <div className="aurora-blob absolute bottom-[-8rem] right-[20%] h-96 w-96 rounded-full bg-[oklch(0.72_0.16_220/0.1)] blur-3xl mix-blend-multiply" />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .aurora-blob {
            animation: auroraFloat 24s ease-in-out infinite;
          }
          .aurora-blob:nth-child(2) { animation-delay: -5s; }
          .aurora-blob:nth-child(3) { animation-delay: -10s; }
          .aurora-blob:nth-child(4) { animation-delay: -15s; }
          .aurora-blob:nth-child(5) { animation-delay: -19s; }
        }
        @keyframes auroraFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -12px, 0) scale(1.03); }
        }
      `}</style>
    </div>
  )
}
