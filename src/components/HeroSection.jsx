import profile from '../assets/ls-profile.png';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TextScramble } from './ui/text-scramble.jsx';
import { BorderBeam } from './ui/border-beam.jsx';
import AvatarBeam from './AvatarBeam.jsx';
import { useTheme } from './ThemeContext.jsx';
import './HeroSection.css';

const WHATSAPP_URL = `https://wa.me/5511951391535`;

const PREFIX  = 'ATUO COMO ';
const WORDS   = ['BACKEND DEVELOPER', 'QUALITY ASSURANCE', 'DEVELOPER TEST AUTOMATION'];
const TYPE_SPEED   = 60;
const DELETE_SPEED = 35;
const PAUSE_FULL   = 1800;
const PAUSE_EMPTY  = 500;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

/* Diamond star */
function StarDot({ style }) {
  return (
    <span className="hero__star" style={style}>
      <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,0 6.5,3.5 10,5 6.5,6.5 5,10 3.5,6.5 0,5 3.5,3.5" fill="currentColor" />
      </svg>
    </span>
  );
}

const STARS = [
  { top: '-14px', left: '6%',   size: 7, delay: 0,    dur: 2.8 },
  { top: '-6px',  left: '28%',  size: 4, delay: 0.55, dur: 2.2 },
  { top: '-16px', left: '58%',  size: 9, delay: 1.1,  dur: 3.1 },
  { top: '8px',   left: '88%',  size: 5, delay: 0.3,  dur: 2.5 },
  { top: '55%',   left: '-14px',size: 6, delay: 0.75, dur: 2.9 },
  { top: '70%',   left: '96%',  size: 4, delay: 1.4,  dur: 2.3 },
  { top: '108%',  left: '18%',  size: 5, delay: 0.2,  dur: 2.7 },
  { top: '105%',  left: '72%',  size: 7, delay: 0.9,  dur: 3.0 },
];

/* LUCAS com efeito de distorção na montagem + estrelas */
function LucasName() {
  const [trigger, setTrigger] = useState(false);

  // Disparar o “scramble” uma vez após um breve intervalo ao subir
  useEffect(() => {
    const t = setTimeout(() => setTrigger(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <span className="hero__lucas-wrap">
      {STARS.map((s, i) => (
        <StarDot key={i} style={{
          top: s.top, left: s.left,
          width: `${s.size}px`, height: `${s.size}px`,
          animationDelay: `${s.delay}s`,
          animationDuration: `${s.dur}s`,
        }} />
      ))}
      <TextScramble
        as="span"
        className="hero__lucas-text"
        trigger={trigger}
        speed={0.04}
        duration={0.9}
        characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*"
        onScrambleComplete={() => setTrigger(false)}
      >
        LUCAS
      </TextScramble>
    </span>
  );
}

/* SILVA com jogada de mount */
function SilvaName() {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTrigger(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <TextScramble
      as="span"
      className="hero__silva-text"
      trigger={trigger}
      speed={0.04}
      duration={0.9}
      characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*"
      onScrambleComplete={() => setTrigger(false)}
    >
      SILVA
    </TextScramble>
  );
}

function TypingText() {
  const [display, setDisplay]  = useState('');
  const wordIdxRef             = useRef(0);
  const charIdxRef             = useRef(0);
  const timerRef               = useRef(null);

  useEffect(() => {
    const startDelay = setTimeout(() => schedule('typing'), 900);
    return () => { clearTimeout(startDelay); clearTimeout(timerRef.current); };
  }, []);

  function schedule(nextPhase) {
    const word = WORDS[wordIdxRef.current];
    if (nextPhase === 'typing') {
      const tick = () => {
        charIdxRef.current++;
        setDisplay(word.slice(0, charIdxRef.current));
        if (charIdxRef.current < word.length) timerRef.current = setTimeout(tick, TYPE_SPEED);
        else timerRef.current = setTimeout(() => schedule('deleting'), PAUSE_FULL);
      };
      timerRef.current = setTimeout(tick, TYPE_SPEED);
    }
    if (nextPhase === 'deleting') {
      const tick = () => {
        charIdxRef.current--;
        setDisplay(word.slice(0, charIdxRef.current));
        if (charIdxRef.current > 0) timerRef.current = setTimeout(tick, DELETE_SPEED);
        else {
          wordIdxRef.current = (wordIdxRef.current + 1) % WORDS.length;
          timerRef.current = setTimeout(() => schedule('typing'), PAUSE_EMPTY);
        }
      };
      timerRef.current = setTimeout(tick, DELETE_SPEED);
    }
  }

  return (
    <span className="hero__typed">
      {PREFIX}{display}<span className="hero__cursor">|</span>
    </span>
  );
}

export default function HeroSection() {
  const ref      = useRef(null);
  const ringRef  = useRef(null);           // referência a div do anel propriamente dito
  const inView   = useInView(ref, { margin: '-10% 0px -10% 0px' });
  const { dark } = useTheme();
  const [beamActive, setBeamActive] = useState(false);

  return (
    <div className="hero" ref={ref}>
      <motion.div
        className="hero__content"
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {/* Profile */}
        <motion.div
          className="hero__avatar"
          variants={item}
          whileHover="hover"
          whileTap="hover"
          onHoverStart={() => setBeamActive(true)}
          onHoverEnd={() => setBeamActive(false)}
          onTapStart={() => setBeamActive(true)}
          onTap={() => setTimeout(() => setBeamActive(false), 1000)}
        >
          <div className="hero__avatar-beam-wrap">
            {/* Image ring - no fluxo normal, centralizado por flexbox */}
            <motion.div
              className="hero__avatar-ring-motion"
              variants={{ hover: { scale: 1.05 } }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero__avatar-ring" ref={ringRef}>
                <motion.img
                  src={profile}
                  alt="Lucas da Silva"
                  className="hero__avatar-img"
                  variants={{ hover: { scale: 1.1, y: -10 } }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
            {/* Canvas beam -  lê o tamanho do ring em tempo real por meio do ResizeObserver */}
            <AvatarBeam active={beamActive} dark={dark} ringRef={ringRef} />
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1 className="hero__title" variants={item}>
          OLÁ, MEU NOME É<br />
          <span className="hero__title-name">
            <LucasName /> <SilvaName />
          </span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.p className="hero__subtitle" variants={item}>
          <TypingText />
        </motion.p>

        {/* CTA */}
        <motion.div className="hero__cta-wrap" variants={item}>
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hero__cta"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            CONTACT ME
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
