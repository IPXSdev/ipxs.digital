export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden aurora-mesh"
    >
      <div className="aurora-blob absolute -left-24 top-[-8rem] h-72 w-72 rounded-full bg-[oklch(0.83_0.2_318/0.22)] blur-3xl" />
      <div className="aurora-blob absolute right-[-5rem] top-[10%] h-80 w-80 rounded-full bg-[oklch(0.84_0.17_220/0.18)] blur-3xl" />
      <div className="aurora-blob absolute bottom-[-8rem] left-[28%] h-96 w-96 rounded-full bg-[oklch(0.82_0.16_164/0.13)] blur-3xl" />
      <div className="aurora-blob absolute bottom-[20%] right-[22%] h-60 w-60 rounded-full bg-[oklch(0.78_0.16_286/0.15)] blur-3xl" />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .aurora-blob {
            animation: auroraFloat 18s ease-in-out infinite;
          }
          .aurora-blob:nth-child(2) { animation-delay: -6s; }
          .aurora-blob:nth-child(3) { animation-delay: -12s; }
          .aurora-blob:nth-child(4) { animation-delay: -3s; }
          .aurora-blob:nth-child(5) { animation-delay: -9s; }
        }
        @keyframes auroraFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -14px, 0) scale(1.04); }
        }
      `}</style>
    </div>
  )
}
