import { useMemo, useState } from 'react'
import { MagnoliaFlower } from './MagnoliaFlower'
import { GiftToken } from './GiftToken'
import { useInViewOnce } from '../hooks/useInViewOnce'

type TimelineCardProps = {
  cardId: string
  title: string
  body?: string
  index: number
  isLast: boolean
  collected: ReadonlySet<string>
  onCollect: (id: string) => void
  unlockedGift: boolean
  totalGifts: number
  onGiftOpenChange?: (open: boolean) => void
  onCouponAccept?: () => void
}

const VARIANTS = [
  {
    icon: 'border-white/16 bg-[color:var(--card-bg)] shadow-[var(--card-shadow)] group-hover:border-white/22',
    line: 'from-white/28 via-white/12 to-transparent',
    panel:
      'rounded-2xl border-white/16 bg-[color:var(--card-bg)] group-hover:border-white/22',
    pin: 'group-hover:scale-[1.06]',
  },
  {
    icon: 'rounded-2xl rounded-tr-3xl border-white/16 bg-[color:var(--card-bg)] shadow-[var(--card-shadow)] group-hover:border-white/22',
    line: 'from-white/28 via-white/12 to-transparent',
    panel:
      'rounded-2xl rounded-tl-3xl border-white/16 bg-[color:var(--card-bg)] group-hover:border-white/22',
    pin: 'group-hover:rotate-6',
  },
  {
    icon: 'rounded-3xl border-white/16 bg-[color:var(--card-bg)] shadow-[var(--card-shadow)] group-hover:border-white/22',
    line: 'from-white/28 via-white/12 to-transparent',
    panel:
      'rounded-3xl border-white/16 bg-[color:var(--card-bg)] group-hover:border-white/22',
    pin: 'group-hover:-translate-y-[1px]',
  },
  {
    icon: 'rounded-2xl rounded-bl-3xl border-white/16 bg-[color:var(--card-bg)] shadow-[var(--card-shadow)] group-hover:border-white/22',
    line: 'from-white/28 via-white/12 to-transparent',
    panel:
      'rounded-2xl rounded-br-3xl border-white/16 bg-[color:var(--card-bg)] group-hover:border-white/22',
    pin: 'group-hover:scale-[1.06]',
  },
] as const

export function TimelineCard({
  cardId,
  title,
  body,
  index,
  isLast,
  collected,
  onCollect,
  unlockedGift,
  totalGifts,
  onGiftOpenChange,
  onCouponAccept,
}: TimelineCardProps) {
  const { ref, visible } = useInViewOnce<HTMLDivElement>()
  const v = VARIANTS[index % VARIANTS.length]

  const enterDelay = `${160 + index * 95}ms`
  const enterDuration = '1100ms'

  const [open, setOpen] = useState(false)
  const giftLocked = cardId === 'gift' && !unlockedGift
  const dimGiftIcon = cardId === 'gift' && giftLocked
  const giftOpenGlow = cardId === 'gift' && open && !giftLocked

  return (
    <div id={`timeline-${cardId}`} ref={ref} className="group relative flex gap-4 sm:gap-5 scroll-mt-24">
      <div className="flex shrink-0 flex-col items-center">
        <div
          className={`flex h-[4.25rem] w-[4.25rem] items-center justify-center border backdrop-blur-sm transition-[opacity,transform,box-shadow,border-color,filter] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] sm:h-[4.5rem] sm:w-[4.5rem] ${v.icon} ${
            visible ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-0'
          } ${dimGiftIcon ? 'grayscale opacity-65' : 'grayscale-0 opacity-100'} ${giftOpenGlow ? 'shadow-[0_0_28px_rgba(255,255,255,0.08),0_0_36px_rgba(251,191,36,0.12)] border-white/22' : ''} group-hover:scale-105`}
          style={{
            transitionDuration: enterDuration,
            transitionDelay: visible ? '0ms' : enterDelay,
          }}
        >
          <MagnoliaFlower
            className={`h-11 w-11 transition-transform duration-500 ease-out group-hover:scale-105 sm:h-12 sm:w-12 ${
              giftOpenGlow ? 'drop-shadow-[0_0_14px_rgba(251,191,36,0.18)]' : ''
            }`}
          />
        </div>
        {!isLast && (
          <div
            className={`mt-3 h-14 w-px shrink-0 bg-gradient-to-b transition-opacity ease-out sm:h-16 ${v.line} ${
              visible ? 'opacity-100' : 'opacity-0'
            } group-hover:opacity-100`}
            style={{
              transitionDuration: '900ms',
              transitionDelay: visible ? '120ms' : enterDelay,
            }}
            aria-hidden
          />
        )}
      </div>

      <article
        className={`timeline-card-panel card-glass flex min-w-0 flex-1 flex-col overflow-hidden shadow-[var(--card-shadow)] transition-[opacity,transform,box-shadow,border-color] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${v.panel} ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        } ${giftLocked ? 'grayscale opacity-70' : 'group-hover:-translate-y-0.5 group-hover:scale-[1.004] group-hover:duration-700'}`}
        style={{
          transitionDuration: enterDuration,
          transitionDelay: enterDelay,
        }}
      >
        {cardId === 'start' ? (
          <StartCard title={title} body={body ?? ''} vPin={v.pin} open={open} setOpen={setOpen} collected={collected} onCollect={onCollect} />
        ) : cardId === 'see' ? (
          <SeeCard title={title} vPin={v.pin} open={open} setOpen={setOpen} collected={collected} onCollect={onCollect} />
        ) : cardId === 'words' ? (
          <WordsCard title={title} vPin={v.pin} open={open} setOpen={setOpen} collected={collected} onCollect={onCollect} />
        ) : (
          <GiftCard
            title={title}
            vPin={v.pin}
            open={open}
            setOpen={setOpen}
            unlocked={unlockedGift}
            collectedCount={collected.size}
            total={totalGifts}
            onOpenChange={onGiftOpenChange}
            onAccept={onCouponAccept}
          />
        )}
      </article>
    </div>
  )
}

function Header({
  title,
  vPin,
  hint,
  open,
  onToggle,
}: {
  title: string
  vPin: string
  hint: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="font-ui w-full px-5 pb-3 pt-5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 sm:px-6 sm:pb-4 sm:pt-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-display flex flex-1 items-start gap-2.5 text-xl font-semibold leading-snug tracking-[0.02em] text-stone-50 sm:text-2xl">
          <span
            className={`mt-0.5 shrink-0 select-none text-lg opacity-80 transition-transform duration-700 ease-out sm:text-xl ${vPin}`}
            aria-hidden
          >
            📍
          </span>
          <span className="transition-colors duration-700 group-hover:text-rose-50">{title}</span>
        </h2>
        <span
          className={`mt-1.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose-300/20 bg-stone-950/45 text-rose-200/85 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-rose-200/55 sm:text-sm">{hint}</p>
    </button>
  )
}

function Collapsible({
  open,
  children,
}: {
  open: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div
        className={`min-h-0 overflow-hidden transition-[opacity,transform] duration-700 ease-out ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function StartCard({
  title,
  body,
  vPin,
  open,
  setOpen,
  collected,
  onCollect,
}: {
  title: string
  body: string
  vPin: string
  open: boolean
  setOpen: (v: boolean) => void
  collected: ReadonlySet<string>
  onCollect: (id: string) => void
}) {
  const parts = useMemo(() => body.split(/\n{2,}/g).filter(Boolean), [body])
  const [step, setStep] = useState(0)
  const shown = parts.slice(0, Math.max(1, step + 1))

  return (
    <>
      <Header
        title={title}
        vPin={vPin}
        open={open}
        onToggle={() => {
          const next = !open
          setOpen(next)
          if (next && step === 0) setStep(0)
        }}
        hint={open ? 'Нажми «Дальше», чтобы открыть следующий абзац' : 'Нажми - и история откроется по частям'}
      />
      <Collapsible open={open}>
        <div className="border-t border-white/5 px-5 pb-5 pt-1 sm:px-6 sm:pb-6">
          <div className="-mt-1 mb-3 flex h-[42px] justify-end">
            {collected.has('gift-card-start') ? (
              <span className="inline-block h-[42px] w-[42px]" aria-hidden />
            ) : (
              <GiftToken
                id="gift-card-start"
                collected={false}
                onCollect={onCollect}
                className="opacity-25 hover:opacity-95"
                label="Спрятанный подарок в первой карточке"
              />
            )}
          </div>
          <div className="space-y-4">
            {shown.map((p, i) => (
              <p
                key={i}
                className="font-ui animate-soft-in text-[0.9375rem] leading-[1.75] tracking-[0.01em] text-stone-300/95 sm:text-base sm:leading-[1.8]"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                {p}
              </p>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={!open || step === 0}
              className="font-ui rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-200/85 transition disabled:opacity-40 hover:border-white/15 hover:bg-white/8"
            >
              Назад
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(parts.length - 1, s + 1))}
              disabled={!open || step >= parts.length - 1}
              className="font-ui rounded-full border border-rose-300/30 bg-rose-950/45 px-5 py-2 text-sm font-semibold text-rose-50 transition disabled:opacity-40 hover:border-rose-200/45 hover:bg-rose-900/55"
            >
              Дальше
            </button>
          </div>
        </div>
      </Collapsible>
    </>
  )
}

function SeeCard({
  title,
  vPin,
  open,
  setOpen,
  collected,
  onCollect,
}: {
  title: string
  vPin: string
  open: boolean
  setOpen: (v: boolean) => void
  collected: ReadonlySet<string>
  onCollect: (id: string) => void
}) {
  const [taps, setTaps] = useState(0)
  const [burst, setBurst] = useState(0)
  const done = taps >= 7
  const petals = Math.min(7, taps)
  const sparks = Math.min(12, taps * 2)
  const [celebrate, setCelebrate] = useState(0)

  return (
    <>
      <Header
        title={title}
        vPin={vPin}
        open={open}
        onToggle={() => setOpen(!open)}
        hint={open ? (done ? 'Готово. Можно закрыть и открыть снова' : 'Нажимай на цветок - пусть «раскроется»') : 'Нажми - маленькая магия'}
      />
      <Collapsible open={open}>
        <div className="border-t border-white/5 px-5 pb-6 pt-4 sm:px-6 sm:pb-7">
          <div className="flex items-center justify-between gap-3">
            <p className="font-ui text-sm text-stone-300/90">
              {done ? 'Цветок раскрылся.' : `Почти: ${taps}/7`}
            </p>
            <button
              type="button"
              onClick={() => setTaps(0)}
              className="font-ui rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-stone-200/80 transition hover:border-white/15 hover:bg-white/8"
            >
              Сначала
            </button>
          </div>

          <div className="mt-5 flex justify-center">
            <div className="relative">
              <GiftToken
                id="gift-card-see"
                collected={collected.has('gift-card-see')}
                onCollect={onCollect}
                className="absolute -right-3 -top-3 z-30 opacity-30 hover:opacity-95"
                label="Спрятанный подарок во второй карточке"
              />
              <button
                type="button"
                onClick={() => {
                  setTaps((t) => {
                    const next = Math.min(7, t + 1)
                    if (next === 7 && t !== 7) setCelebrate((c) => c + 1)
                    return next
                  })
                  setBurst((b) => b + 1)
                }}
                className="group/flower relative rounded-3xl border border-rose-200/20 bg-gradient-to-br from-rose-950/45 to-stone-950/55 p-6 shadow-[0_28px_70px_-30px_rgba(251,113,133,0.35)] transition duration-700 hover:border-rose-200/35"
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 transition duration-700 group-hover/flower:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 45%, rgba(251,113,133,0.18), transparent 60%)',
                  }}
                  aria-hidden
                />
                <div className="relative">
                  {done && (
                    <div
                      key={`celebrate-${celebrate}`}
                      className="pointer-events-none absolute inset-0"
                      aria-hidden
                    >
                      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.18)_0%,rgba(244,63,94,0.16)_35%,transparent_70%)] blur-2xl animate-celebrate-glow" />
                      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-flower-salute">
                        {Array.from({ length: 18 }).map((_, i) => {
                          const angle = i * (360 / 18)
                          const dist = 72 + (i % 3) * 10
                          const size = i % 3 === 0 ? 'h-3 w-6' : 'h-2.5 w-5'
                          return (
                            <span
                              key={i}
                              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${size} bg-gradient-to-r from-rose-200/70 via-pink-200/55 to-fuchsia-300/25 shadow-[0_0_22px_rgba(251,113,133,0.25)]`}
                              style={{
                                transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${dist}px) rotate(${12 + (i % 5) * 6}deg)`,
                              }}
                            />
                          )
                        })}
                      </div>
                      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-celebrate-sparks">
                        {Array.from({ length: 24 }).map((_, i) => {
                          const angle = i * (360 / 24)
                          const dist = 68 + (i % 4) * 14
                          const size = i % 6 === 0 ? 6 : 4
                          return (
                            <span
                              key={i}
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-[0_0_18px_rgba(251,113,133,0.35)]"
                              style={{
                                width: size,
                                height: size,
                                transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${dist}px)`,
                              }}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {Array.from({ length: sparks }).map((_, i) => {
                    const a = i * (360 / Math.max(1, sparks))
                    const d = 42 + (i % 3) * 8
                    const size = i % 4 === 0 ? 6 : 4
                    return (
                      <span
                        key={`s-${burst}-${i}`}
                        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full bg-white/90 shadow-[0_0_18px_rgba(251,113,133,0.35)] animate-spark"
                        style={{
                          width: size,
                          height: size,
                          transform: `translate(-50%, -50%) rotate(${a}deg) translateX(${d}px)`,
                          animationDelay: `${(i % 6) * 30}ms`,
                        }}
                        aria-hidden
                      />
                    )
                  })}
                  {Array.from({ length: 7 }).map((_, i) => {
                    const show = petals >= i + 1
                    const angle = i * (360 / 7)
                    return (
                      <span
                        key={`p-${i}-${show ? 'on' : 'off'}`}
                        className={`absolute left-1/2 top-1/2 h-5 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-200/45 via-pink-300/35 to-fuchsia-300/15 shadow-[0_0_16px_rgba(251,182,206,0.22)] ${
                          show ? 'animate-petal-pop' : 'opacity-0'
                        }`}
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(64px) rotate(18deg)`,
                        }}
                        aria-hidden
                      />
                    )
                  })}
                  <MagnoliaFlower
                    key={burst}
                    className={`relative h-28 w-28 transition duration-700 ease-out sm:h-32 sm:w-32 ${
                      done ? 'animate-bloom' : 'animate-click-spin'
                    }`}
                  />
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="font-ui text-xs font-medium tracking-[0.18em] text-rose-200/85">Нажать</span>
                  <span className="font-ui text-xs text-stone-400/80">{done ? '✦' : '•'}</span>
                </div>
              </button>
            </div>
          </div>

          <div
            className={`mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-4 transition duration-700 ${
              done ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="font-ui text-sm leading-relaxed text-stone-200/92">
              Я вижу в тебе свет - и рядом с тобой хочется улыбаться чаще.
            </p>
          </div>
        </div>
      </Collapsible>
    </>
  )
}

function WordsCard({
  title,
  vPin,
  open,
  setOpen,
  collected,
  onCollect,
}: {
  title: string
  vPin: string
  open: boolean
  setOpen: (v: boolean) => void
  collected: ReadonlySet<string>
  onCollect: (id: string) => void
}) {
  const [value, setValue] = useState(0)
  const reveal = Math.min(1, Math.max(0, value / 100))
  const hidden = value === 0

  return (
    <>
      <Header
        title={title}
        vPin={vPin}
        open={open}
        onToggle={() => setOpen(!open)}
        hint={open ? 'Проведи ползунок - и слова проявятся' : 'Нажми - проявим слова'}
      />
      <Collapsible open={open}>
        <div className="border-t border-white/5 px-5 pb-6 pt-4 sm:px-6 sm:pb-7">
          <div className="relative">
            <GiftToken
              id="gift-card-words"
              collected={collected.has('gift-card-words')}
              onCollect={onCollect}
              className="absolute -right-1 -top-2 z-30 opacity-30 hover:opacity-95"
              label="Спрятанный подарок в карточке с ползунком"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="font-ui text-sm text-stone-300/90">Проявление</p>
            <p className="font-ui text-sm font-semibold tracking-[0.08em] text-rose-200/85 tabular-nums">
              {value}%
            </p>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="range-sunset mt-3 w-full"
            style={{ ['--val' as never]: `${value}%` } as never}
          />

          <div
            className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white/5"
            style={{
              maxHeight: hidden ? 0 : 260,
              transition: 'max-height 700ms ease, opacity 500ms ease',
              opacity: hidden ? 0 : 1,
            }}
            aria-hidden={hidden}
          >
            <div className="px-4 py-4">
              <p
                className="font-ui text-[0.9375rem] leading-[1.75] tracking-[0.01em] text-stone-200/95 transition duration-300"
                style={{
                  opacity: reveal,
                  transform: `translateY(${(1 - reveal) * 10}px)`,
                }}
              >
                С тобой спокойно. С тобой интересно. И рядом с тобой мне хочется становиться лучше - каждый день.
              </p>
            </div>
          </div>
        </div>
      </Collapsible>
    </>
  )
}

function GiftCard({
  title,
  vPin,
  open,
  setOpen,
  unlocked,
  collectedCount,
  total,
  onOpenChange,
  onAccept,
}: {
  title: string
  vPin: string
  open: boolean
  setOpen: (v: boolean) => void
  unlocked: boolean
  collectedCount: number
  total: number
  onOpenChange?: (open: boolean) => void
  onAccept?: () => void
}) {
  return (
    <>
      <Header
        title={title}
        vPin={vPin}
        open={open}
        onToggle={() => {
          if (!unlocked) return
          const next = !open
          setOpen(next)
          onOpenChange?.(next)
        }}
        hint={
          unlocked
            ? open
              ? 'Открыто'
              : 'Нажми - откроем конверт'
            : `Пока закрыто. Найди подарочки: ${collectedCount}/${total}`
        }
      />
      {!unlocked && (
        <div className="border-t border-white/5 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="font-ui text-sm leading-relaxed text-stone-200/85">
              🔒 Этот подарок откроется, когда соберёшь все спрятанные 🎁 на странице и в карточках.
            </p>
          </div>
        </div>
      )}
      <Collapsible open={open}>
        <div className="border-t border-white/5 px-5 pb-6 pt-5 sm:px-6">
          <div className="mx-auto w-full max-w-sm">
            <div className="relative overflow-hidden rounded-2xl border border-white/14 bg-[color:var(--card-bg)] shadow-[var(--card-shadow)]">
              <div
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, rgba(251,191,36,0.10), transparent 60%), radial-gradient(circle at 70% 90%, rgba(244,63,94,0.09), transparent 62%)',
                }}
                aria-hidden
              />
              <div className="relative px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-stone-200/70">
                    Купон
                  </p>
                  <span className="font-ui text-[0.7rem] font-semibold tracking-[0.18em] text-stone-300/70">
                    отказ не принимается)
                  </span>
                </div>
                <p className="font-display mt-3 text-[1.7rem] leading-snug text-stone-50">
                  Подарю тебе любую игру в Steam
                </p>
                <p className="font-ui mt-3 text-sm leading-relaxed text-stone-200/88">
                  Какую ты захочешь - и ещё <span className="text-stone-50">1 желание</span>.
                </p>

                <div className="mt-6 flex flex-col gap-4 rounded-xl border border-white/12 bg-white/5 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                  <p className="font-ui text-sm leading-relaxed text-stone-200/85">
                    С днём рождения. Пусть этот год будет тёплым и спокойным - а я буду рядом, чтобы радоваться с тобой.
                  </p>
                  <button
                    type="button"
                    onClick={onAccept}
                    className="font-ui btn-primary w-full rounded-full px-4 py-2.5 text-xs font-semibold tracking-[0.18em] text-stone-100/90 sm:w-auto sm:shrink-0 sm:px-4 sm:py-2"
                  >
                    Хорошо
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/3 px-5 py-4">
                <p className="font-ui text-xs text-stone-300/80">
                  Действует бессрочно, без подвоха - с днём рождения
                </p>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>
    </>
  )
}
