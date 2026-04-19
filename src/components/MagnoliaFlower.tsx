import { useId } from 'react'

type MagnoliaFlowerProps = {
  className?: string
}

export function MagnoliaFlower({ className }: MagnoliaFlowerProps) {
  const raw = useId().replace(/:/g, '')
  const g = `mg-${raw}`

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${g}-petal`} x1="100" y1="20" x2="100" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fdf2f8" />
          <stop offset="0.45" stopColor="#fbcfe8" />
          <stop offset="1" stopColor="#f9a8d4" />
        </linearGradient>
        <linearGradient id={`${g}-petal-deep`} x1="60" y1="80" x2="140" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fce7f3" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <radialGradient id={`${g}-center`} cx="100" cy="100" r="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffe4e6" />
          <stop offset="1" stopColor="#fda4af" />
        </radialGradient>
      </defs>
      <g transform="translate(100 100)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <path
            key={deg}
            d="M0 -42 C18 -88 52 -95 68 -58 C78 -32 62 8 0 42 C-62 8 -78 -32 -68 -58 C-52 -95 -18 -88 0 -42Z"
            fill={i % 2 === 0 ? `url(#${g}-petal)` : `url(#${g}-petal-deep)`}
            opacity={0.88 - i * 0.04}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="22" fill={`url(#${g}-center)`} opacity={0.95} />
        <circle cx="0" cy="0" r="10" fill="#fb7185" opacity={0.35} />
      </g>
    </svg>
  )
}
