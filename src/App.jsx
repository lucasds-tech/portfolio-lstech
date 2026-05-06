/* App.jsx */
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';


import './styles/app.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <div className="app">
        <ParticleBackground />
        <CursorEffect />

        <AnimatePresence>
          {loading && <LoadingScreen onDone={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            <ScrollBar />
            <TopNav />
            <main className="main-scroll">
              <section id="home"><HeroSection /></section>
              <section id="about"><AboutSection /></section>
              <section id="projects"><ProjectsSection /></section>
              <section id="experience"><ExperienceSection /></section>
              <section id="skills"><SkillsSection /></section>
              <GetInTouch />
              <Footer />
            </main>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
