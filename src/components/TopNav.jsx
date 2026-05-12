const NAV_LINKS = [
  { label: 'HOME',       href: '#home' },
  { label: 'ABOUT',      href: '#about' },
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'SKILLS',     href: '#skills' },
];

function DocIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

function TubelightLinks({ activeTab, setActiveTab, onNav }) {
  const listRef = useRef(null);
  const [hov, setHov] = useState({ left: 0, width: 0, opacity: 0 });

  const onEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const lr   = listRef.current.getBoundingClientRect();
    setHov({ left: rect.left - lr.left, width: rect.width, opacity: 1 });
  };
  const onLeave = () => setHov(h => ({ ...h, opacity: 0 }));

  return (
    <ul className="topnav__links" ref={listRef} onMouseLeave={onLeave}>
      <div className="topnav__links-hover" style={hov} />
      {NAV_LINKS.map(({ label, href }) => {
        const active = activeTab === label;
        return (
          <li key={label} onMouseEnter={onEnter}>
            <a href={href}
              className={`topnav__link${active ? ' topnav__link--active' : ''}`}
              onClick={e => { onNav(e, href); setActiveTab(label); }}>
              {label}
              {active && (
                <motion.div layoutId="tubelight" className="topnav__tubelight"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 340, damping: 30 }}>
                  <div className="topnav__tube-bar" />
                  <div className="topnav__tube-halo topnav__tube-halo--wide" />
                  <div className="topnav__tube-halo topnav__tube-halo--mid" />
                  <div className="topnav__tube-halo topnav__tube-halo--tight" />
                </motion.div>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2.2"/>
      <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ThemeToggle({ drawer = false }) {
  const { dark, toggle } = useTheme();
  if (drawer) {
    return (
      <button
        className="topnav__theme-btn--drawer"
        onClick={toggle}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {dark ? <MoonIcon /> : <SunIcon />}
        <span>{dark ? 'DARK MODE' : 'LIGHT MODE'}</span>
      </button>
    );
  }
  return (
    <button
      className="topnav__theme-btn"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function ResumeButton({ isMobile }) {
  const URL = '/Lucas da Silva — CV.pdf';
  if (isMobile) {
    return (
      <a href={URL} target="_blank" rel="noreferrer"
        className="topnav__cv-icon-only" aria-label="Resume" download>
        <DocIcon size={24} />
      </a>
    );
  }
  return (
    <motion.a href={URL} target="_blank" rel="noreferrer"
      className="topnav__cv-btn" download
      initial="rest" whileHover="hover" animate="rest">
      <DocIcon size={16} />
      <motion.span className="topnav__cv-label"
        variants={{
          rest:  { width: 0, opacity: 0, marginLeft: 0 },
          hover: { width: 'auto', opacity: 1, marginLeft: 9 },
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}>
        Resume
      </motion.span>
    </motion.a>
  );
}

export default function TopNav() {
  return <div>TopNav</div>;
}