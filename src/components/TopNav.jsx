const NAV_LINKS = [
  { label: 'HOME',       href: '#home' },
  { label: 'ABOUT',      href: '#about' },
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'SKILLS',     href: '#skills' },
];

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

export default function TopNav() {
  return <div>TopNav</div>;
}