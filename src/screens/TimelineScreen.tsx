import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { GiftToken } from '../components/GiftToken'
import { Portal } from '../components/Portal'
import { TimelineCard } from '../components/TimelineCard'
import { TIMELINE_STEPS } from '../data/timeline'

type TimelineScreenProps = {
  onBack: () => void
  active?: boolean
}

export function TimelineScreen({ onBack, active = true }: TimelineScreenProps) {
  useEffect(() => {
    if (!active) return
    window.scrollTo(0, 0)
  }, [active])

  const giftIds = useMemo(
    () => ['gift-side-left', 'gift-side-right', 'gift-card-start', 'gift-card-see', 'gift-card-words'] as const,
    [],
  )
  const totalGifts = giftIds.length
  const [collected, setCollected] = useState<Set<string>>(() => new Set())

  const onCollect = (id: string) => {
    setCollected((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const unlockedGift = collected.size >= totalGifts
  const [giftOpen, setGiftOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="relative z-10 min-h-dvh">
      <Portal>
        <motion.button
          type="button"
          onClick={() => setAccepted(false)}
          className="fixed inset-0 z-[2000] flex items-center justify-center"
          initial={false}
          animate={{ opacity: accepted ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Закрыть"
          style={{ pointerEvents: accepted ? 'auto' : 'none' }}
        >
          <div className="absolute inset-0 bg-black/90" />
          <motion.div
            initial={false}
            animate={
              accepted
                ? { scale: 1, opacity: 1, y: 0 }
                : { scale: 0.96, opacity: 0, y: 10 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative select-none px-6 py-2"
          >
            <p className="font-display text-[7rem] leading-none text-stone-50/95 drop-shadow-[0_18px_60px_rgba(0,0,0,0.55)] sm:text-[9rem] md:text-[11rem]">
              ♡
            </p>
          </motion.div>
        </motion.button>
      </Portal>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1]"
        initial={false}
        animate={{ opacity: giftOpen ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.08),transparent_58%),radial-gradient(circle_at_70%_70%,rgba(244,63,94,0.08),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.28] [background-image:radial-gradient(rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:4px_4px] animate-gift-ambient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
      </motion.div>
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#05050a]/75 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="font-ui justify-self-start rounded-full border border-white/14 bg-white/5 px-4 py-2 text-sm font-medium text-stone-100/90 transition hover:border-white/22 hover:bg-white/7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/25"
          >
            ← Назад
          </button>
          <h1 className="font-display col-start-2 text-center text-lg text-stone-100/90 sm:text-xl">
            Временная шкала
          </h1>
          <span className="col-start-3" aria-hidden />
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-40 pt-10 sm:px-8 sm:pt-12 lg:pb-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,34rem)_minmax(0,1fr)] lg:gap-12 lg:items-start">
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="relative rounded-3xl border border-white/10 bg-stone-950/35 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md">
                <GiftToken
                  id="gift-side-left"
                  collected={collected.has('gift-side-left')}
                  onCollect={onCollect}
                  className="absolute -right-4 -top-4 z-30 opacity-25 hover:opacity-95"
                  label="Спрятанный подарок слева"
                />
                <p className="font-display text-2xl leading-snug text-rose-50/90">
                  Закат - как будто пауза,
                  <br />
                  чтобы вспомнить важное.
                </p>
                <p className="font-ui mt-4 text-sm leading-relaxed text-stone-300/85">
                  В этой странице главное - не скорость. Листай спокойно.
                </p>
              </div>
            </div>
          </aside>

          <div className="mx-auto w-full max-w-xl">
            <div className="mb-6 lg:hidden">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-stone-950/35 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md">
                <GiftToken
                  id="gift-side-left"
                  collected={collected.has('gift-side-left')}
                  onCollect={onCollect}
                  className="absolute right-3 top-3 z-30 opacity-25 hover:opacity-95"
                  label="Спрятанный подарок"
                />
                <p className="font-display text-xl leading-snug text-rose-50/90">
                  Закат - как будто пауза,
                  <br />
                  чтобы вспомнить важное.
                </p>
                <p className="font-ui mt-3 text-sm leading-relaxed text-stone-300/85">
                  Листай спокойно и раскрывай шаги по очереди.
                </p>
              </div>
            </div>

            <div className="mb-12 flex justify-center">
              <p className="font-ui animate-timeline-hint inline-flex max-w-[min(100%,24rem)] flex-col items-center gap-2 rounded-2xl border border-white/14 bg-[color:var(--card-bg)] px-5 py-3.5 text-center text-[0.8125rem] font-medium leading-snug text-stone-100/90 shadow-[var(--card-shadow)] backdrop-blur-md sm:flex-row sm:text-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center self-center rounded-full border border-white/12 bg-white/5 text-base text-stone-100/70" aria-hidden>
                  ↓
                </span>
                <span>
                  Листай вниз - шаг за шагом. Тут не просто чтение: у каждой карточки свой маленький интерактив.
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8">
              {TIMELINE_STEPS.map((step, i) => (
                <TimelineCard
                  key={step.id}
                  cardId={step.id}
                  title={step.title}
                  body={step.body}
                  index={i}
                  isLast={i === TIMELINE_STEPS.length - 1}
                  collected={collected}
                  onCollect={onCollect}
                  unlockedGift={unlockedGift}
                  totalGifts={totalGifts}
                  onGiftOpenChange={step.id === 'gift' ? setGiftOpen : undefined}
                  onCouponAccept={step.id === 'gift' ? () => setAccepted(true) : undefined}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <div className="rounded-full border border-white/10 bg-white/4 px-5 py-2 backdrop-blur-md">
                <p className="font-ui text-xs tracking-[0.22em] text-stone-300/80">✦ Конец этой главы</p>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-stone-950/30 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md">
                <GiftToken
                  id="gift-side-right"
                  collected={collected.has('gift-side-right')}
                  onCollect={onCollect}
                  className="absolute right-4 top-4 z-30 opacity-25 hover:opacity-95"
                  label="Спрятанный подарок справа"
                />
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.16)_0%,transparent_65%)] blur-2xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.14)_0%,transparent_70%)] blur-2xl"
                  aria-hidden
                />
                <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-rose-200/70">
                  Маленькая игра
                </p>
                <p className="font-ui mt-3 text-sm leading-relaxed text-stone-300/85">
                  Собери все спрятанные 🎁, чтобы разблокировать карточку "Твой подарок".
                </p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-rose-200/70">
                    Собрано
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="font-ui text-sm text-stone-200/90">
                      {collected.size}/{totalGifts}
                    </p>
                    <div className="h-2 w-40 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-300/70 via-rose-300/70 to-fuchsia-300/55 transition-[width] duration-700"
                        style={{ width: `${Math.min(100, (collected.size / totalGifts) * 100)}%` }}
                        aria-hidden
                      />
                    </div>
                  </div>
                  <p className="font-ui mt-2 text-xs text-stone-400/90">
                    {unlockedGift ? 'Готово - подарок можно открыть' : 'Найди все спрятанные 🎁'}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Portal>
        <div className="fixed inset-x-0 bottom-0 z-[999] px-4 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden">
          <div className="relative mx-auto max-w-xl rounded-2xl border border-white/14 bg-[color:var(--card-bg)] px-4 py-3 shadow-[var(--card-shadow)] backdrop-blur-md">
            <GiftToken
              id="gift-side-right"
              collected={collected.has('gift-side-right')}
              onCollect={onCollect}
              className="absolute -top-3 right-3 z-30 opacity-25 hover:opacity-95"
              label="Спрятанный подарок"
            />
            <div className="flex items-center justify-between gap-3">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-stone-200/70">
                Подарки
              </p>
              <p className="font-ui text-xs text-stone-300/80">
                {collected.size}/{totalGifts}
              </p>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-300/60 via-rose-300/55 to-fuchsia-300/45 transition-[width] duration-700"
                style={{ width: `${Math.min(100, (collected.size / totalGifts) * 100)}%` }}
                aria-hidden
              />
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="font-ui text-xs text-stone-300/80">
                {unlockedGift ? 'Можно открыть подарок' : 'Найди спрятанные 🎁'}
              </p>
              <button
                type="button"
                onClick={() => document.getElementById('timeline-gift')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="font-ui rounded-full border border-white/14 bg-white/5 px-3 py-1.5 text-xs font-semibold text-stone-100/90 transition hover:border-white/22 hover:bg-white/7"
              >
                К подарку
              </button>
            </div>
          </div>
        </div>
      </Portal>
    </div>
  )
}
