import { motion } from 'framer-motion'

type GiftTokenProps = {
  id: string
  collected: boolean
  onCollect: (id: string) => void
  className?: string
  label?: string
}

export function GiftToken({ id, collected, onCollect, className, label }: GiftTokenProps) {
  if (collected) return null

  return (
    <motion.button
      type="button"
      onClick={() => onCollect(id)}
      aria-label={label ?? 'Спрятанный подарок'}
      className={`gift-token group pointer-events-auto inline-flex items-center justify-center ${className ?? ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="gift-token-ring" aria-hidden />
      <span className="gift-token-core" aria-hidden>
        🎁
      </span>
    </motion.button>
  )
}

