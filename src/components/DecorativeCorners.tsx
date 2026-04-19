type CornerProps = {
  className?: string
}

export function DecorativeCorners({ className }: CornerProps) {
  return (
    <div className={`pointer-events-none relative text-rose-200/45 ${className ?? ''}`} aria-hidden>
      <svg
        className="animate-corner-pulse absolute -left-1 -top-1 h-14 w-14 md:h-16 md:w-16"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M4 52V20c0-8.8 7.2-16 16-16h32"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M12 44c0-6.6 5.4-12 12-12h8"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.6"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="animate-corner-pulse absolute -right-1 -top-1 h-14 w-14 scale-x-[-1] md:h-16 md:w-16"
        viewBox="0 0 64 64"
        fill="none"
        style={{ animationDelay: '0.4s' }}
      >
        <path
          d="M4 52V20c0-8.8 7.2-16 16-16h32"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M12 44c0-6.6 5.4-12 12-12h8"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.6"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="animate-corner-pulse absolute -bottom-1 -left-1 h-14 w-14 scale-y-[-1] md:h-16 md:w-16"
        viewBox="0 0 64 64"
        fill="none"
        style={{ animationDelay: '0.8s' }}
      >
        <path
          d="M4 52V20c0-8.8 7.2-16 16-16h32"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M12 44c0-6.6 5.4-12 12-12h8"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.6"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="animate-corner-pulse absolute -bottom-1 -right-1 h-14 w-14 scale-[-1] md:h-16 md:w-16"
        viewBox="0 0 64 64"
        fill="none"
        style={{ animationDelay: '1.2s' }}
      >
        <path
          d="M4 52V20c0-8.8 7.2-16 16-16h32"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M12 44c0-6.6 5.4-12 12-12h8"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
