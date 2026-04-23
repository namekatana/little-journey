import { DecorativeCorners } from '../components/DecorativeCorners'

type EntranceScreenProps = {
  onEnter: () => void
}

export function EntranceScreen({ onEnter }: EntranceScreenProps) {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 py-14 sm:px-8">
      <div className="animate-card-emerge relative w-full max-w-lg px-2">
        <div className="card-glass relative overflow-hidden rounded-2xl px-8 py-12 md:px-12 md:py-14">
          <div className="pointer-events-none absolute inset-0 opacity-45 card-sheen-soft" aria-hidden />
          <DecorativeCorners className="absolute inset-0" />
          <div className="relative z-10">
            <div className="animate-ornament mb-8 flex items-center justify-center gap-3 md:mb-10">
              <span className="h-px w-10 bg-gradient-to-r from-transparent via-white/35 to-transparent sm:w-14" />
              <span className="font-display text-lg text-stone-100/80 md:text-xl">✦</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent via-white/35 to-transparent sm:w-14" />
            </div>

            <p className="font-display text-center text-[1.75rem] font-semibold leading-snug tracking-[0.01em] text-stone-100/95 md:text-4xl md:leading-snug">
              <span className="animate-line-1 block text-accent-gradient">Сегодня твой день.</span>
              <span className="animate-line-2 mt-4 block text-[1.35rem] font-normal italic leading-relaxed text-rose-100/90 md:mt-5 md:text-[1.55rem] md:leading-relaxed">
                Я сделал для тебя кое-что маленькое.
              </span>
            </p>
            <p className="font-ui mt-6 text-center text-sm text-stone-300/85">
              Alles Gute zum Geburtstag
            </p>

            <div className="mt-10 flex justify-center md:mt-12">
              <button
                type="button"
                onClick={onEnter}
                className="font-ui animate-btn-final btn-primary rounded-full px-11 py-3.5 text-[0.95rem] font-semibold tracking-[0.08em] text-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
