import { useMediaQuery } from '../hooks/useMediaQuery'

export function SunsetBackground() {
  const isPhone = useMediaQuery('(max-width: 640px)')
  const dustCount = isPhone ? 18 : 36

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="animate-sunset-sky absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_10%,#5b2146_0%,#2a1832_35%,#0a0711_78%,#05050a_100%)]" />
      <div
        className="animate-sunset-pan absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(115deg, rgba(251,191,36,0.05), rgba(244,63,94,0.055), rgba(168,85,247,0.035), rgba(56,189,248,0.03))',
          backgroundSize: '220% 220%',
        }}
      />

      <div className="animate-sunset-glow absolute -top-24 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.22)_0%,rgba(244,63,94,0.14)_35%,transparent_65%)] blur-3xl sm:h-[30rem] sm:w-[30rem]" />
      <div className="animate-sunset-glow absolute bottom-[-10rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,transparent_60%)] blur-3xl [animation-delay:-6s]" />

      <div className="absolute left-1/2 top-[-8rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_210deg,transparent,rgba(251,191,36,0.11),transparent,rgba(244,63,94,0.08),transparent)] blur-2xl opacity-80 animate-sunset-rotate" />

      <div className="animate-sunset-cloud absolute left-[-10%] top-[14%] h-36 w-72 rounded-full bg-gradient-to-r from-white/8 via-rose-100/6 to-white/0 blur-2xl sm:h-40 sm:w-80" />
      <div className="animate-sunset-cloud absolute right-[-12%] top-[28%] h-28 w-72 rounded-full bg-gradient-to-l from-white/7 via-fuchsia-100/5 to-white/0 blur-2xl [animation-delay:-7s]" />
      <div className="animate-sunset-cloud absolute left-[-15%] bottom-[18%] h-32 w-80 rounded-full bg-gradient-to-r from-white/6 via-amber-100/6 to-white/0 blur-2xl [animation-delay:-11s]" />

      <div className="absolute inset-0 opacity-[0.26]">
        {Array.from({ length: dustCount }).map((_, i) => (
          <span
            key={i}
            className="animate-sunset-dust absolute rounded-full bg-white/60"
            style={{
              left: `${(i * 19 + 7) % 100}%`,
              top: `${(i * 27 + 13) % 100}%`,
              width: i % 7 === 0 ? 2 : 1,
              height: i % 7 === 0 ? 2 : 1,
              opacity: 0.08 + (i % 5) * 0.08,
              filter: 'blur(0.2px)',
              animationDuration: `${6 + (i % 7) * 1.6}s`,
              animationDelay: `${(i % 8) * -0.6}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:3px_3px]" />
    </div>
  )
}

