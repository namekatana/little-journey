import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import { MagnoliaFlower } from './MagnoliaFlower'
import { useMediaQuery } from '../hooks/useMediaQuery'

type FlowerMotion = CSSProperties & {
  '--dur'?: string
  '--dx'?: string
  '--dy'?: string
  '--rot'?: string
  '--shimmer'?: string
  '--sway-dur'?: string
}

const flowers: { className: string; style: FlowerMotion }[] = [
  {
    className: 'left-[4%] top-[8%] h-44 w-44 md:h-56 md:w-56',
    style: { '--dur': '11s', '--dx': '10px', '--dy': '-20px', '--rot': '6deg', '--shimmer': '4.5s', '--sway-dur': '5.5s' },
  },
  {
    className: 'right-[2%] top-[14%] h-40 w-40 md:h-52 md:w-52',
    style: { '--dur': '13s', '--dx': '-12px', '--dy': '-16px', '--rot': '-5deg', '--shimmer': '6s', '--sway-dur': '7s' },
  },
  {
    className: 'bottom-[18%] left-[8%] h-36 w-36 md:h-48 md:w-48',
    style: { '--dur': '14s', '--dx': '8px', '--dy': '12px', '--rot': '4deg', '--shimmer': '5.2s', '--sway-dur': '6s' },
  },
  {
    className: 'bottom-[10%] right-[6%] h-44 w-44 md:h-56 md:w-56',
    style: { '--dur': '12s', '--dx': '-9px', '--dy': '10px', '--rot': '-4deg', '--shimmer': '5.8s', '--sway-dur': '5s' },
  },
  {
    className: 'left-1/2 top-[4%] h-32 w-32 -translate-x-1/2 md:h-40 md:w-40',
    style: { '--dur': '15s', '--dx': '6px', '--dy': '-22px', '--rot': '3deg', '--shimmer': '7s', '--sway-dur': '8s' },
  },
  {
    className: 'bottom-[32%] right-[22%] h-28 w-28 opacity-70 md:h-36 md:w-36',
    style: { '--dur': '16s', '--dx': '-6px', '--dy': '-8px', '--rot': '-3deg', '--shimmer': '6.5s', '--sway-dur': '6.5s' },
  },
  {
    className: 'left-[18%] top-[38%] h-24 w-24 opacity-50 md:h-32 md:w-32',
    style: { '--dur': '17s', '--dx': '5px', '--dy': '-10px', '--rot': '5deg', '--shimmer': '8s', '--sway-dur': '7s' },
  },
  {
    className: 'right-[20%] top-[42%] h-20 w-20 opacity-45 md:h-28 md:w-28',
    style: { '--dur': '14s', '--dx': '-7px', '--dy': '8px', '--rot': '-6deg', '--shimmer': '5.5s', '--sway-dur': '5.5s' },
  },
  {
    className: 'left-[12%] bottom-[38%] h-22 w-22 opacity-55 md:h-28 md:w-28',
    style: { '--dur': '18s', '--dx': '9px', '--dy': '-6px', '--rot': '-4deg', '--shimmer': '6.2s', '--sway-dur': '6.8s' },
  },
  {
    className: 'right-[14%] bottom-[42%] h-26 w-26 opacity-50 md:h-32 md:w-32',
    style: { '--dur': '13s', '--dx': '-5px', '--dy': '11px', '--rot': '5deg', '--shimmer': '7.2s', '--sway-dur': '6s' },
  },
]

export function SceneBackground() {
  const isPhone = useMediaQuery('(max-width: 640px)')
  const starCount = isPhone ? 40 : 72
  const petalCount = isPhone ? 14 : 26
  const flowerList = isPhone ? flowers.slice(0, 6) : flowers

  const floatingPetals = useMemo(() => {
    return Array.from({ length: petalCount }, (_, i) => {
      const px = (i % 2 === 0 ? 1 : -1) * (12 + (i % 18))
      const py = -18 - (i % 22)
      return {
        left: `${(i * 41 + 7) % 96}%`,
        top: `${(i * 29 + 11) % 92}%`,
        w: 10 + (i % 6) * 5,
        h: 14 + (i % 4) * 4,
        rot: (i * 17) % 360,
        style: {
          '--px': `${px}px`,
          '--py': `${py}px`,
          '--pd-dur': `${11 + (i % 9)}s`,
          '--pd-delay': `${(i * 0.31) % 6}s`,
        } as CSSProperties,
      }
    })
  }, [petalCount])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="animate-sky-breathe absolute inset-0 bg-[radial-gradient(ellipse_120%_85%_at_50%_-15%,#353560_0%,#151525_48%,#06060c_100%)]" />
      <div className="animate-aurora absolute -left-1/4 -top-1/4 h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.14)_0%,transparent_62%)] opacity-80 blur-3xl" />
      <div className="animate-aurora absolute -bottom-1/4 -right-1/4 h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.12)_0%,transparent_58%)] opacity-90 blur-3xl [animation-delay:-8s]" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#2a1822]/95 via-[#120c18]/35 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_45%_at_50%_100%,rgba(251,113,133,0.14)_0%,transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />

      <div className="absolute right-[8%] top-[10%] h-24 w-24 rounded-full bg-gradient-to-br from-rose-100/25 to-transparent opacity-70 blur-2xl md:h-32 md:w-32" />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0">
        {Array.from({ length: starCount }).map((_, i) => (
          <span
            key={i}
            className="animate-star absolute rounded-full bg-white"
            style={{
              left: `${(i * 17 + 11) % 100}%`,
              top: `${(i * 31 + 5) % 100}%`,
              width: i % 7 === 0 ? 2 : 1,
              height: i % 7 === 0 ? 2 : 1,
              animationDuration: `${2.2 + (i % 6) * 0.75}s`,
              animationDelay: `${(i * 0.19) % 5.5}s`,
            }}
          />
        ))}
      </div>

      {floatingPetals.map((p, i) => (
        <div
          key={`petal-${i}`}
          className="absolute"
          style={{
            left: p.left,
            top: p.top,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <div
            className="animate-petal-drift rounded-full bg-gradient-to-br from-rose-200/35 via-pink-300/25 to-fuchsia-400/15 blur-[1px] shadow-[0_0_12px_rgba(251,182,206,0.35)]"
            style={{
              ...p.style,
              width: p.w,
              height: p.h,
            }}
          />
        </div>
      ))}

      {flowerList.map((f, i) => (
        <div key={i} className={`animate-magnolia-float absolute ${f.className}`} style={f.style}>
          <MagnoliaFlower className="animate-magnolia-sway h-full w-full drop-shadow-[0_0_28px_rgba(251,207,232,0.3)]" />
        </div>
      ))}
    </div>
  )
}
