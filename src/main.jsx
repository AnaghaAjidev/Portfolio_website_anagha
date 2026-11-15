import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import {
  ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Phone, MapPin, Menu, X,
  Code2, Database, Smartphone, Globe2, Layers3, Sparkles, Download,
  GraduationCap, Award, Users, Terminal, Heart, FileText, ExternalLink,
  Cpu, Braces, Monitor, Server, Workflow, Send, CheckCircle2
} from 'lucide-react';
import './style.css';

const nav = [
  ['home', 'Home'], ['about', 'About'], ['skills', 'Skills'],
  ['projects', 'Projects'], ['education', 'Education'],
  ['achievements', 'Achievements'], ['contact', 'Contact']
];

const projects = [
  {
    n: '01', name: 'VeAssist', type: 'Welfare assistance platform for Naval Ex-Servicemen families',
    desc: 'A centralized welfare portal that helps Naval Ex-Servicemen and their families discover services, understand benefit procedures, manage applications, and connect with the appropriate authorities. It brings scholarship assistance, vocational training, pension and insurance guidance, document management, case tracking, and nearby support facilities into one place.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary'],
    repo: 'https://github.com/AnaghaAjidev/VeAssist', symbol: 'VA', category: 'FULL-STACK · WELFARE SERVICES',
    detail: ['Application management', 'Scholarship assistance', 'Case tracking']
  },
  {
    n: '02', name: 'Secure Volt Hub', type: 'EV charging & parking management system',
    desc: 'A mobile and web-based platform designed to streamline EV charging, parking, and maintenance. Users can discover nearby charging stations, check availability, reserve charging or parking slots, and access vehicle maintenance services.',
    stack: ['Flutter', 'Python', 'MySQL', 'Blockchain'],
    repo: 'https://github.com/AnaghaAjidev/PROJECT_volt', symbol: 'SV', category: 'MOBILE + WEB · EV ECOSYSTEM',
    detail: ['Station discovery', 'Slot reservations', 'Blockchain integration']
  },
  {
    n: '03', name: 'RentOut', type: 'Online rental management platform',
    desc: 'A rental platform where users can browse and search product listings, review item details, place bookings, and manage rental activity. Administrative tools support the management of users, products, bookings, and related operations.',
    stack: ['Python', 'Django', 'MySQL', 'HTML5', 'CSS3'],
    repo: 'https://github.com/AnaghaAjidev/PROJECT_rental', symbol: 'RO', category: 'WEB APPLICATION · RENTAL',
    detail: ['Product listings', 'Search & bookings', 'Admin management']
  }
];

const skillGroups = [
  { icon: Code2, title: 'Programming', code: '01', items: ['Python', 'Java', 'SQL', 'C'] },
  { icon: Globe2, title: 'Frontend & Mobile', code: '02', items: ['HTML5', 'CSS3', 'Bootstrap 5', 'React.js', 'Flutter', 'Dart'] },
  { icon: Server, title: 'Backend & APIs', code: '03', items: ['Django', 'Node.js', 'Express.js', 'REST APIs'] },
  { icon: Database, title: 'Databases', code: '04', items: ['MySQL', 'MongoDB'] },
  { icon: Workflow, title: 'Tools & Platforms', code: '05', items: ['Git', 'GitHub', 'VS Code', 'Android Studio', 'Postman'] }
];

const education = [
  { period: '2025 — 2027', title: 'Master of Computer Applications', place: 'Federal Institute of Science and Technology (FISAT), Angamaly', tag: 'CURRENTLY PURSUING', hash: 'mca-2027', icon: GraduationCap },
  { period: '2022 — 2025', title: 'Bachelor of Computer Applications', place: 'College of Applied Science, Mavelikara', tag: 'CGPA 8.288', hash: 'bca-2025', icon: GraduationCap },
  { period: '2021 — 2022', title: 'Higher Secondary Education', place: 'Govt. Boys Higher Secondary School, Mavelikara', tag: '87.9%', hash: 'hse-2022', icon: GraduationCap }
];

const awards = [
  { icon: Award, title: '1st Position — Website Cloning', sub: 'Algorhythm 2026 · FISAT', n: '01' },
  { icon: Users, title: 'Membership Chair', sub: 'ACM-W Student Chapter · FISAT', n: '02' },
  { icon: Users, title: 'NSS Volunteer', sub: 'College of Applied Science, Mavelikara', n: '03' },
  { icon: Sparkles, title: 'Top 7 Code Masters', sub: 'MERN Stack Bootcamp · FISAT', n: '04' },
  { icon: Heart, title: 'Vice Captain — Team Catalyst', sub: 'MPower Development Programme', n: '05' }
];

const certificates = [
  ['IT Specialist — Java', 'Certiport · Pearson VUE', 'https://lnkd.in/gkV4tMwZ'],
  ['IT Specialist — HTML5 Application Development', 'Certiport · Pearson VUE', 'https://lnkd.in/gGu8i3x5'],
  ['Prompt Engineering Certification', 'Dubai Future Foundation & Dubai Centre for AI'],
  ['Cloud Computing — Elite', 'NPTEL · IIT Kharagpur / SWAYAM'],
  ['Research Paper Presenter — NCCMEA 2024', 'National Conference']
];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: .72, ease: [.22, 1, .36, 1] } }
};

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: .11, delayChildren: .12 } }
};
const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: .65, ease: [.22, 1, .36, 1] } }
};

function ConstellationBackground() {
  const mount = useRef(null);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, .1, 100);
    camera.position.z = 15;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x05060d, 0);
    host.appendChild(renderer.domElement);

    const count = window.innerWidth < 700 ? 52 : 105;
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - .5) * 25;
      positions[i * 3 + 1] = (Math.random() - .5) * 15;
      positions[i * 3 + 2] = (Math.random() - .5) * 8;
      velocities.push([(Math.random() - .5) * .0018, (Math.random() - .5) * .0018]);
    }
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(pointGeo, new THREE.PointsMaterial({ color: 0x8e82ff, size: .045, transparent: true, opacity: .8 }));
    scene.add(points);

    const lineGeo = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({ color: 0x6876d8, transparent: true, opacity: .16 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.15, 2),
      new THREE.MeshBasicMaterial({ color: 0x786bdf, wireframe: true, transparent: true, opacity: .17 })
    );
    wire.position.set(5.8, 1.2, -2.2);
    scene.add(wire);
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.05, .012, 150, 8, 2, 3),
      new THREE.MeshBasicMaterial({ color: 0x21c6d5, transparent: true, opacity: .3 })
    );
    knot.position.set(-6.2, -3.8, -2);
    scene.add(knot);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!reduced) {
        const p = pointGeo.attributes.position.array;
        for (let i = 0; i < count; i++) {
          p[i * 3] += velocities[i][0]; p[i * 3 + 1] += velocities[i][1];
          if (p[i * 3] > 13) p[i * 3] = -13;
          if (p[i * 3] < -13) p[i * 3] = 13;
          if (p[i * 3 + 1] > 8) p[i * 3 + 1] = -8;
          if (p[i * 3 + 1] < -8) p[i * 3 + 1] = 8;
        }
        pointGeo.attributes.position.needsUpdate = true;
        const segments = [];
        for (let i = 0; i < count; i++) for (let j = i + 1; j < count; j++) {
          const dx = p[i * 3] - p[j * 3], dy = p[i * 3 + 1] - p[j * 3 + 1], dz = p[i * 3 + 2] - p[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < 4.1) segments.push(p[i * 3], p[i * 3 + 1], p[i * 3 + 2], p[j * 3], p[j * 3 + 1], p[j * 3 + 2]);
        }
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(segments, 3));
        wire.rotation.y += .0008; wire.rotation.x += .00035;
        knot.rotation.x += .0012; knot.rotation.y -= .001;
      }
      renderer.render(scene, camera);
    };
    animate();
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame); window.removeEventListener('resize', resize);
      pointGeo.dispose(); lineGeo.dispose(); lineMat.dispose(); points.material.dispose(); wire.geometry.dispose(); wire.material.dispose(); knot.geometry.dispose(); knot.material.dispose(); renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return <div className="constellation" ref={mount} aria-hidden="true" />;
}

function TiltCard({ children, className = '' }) {
  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    e.currentTarget.style.setProperty('--rx', `${-y * 5}deg`);
    e.currentTarget.style.setProperty('--ry', `${x * 6}deg`);
  };
  const onLeave = (e) => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); };
  return <div className={`tilt-card ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>{children}</div>;
}

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><p>{children}</p><i /></div>;
}

function App() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typed, setTyped] = useState('');
  const [codePosition, setCodePosition] = useState({ x: 0, y: 0, active: false });
  const [isCodeDragging, setIsCodeDragging] = useState(false);
  const codeDragRef = useRef(null);
  const heroRef = useRef(null);
  const aboutImageRef = useRef(null);
  const aboutCopyRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: .001 });
  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroParallaxY = useSpring(useTransform(heroScrollProgress, [0, 1], [0, -68]), { stiffness: 70, damping: 24, restDelta: .5 });
  const { scrollYProgress: aboutScrollProgress } = useScroll({ target: aboutImageRef, offset: ['start end', 'end start'] });
  const aboutImageY = useTransform(aboutScrollProgress, [0, 1], [36, -36]);
  const aboutImageScale = useTransform(aboutScrollProgress, [0, 1], [1.02, 1.1]);
  const aboutImageRotate = useTransform(aboutScrollProgress, [0, 1], [-1.2, 1.2]);
  const { scrollYProgress: aboutCopyProgress } = useScroll({ target: aboutCopyRef, offset: ['start end', 'end start'] });
  const aboutTextY1 = useTransform(aboutCopyProgress, [0, 1], [16, -16]);
  const aboutTextY2 = useTransform(aboutCopyProgress, [0, 1], [24, -24]);
  const aboutTextY3 = useTransform(aboutCopyProgress, [0, 1], [32, -32]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const phrase = 'Full-Stack Developer';
    let i = 0;
    const timer = setInterval(() => { i++; setTyped(phrase.slice(0, i)); if (i >= phrase.length) clearInterval(timer); }, 72);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-35% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const moveSkillOrbit = (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    event.currentTarget.style.setProperty('--skill-tilt-x', `${x * 10}deg`);
    event.currentTarget.style.setProperty('--skill-tilt-y', `${-y * 10}deg`);
  };

  const resetSkillOrbit = (event) => {
    event.currentTarget.style.setProperty('--skill-tilt-x', '0deg');
    event.currentTarget.style.setProperty('--skill-tilt-y', '0deg');
  };

  const startCodeCardDrag = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    codeDragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      ...codePosition,
      cardRect: event.currentTarget.getBoundingClientRect(),
      parentRect: event.currentTarget.parentElement.getBoundingClientRect()
    };
    setIsCodeDragging(true);
  };

  const moveCodeCard = (event) => {
    if (!codeDragRef.current) return;
    const { cardRect, parentRect } = codeDragRef.current;
    const deltaX = event.clientX - codeDragRef.current.pointerX;
    const deltaY = event.clientY - codeDragRef.current.pointerY;
    const minX = Math.min(0, parentRect.left - cardRect.left);
    setCodePosition({
      x: codeDragRef.current.x + Math.min(parentRect.right - cardRect.right, Math.max(minX, deltaX)),
      y: codeDragRef.current.y + Math.min(parentRect.bottom - cardRect.bottom, Math.max(parentRect.top - cardRect.top, deltaY)),
      active: true
    });
  };

  const stopCodeCardDrag = () => {
    codeDragRef.current = null;
    setIsCodeDragging(false);
  };

  return <>
    <motion.div className="reading-progress" style={{ scaleX: smoothProgress }} />
    <ConstellationBackground />

    <AnimatePresence>
      {loading && <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .65 } }}>
        <div className="loader-inner">
          <div className="loader-mark">A<span>/&gt;</span></div>
          <div className="loader-terminal"><p><b>$</b> npm run portfolio --env=production</p><p className="loader-check">✓ compiling components</p><p className="loader-check">✓ connecting ideas<span className="cursor-block" /></p></div>
          <div className="loader-track"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .45, ease: 'easeInOut' }} /></div>
          <div className="loader-meta"><span>ANAGHA AJIDEV / PORTFOLIO 2026</span><span>READY</span></div>
        </div>
      </motion.div>}
    </AnimatePresence>

    <header className="site-header">
      <button className="brand" onClick={() => go('home')} aria-label="Anagha home"><span className="brand-mark">A</span><span>anagha<span className="brand-accent">.dev</span></span></button>
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map(([id, label]) => <button key={id} onClick={() => go(id)} className={active === id ? 'active' : ''}>{active === id && <motion.span className="nav-active-pill" layoutId="nav-active-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}<span className="nav-label">{label}</span></button>)}
      </nav>
      <a className="resume-button" href="/Anagha_Ajidev_Resume.pdf" download>Resume <Download size={14} /></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>
      {menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
        {nav.map(([id, label], i) => <button key={id} onClick={() => go(id)}><span>0{i + 1}</span>{label}<ArrowUpRight size={16} /></button>)}
        <a href="/Anagha_Ajidev_Resume.pdf" download>Download Resume <Download size={15} /></a>
      </motion.nav>}
    </AnimatePresence>

    <main>
      <section id="home" className="hero page-section" ref={heroRef}>
        <div className="hero-grid" />
        <motion.div className="hero-content" variants={heroStagger} initial="hidden" animate="show">
          <motion.div className="availability" variants={heroItem}><i /> Open to learning & opportunities</motion.div>
          <motion.p className="terminal-line" variants={heroItem}><span>~/anagha $</span> whoami</motion.p>
          <motion.h1 variants={heroItem}>Anagha<br /><em>Ajidev</em></motion.h1>
          <motion.div className="role-line" variants={heroItem}><span>&lt;</span> {typed}<i className="type-cursor" /> <span>/&gt;</span></motion.div>
          <motion.p className="hero-description" variants={heroItem}>MCA candidate & full-stack developer. I turn ideas into working products — from a first sketch to the interface, the API and the data behind it — with thoughtful details and clean functionality.</motion.p>
          <motion.div className="hero-actions" variants={heroItem}>
            <button className="primary-button" onClick={() => go('projects')}>View my work <ArrowUpRight size={17} /></button>
            <a className="secondary-button" href="/Anagha_Ajidev_Resume.pdf" download>Resume <Download size={16} /></a>
            <div className="social-links"><a className="social-button" href="https://github.com/AnaghaAjidev" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
            <a className="social-button" href="https://www.linkedin.com/in/anagha-ajidev" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a></div>
          </motion.div>
          <motion.div className="hero-location" variants={heroItem}><MapPin size={14} /> Kerala, India <i /> MCA · 2025—2027</motion.div>
        </motion.div>
        <motion.div className="hero-portrait-wrap" initial={{ opacity: 0, scale: .94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: .45, ease: [.22, 1, .36, 1] }}>
          <motion.div className="hero-parallax-layer" style={{ y: prefersReducedMotion ? 0 : heroParallaxY }}>
          <div className="portrait-aura" />
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <TiltCard className="hero-portrait"><img src="/anagha-professional.webp" alt="Anagha Ajidev, full-stack developer" fetchPriority="high" decoding="async" /><span className="portrait-caption">FIG. 01 — BEHIND THE CODE</span></TiltCard>
          <div className={`code-float${isCodeDragging ? ' is-dragging' : ''}`} style={codePosition.active ? { transform: `translate(${codePosition.x}px, ${codePosition.y}px) rotate(-3deg)` } : undefined} onPointerDown={startCodeCardDrag} onPointerMove={moveCodeCard} onPointerUp={stopCodeCardDrag} onPointerCancel={stopCodeCardDrag} tabIndex={0} aria-label="Move the code card around the portrait by dragging"><div className="window-dots"><i /><i /><i /></div><code><span>const</span> anagha = {'{'}<br />&nbsp; role: <b>'Full-Stack Dev'</b>,<br />&nbsp; coffee: true<br />{'}'};</code></div>
          <div className="scroll-indicator" onClick={() => go('about')}><span /><small>SCROLL</small><ArrowDown size={14} /></div>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="about page-section">
        <SectionLabel number="01">ABOUT</SectionLabel>
        <h2 className="section-title">Technology with<br /><em>a human touch.</em></h2>
        <div className="about-layout">
          <div className="about-image-column" ref={aboutImageRef}>
            <div className="photo-corner photo-corner-tl" /><div className="photo-corner photo-corner-br" />
            <TiltCard className="about-photo"><motion.img src="/anagha-portrait.webp" alt="Anagha smiling" style={prefersReducedMotion ? undefined : { y: aboutImageY, scale: aboutImageScale, rotate: aboutImageRotate }} /><span>FIG. 02 — THE PERSON BEHIND THE PROJECTS</span></TiltCard>
            <div className="education-stamp"><small>MCA</small><b>FISAT</b><span>2025—2027</span></div>
          </div>
          <div className="about-copy" ref={aboutCopyRef}>
            <div className="file-tabs"><span className="active">about.md</span><span>stack.json</span><span className="file-dots">● ● ●</span></div>
            <motion.p className="about-lead" style={prefersReducedMotion ? undefined : { y: aboutTextY1 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .7, delay: .08, ease: [.22, 1, .36, 1] }}>I'm an MCA student at the Federal Institute of Science and Technology (FISAT), with a foundation in computer applications and a growing focus on full-stack development.</motion.p>
            <motion.p style={prefersReducedMotion ? undefined : { y: aboutTextY2 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .7, delay: .2, ease: [.22, 1, .36, 1] }}>I like taking an idea from its first sketch to a working application — thinking through the user experience, building the interface, connecting the backend and shaping the data behind it. My projects have given me hands-on experience across web and mobile development, databases, APIs, GPS-based services and blockchain verification.</motion.p>
            <motion.p style={prefersReducedMotion ? undefined : { y: aboutTextY3 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .7, delay: .32, ease: [.22, 1, .36, 1] }}>Beyond code, I value collaboration, communication and the willingness to step outside my comfort zone. I believe the best work comes from staying curious, being dependable and improving a little with every build.</motion.p>
            <div className="about-stats"><div><b>03</b><span>Featured projects</span></div><div><b>02</b><span>Degrees in progress / earned</span></div><div><b>∞</b><span>Things to explore</span></div></div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills page-section">
        <SectionLabel number="02">MY TOOLKIT</SectionLabel>
        <div className="section-intro"><h2 className="section-title">Tools I use.<br /><em>Things I explore.</em></h2><p>A practical toolkit shaped by coursework, independent learning and building projects end to end.</p></div>
        <div className="skills-layout">
          <div className="skill-orbit-wrap" onPointerMove={moveSkillOrbit} onPointerLeave={resetSkillOrbit}>
            <div className="skill-orbit orbit-one" /><div className="skill-orbit orbit-two" /><div className="skill-orbit orbit-three" />
            <div className="skill-core"><Braces size={36} /><span>MY STACK</span></div>
            {['Python', 'React', 'Node.js', 'Django', 'Flutter', 'MongoDB', 'MySQL', 'Java', 'Git'].map((s, i) => <span key={s} className={`orbit-tag orbit-tag-${i + 1}`}>{s}</span>)}
          </div>
          <div className="skill-categories">
            {skillGroups.map((group, i) => <motion.article className="skill-category" key={group.title} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: false, amount: .2 }} transition={{ delay: i * .06 }}>
              <div className="category-icon"><group.icon size={19} /></div><div className="category-content"><div className="category-heading"><h3>{group.title}</h3><span>0{i + 1} / STACK</span></div><div className="skill-pills">{group.items.map(item => <span key={item}>{item}</span>)}</div></div>
            </motion.article>)}
          </div>
        </div>
        <div className="soft-skills"><span>HOW I WORK</span><p>Communication <i /> Time management <i /> Adaptability <i /> Teamwork <i /> Problem-solving <i /> Leadership</p></div>
      </section>

      <section id="projects" className="projects page-section">
        <SectionLabel number="03">SELECTED WORK</SectionLabel>
        <div className="section-intro"><h2 className="section-title">Ideas made<br /><em>tangible.</em></h2><p>Each project is a chance to learn a new layer of development and solve a problem from a different angle.</p></div>
        <div className="project-list">
          {projects.map((project, i) => <motion.article className="project-card" key={project.name} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: false, amount: .18 }}>
            <TiltCard className={`project-visual project-visual-${i + 1}`}><div className="project-visual-top"><span>~/projects/{project.name.toLowerCase().replaceAll(' ', '-')}</span><span>{project.n} / 03</span></div><div className="project-visual-center"><div className="project-orb"><span>{project.symbol}</span></div><div className="project-orbit-line" /><span className="project-chip">{project.category.split(' · ')[0]}</span></div><div className="project-visual-bottom"><span>ACADEMIC PROJECT</span><span>0{i + 1} — 03</span></div></TiltCard>
            <div className="project-details"><div className="project-kicker"><span>PROJECT {project.n}</span><span>{project.category}</span></div><h3>{project.name}</h3><h4>{project.type}</h4><p>{project.desc}</p><div className="project-highlights">{project.detail.map(d => <span key={d}><CheckCircle2 size={13} />{d}</span>)}</div><div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div><a className="project-link" href={project.repo} target="_blank" rel="noreferrer">Explore repository <ArrowUpRight size={16} /></a></div>
          </motion.article>)}
        </div>
        <div className="github-cta"><span>MORE CODE, EXPERIMENTS & LEARNING LOGS</span><a href="https://github.com/AnaghaAjidev" target="_blank" rel="noreferrer">Explore my GitHub <Github size={16} /></a></div>
      </section>

      <section id="education" className="education page-section">
        <SectionLabel number="04">EDUCATION</SectionLabel>
        <div className="section-intro"><h2 className="section-title">Learning is<br /><em>the throughline.</em></h2><p>A timeline of the places, people and experiences that have shaped my path in technology.</p></div>
        <div className="education-terminal"><span className="prompt">$</span> git log --graph --oneline <b>education/</b></div>
        <div className="education-timeline">
          {education.map((item, i) => <motion.div className={`education-entry ${i % 2 ? 'entry-right' : ''}`} key={item.hash} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: false, amount: .35 }}>
            <div className="timeline-node"><item.icon size={17} /></div>
            <div className="education-card"><div className="education-card-top"><span>{item.period}</span><small><i /> {item.hash}</small></div><h3>{item.title}</h3><p>{item.place}</p><span className="education-tag">{item.tag}</span></div>
          </motion.div>)}
        </div>
      </section>

      <section id="achievements" className="achievements page-section">
        <SectionLabel number="05">ACHIEVEMENTS & INVOLVEMENT</SectionLabel>
        <div className="section-intro"><h2 className="section-title">Small milestones.<br /><em>Meaningful momentum.</em></h2><p>Learning doesn't happen only in a classroom. These experiences have helped me build confidence, share ideas and contribute to a community.</p></div>
        <div className="achievement-layout">
          <div className="research-feature"><div className="research-glow" /><span className="research-icon"><FileText size={21} /></span><span className="research-kicker">RESEARCH / NCCMEA 2024</span><h3>Shielding the Connected World: <em>A Deep Dive into IoT Vulnerabilities and Safeguards</em></h3><p>Research paper presented at the National Conference.</p><div className="research-footer"><span>RESEARCH PAPER</span><span>2024</span></div></div>
          <div className="achievement-list">{awards.map((item, i) => <motion.div className="achievement-item" key={item.n} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: false, amount: .3 }} transition={{ delay: i * .05 }}><span className="achievement-icon"><item.icon size={19} /></span><div><h3>{item.title}</h3><p>{item.sub}</p></div><span className="achievement-number">{item.n}</span></motion.div>)}</div>
        </div>
        <div className="certifications"><div className="certification-heading"><div><span className="eyebrow">CONTINUOUS LEARNING</span><h3>Certifications & credentials</h3></div><span>05 / LEARNING LOG</span></div><div className="certification-grid">{certificates.map(([title, source, credentialUrl], i) => <div className="certification-item" key={title}><span>0{i + 1}</span><div>{credentialUrl ? <a className="certification-link" href={credentialUrl} target="_blank" rel="noreferrer" aria-label={`${title}, view credential`}><b>{title}</b><small>{source}</small></a> : <><b>{title}</b><small>{source}</small></>}</div>{credentialUrl && <ArrowUpRight size={15} />}</div>)}</div></div>
      </section>

      <section id="contact" className="contact page-section">
        <SectionLabel number="06">LET'S CONNECT</SectionLabel>
        <div className="contact-layout"><div className="contact-copy"><span className="availability"><i /> OPEN TO MEANINGFUL OPPORTUNITIES</span><h2 className="section-title">Have an idea?<br /><em>Let's build it.</em></h2><p>I'm always glad to connect with people who enjoy building, learning and making thoughtful things happen.</p><a className="contact-email" href="mailto:anaghaajidev@gmail.com">anaghaajidev@gmail.com <ArrowUpRight size={20} /></a></div>
          <div className="contact-cards"><a href="mailto:anaghaajidev@gmail.com"><span><Mail size={19} /></span><div><small>EMAIL</small><b>Say hello</b></div><ArrowUpRight size={18} /></a><a href="tel:+917907100949"><span><Phone size={19} /></span><div><small>PHONE</small><b>+91 7907100949</b></div><ArrowUpRight size={18} /></a><a href="https://www.linkedin.com/in/anagha-ajidev" target="_blank" rel="noreferrer"><span><Linkedin size={19} /></span><div><small>LINKEDIN</small><b>Connect professionally</b></div><ArrowUpRight size={18} /></a><a href="https://github.com/AnaghaAjidev" target="_blank" rel="noreferrer"><span><Github size={19} /></span><div><small>GITHUB</small><b>Explore my code</b></div><ArrowUpRight size={18} /></a></div>
        </div>
        <footer className="site-footer"><span>© 2026 ANAGHA AJIDEV</span><span>DESIGNED WITH INTENTION <i>✳</i></span><button onClick={() => go('home')}>BACK TO TOP ↑</button></footer>
      </section>
    </main>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
