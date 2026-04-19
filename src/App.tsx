import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { SceneBackground } from './components/SceneBackground'
import { SunsetBackground } from './components/SunsetBackground'
import { EntranceScreen } from './screens/EntranceScreen'
import { TimelineScreen } from './screens/TimelineScreen'

type Screen = 'entrance' | 'timeline'

function App() {
  const [screen, setScreen] = useState<Screen>('entrance')
  const go = (next: Screen) => setScreen(next)

  return (
    <div className="relative min-h-dvh bg-[#05050a] text-stone-100">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        initial={false}
        animate={{ opacity: screen === 'entrance' ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <SceneBackground />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        initial={false}
        animate={{ opacity: screen === 'timeline' ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <SunsetBackground />
      </motion.div>

      <div className="relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          {screen === 'entrance' ? (
            <motion.div
              key="entrance"
              initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <EntranceScreen onEnter={() => go('timeline')} />
            </motion.div>
          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <TimelineScreen onBack={() => go('entrance')} active />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
