import mePhoto from '../assets/avatar-about-me.jpeg';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './AboutSection.css';

/* Card 3D com efeito de inclinação
apenas efeito de paralaxe com o mouse no desktop, sem escala ao passar o mouse */
function TiltPhoto() {
  const cardRef = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg  = { damping: 22, stiffness: 180 };
  const rotateX    = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), springCfg);
  const rotateY    = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), springCfg);
  const glareX     = useTransform(rawX, [-0.5, 0.5], ['0%', '100%']);
  const glareY     = useTransform(rawY, [-0.5, 0.5], ['0%', '100%']);

  function onMouseMove(e) {
    const r = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onMouseLeave() { rawX.set(0); rawY.set(0); }

  return (
    /* contêiner externo fornece as camadas de fundo das cartas empilhadas */
    <div className="about__card-stack">
      {/* Back card 2 */}
      <div className="about__card-back about__card-back--2" />
      {/* Back card 1 */}
      <div className="about__card-back about__card-back--1" />

      {/* Front - tilt card */}
      <motion.div
        ref={cardRef}
        className="about__tilt-card"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={mePhoto}
          alt="Lucas da Silva"
          className="about__photo"
          draggable={false}
        />
        {/* brilho */}
        <motion.div
          className="about__tilt-glare"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.16) 0%, transparent 62%)`
            ),
          }}
        />
        {/* Sombra profunda interna */}
        <div className="about__tilt-shadow" />
      </motion.div>
    </div>
  );
}

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