import { DecorativeCorners } from '../components/DecorativeCorners'

type EntranceScreenProps = {
  onEnter: () => void
}

export function EntranceScreen({ onEnter }: EntranceScreenProps) {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 py-14 sm:px-8">
      <div className="animate-card-emerge relative w-full max-w-lg px-2">
        <div className="relative overflow-hidden rounded-2xl border border-white/14 bg-[color:var(--card-bg)] px-8 py-12 shadow-[var(--card-shadow)] backdrop-blur-xl md:px-12 md:py-14">
          <div className="pointer-events-none absolute inset-0 opacity-60 animate-card-sheen" aria-hidden />
          <DecorativeCorners className="absolute inset-0" />
          <div className="relative z-10">
            <div className="animate-ornament mb-8 flex items-center justify-center gap-3 md:mb-10">
              <span className="h-px w-10 bg-gradient-to-r from-transparent via-white/35 to-transparent sm:w-14" />
              <span className="font-display text-lg text-stone-100/80 md:text-xl">✦</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent via-white/35 to-transparent sm:w-14" />
            </div>

            <p className="font-display text-center text-[1.65rem] font-medium leading-snug tracking-[0.01em] text-stone-100/95 md:text-3xl md:leading-snug">
              <span className="animate-line-1 block">Сегодня твой день.</span>
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
                className="font-ui animate-btn-final rounded-full border border-white/16 bg-white/5 px-11 py-3.5 text-[0.95rem] font-semibold tracking-[0.06em] text-stone-50 backdrop-blur-sm transition hover:border-white/24 hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30 active:scale-[0.98]"
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
