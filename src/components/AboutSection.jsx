import mePhoto from '../assets/avatar-about-me.jpeg';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './AboutSection.css';

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <div className="about">
      <motion.div
        ref={ref}
        className="about__inner"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* Top row */}
        <div className="about__top-row">
          <div className="about__left">
            <motion.h2 className="about__heading" variants={fadeUpScale}>
              ABOUT
              <span className="about__heading-accent">-ME</span>
            </motion.h2>
            <motion.p className="about__body" variants={fadeUp}>
              Desenvolvedor Back-End com foco em Java e Spring Boot, atuando na construção e manutenção de APIs REST.
         <br/>Experiência com testes automatizados, boas práticas e evolução de sistemas em ambiente corporativo. 
              Buscando evoluir como engenheiro de software, com foco em código limpo e soluções robustas.
            </motion.p>
          </div>
          <TiltPhoto />
        </div>
      </motion.div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};
const fadeUpScale = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};