import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  User, 
  Briefcase, 
  Mail, 
  Cpu, 
  Shield, 
  Activity,
  Github,
  Linkedin,
  Gitlab,
  ExternalLink,
  ChevronRight,
  Download,
  X
} from 'lucide-react';
import { Terminal } from './components/Terminal';
import { GlitchText } from './components/GlitchText';
import { HUDFrame } from './components/HUDFrame';
import { CyberBackground } from './components/CyberBackground';


type Section = 'boot' | 'about' | 'work' | 'education' | 'achievements' | 'contact';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('boot');
  const [bootComplete, setBootComplete] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const bootSequence = [
    "INITIALIZING NEURAL_LINK V2.4.0...",
    "LOADING CORE MODULES...",
    "ESTABLISHING SECURE CONNECTION...",
    "DECRYPTING BIOMETRIC DATA...",
    "ACCESS GRANTED: WELCOME, OPERATOR.",
  ];

  useEffect(() => {
    if (bootComplete) {
      setTimeout(() => setActiveSection('about'), 500);
    }
  }, [bootComplete]);

  // Close mobile menu when section changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeSection]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const NavItem = ({ id, icon: Icon, label }: { id: Section; icon: any; label: string }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`flex items-center space-x-4 px-6 py-4 md:px-4 md:py-3 w-full transition-all duration-300 group relative cursor-pointer ${
        activeSection === id 
          ? 'bg-neon-cyan/20 border-r-4 border-neon-cyan text-neon-cyan' 
          : 'text-white/50 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={20} className={activeSection === id ? 'animate-pulse' : 'group-hover:scale-110 group-hover:text-neon-cyan transition-all'} />
      <span className="font-mono text-xs md:text-[10px] uppercase tracking-widest">{label}</span>
      {activeSection === id && (
        <motion.div 
          layoutId="active-indicator"
          className="ml-auto w-1.5 h-1.5 bg-neon-cyan rounded-full shadow-[0_0_8px_#00f3ff]"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      <div className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/5 transition-colors pointer-events-none" />
      
    </button>
  );

  const SystemLog = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const logPool = [
      'NEURAL_LINK: Connection established',
      'CORE: Thermal levels optimal',
      'MEM: Buffer cleared',
      'SEC: Firewall active',
      'NET: Packet routing optimized',
      'SYS: Module React.sys loaded',
      'SYS: Module Node.core loaded',
      'DATA: Encrypted stream detected',
      'USER: Access granted to LEVEL_05',
      'LOG: Background task initialized'
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setLogs(prev => [logPool[Math.floor(Math.random() * logPool.length)], ...prev].slice(0, 6));
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="space-y-1 font-mono text-[8px] text-neon-cyan/40">
        {logs.map((log, i) => (
          <motion.div 
            key={i + log}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <span className="mr-2">[{new Date().toLocaleTimeString()}]</span>
            <span className="truncate">{log}</span>
          </motion.div>
        ))}
        {logs.length === 0 && <div className="animate-pulse">Awaiting system events...</div>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cyber-bg selection:bg-neon-cyan selection:text-black overflow-hidden relative">
      {/* Cursor Glow */}
      <motion.div 
        className="fixed w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none z-0 hidden md:block"
        animate={{ 
          x: mousePos.x - 200, 
          y: mousePos.y - 200 
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />

      {/* Background Effects */}
      <CyberBackground />
      <div className="fixed inset-0 moving-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 scanlines opacity-20 pointer-events-none z-50" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.05),transparent_70%)] pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {activeSection === 'boot' && (
          <motion.div 
            key="boot"
            exit={{ opacity: 0, y: -20 }}
            className="h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-md w-full">
              <Terminal 
                lines={bootSequence} 
                onComplete={() => setBootComplete(true)} 
              />
              {bootComplete && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setActiveSection('about')}
                  className="mt-8 w-full border border-neon-cyan/50 py-3 font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors border-glow-cyan"
                >
                  Enter System
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {activeSection !== 'boot' && (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row h-screen"
          >
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-cyber-border bg-cyber-card/80 backdrop-blur-xl z-50 sticky top-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-neon-cyan/30 flex items-center justify-center relative overflow-hidden shrink-0">
                  <Activity size={14} className="text-neon-cyan animate-pulse" />
                  <div className="absolute inset-0 crt-flicker bg-neon-cyan/5" />
                </div>
                <GlitchText text="NEURAL_LINK" className="text-base font-bold tracking-tighter" />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-neon-cyan p-3 hover:bg-neon-cyan/10 rounded-lg transition-all border border-neon-cyan/20 active:scale-95"
                aria-label="Toggle Menu"
              >
                <TerminalIcon size={24} />
              </button>
            </div>

            {/* Mobile Backdrop */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
                />
              )}
            </AnimatePresence>

            {/* Sidebar Navigation */}
            <aside className={`
              fixed inset-0 z-[60] md:relative md:flex md:w-64 border-r border-cyber-border bg-cyber-card/98 md:bg-cyber-card/30 backdrop-blur-2xl flex flex-col transition-transform duration-300
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
              {/* Mobile Menu Close Header */}
              <div className="md:hidden flex items-center justify-between p-4 border-b border-cyber-border">
                <div className="flex items-center space-x-3">
                  <Activity size={18} className="text-neon-cyan" />
                  <span className="font-mono text-xs uppercase tracking-widest text-white">Menu</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/50 p-2 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="hidden md:block p-8 border-b border-cyber-border">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono text-neon-cyan/70 uppercase tracking-tighter">System Online</span>
                </div>
                <GlitchText text="NEURAL_LINK" className="text-xl font-bold tracking-tighter" />
              </div>

              <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
                <NavItem id="about" icon={User} label="System Profile" />
                <NavItem id="work" icon={Briefcase} label="Work History" />
                <NavItem id="education" icon={Cpu} label="Academic Records" />
                <NavItem id="achievements" icon={Shield} label="Neural Upgrades" />
                <NavItem id="contact" icon={Mail} label="Secure Channel" />
              </nav>

              <div className="p-6 border-t border-cyber-border space-y-6">
                <div>
                  <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-3 flex items-center">
                    <div className="w-1 h-1 bg-neon-cyan mr-2 animate-pulse" />
                    Live_System_Log
                  </div>
                  <SystemLog />
                </div>
                <div className="flex justify-around">
                  <a href="#" className="text-white/40 hover:text-neon-cyan transition-colors"><Github size={18} /></a>
                  <a href="#" className="text-white/40 hover:text-neon-cyan transition-colors"><Linkedin size={18} /></a>
                  <a href="#" className="text-white/40 hover:text-neon-cyan transition-colors"><Gitlab size={18} /></a>
                </div>
                <div className="text-[8px] font-mono text-white/20 text-center uppercase tracking-widest">
                  © 2026 JIMENA CHINCHILLA
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative custom-scrollbar">
              <div className="max-w-5xl mx-auto p-4 sm:p-8 md:p-12 space-y-8 md:space-y-12">
                
                <AnimatePresence mode="wait">

                  {activeSection === 'about' && (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"

                    >
                       <header className="space-y-2">
                        <h2 className="text-neon-cyan font-mono text-xs md:text-sm uppercase tracking-[0.4em]">Welcome, Operator</h2>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tighter">
                          I BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">INTELLIGENT SYSTEMS</span>
                        </h1>
                        <p className="text-white/60 max-w-xl text-base md:text-lg leading-relaxed">
                          Software Engineer and Artificial Intelligence student specializing in scalable AI infrastructure, machine learning systems, and advanced algorithm development.
                        </p>
                      </header>

                      <HUDFrame title="Subject Profile">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                          <div className="w-full max-w-[240px] mx-auto md:mx-0 aspect-[3/4] md:w-48 md:h-64 bg-white/5 border border-white/10 relative overflow-hidden group shrink-0">
                            <img 
                              src="/photo.jpg" 
                              alt="Profile" 
                              className="w-full h-full object-cover grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-neon-cyan/10 mix-blend-overlay" />
                            <div className="absolute inset-0 border-glow-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex-1 space-y-6 text-center md:text-left">
                            <div>
                              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter mb-2">OPERATOR_ID: JIMENA_CHINCHILLA</h2>
                              <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed">
                               Artificial Intelligence student and Software Engineer focused on building scalable intelligent systems and machine learning infrastructure. My work combines strong foundations in mathematics, algorithms, and software engineering with practical experience in AI development.
My professional experience includes developing automation and process optimization solutions. I also contributed to a research contract with BMW, developing computer vision pipelines for wildlife detection on roadways.  Across my academic and professional work, I have built 25+ projects involving machine learning models, algorithm development, and intelligent system design
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-left">
                              <div className="space-y-1">
                                <span className="text-[8px] sm:text-[10px] font-mono text-white/40 uppercase">Location</span>
                                <p className="text-[10px] sm:text-xs md:text-sm font-mono">MUNICH_BAVARIA / REMOTE</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[8px] sm:text-[10px] font-mono text-white/40 uppercase">Specialization</span>
                                <p className="text-[10px] sm:text-xs md:text-sm font-mono uppercase">AI Systems Architecture</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[8px] sm:text-[10px] font-mono text-white/40 uppercase">Clearance</span>
                                <p className="text-[10px] sm:text-xs md:text-sm font-mono text-neon-cyan">LEVEL (JUNIOR)</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[8px] sm:text-[10px] font-mono text-white/40 uppercase">Status</span>
                                <p className="text-[10px] sm:text-xs md:text-sm font-mono text-emerald-400 uppercase">Open_for_contracts</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </HUDFrame>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <HUDFrame title="Core Competencies" className="md:col-span-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                              <h3 className="text-[10px] font-mono text-neon-cyan mb-3 uppercase tracking-widest border-b border-neon-cyan/20 pb-1">Programming_Languages</h3>
                              <div className="flex flex-wrap gap-2">
                                {['Python', 'Java', 'JS/TS', 'SQL', 'C#', 'C++'].map(s => (
                                  <span key={s} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-1 border border-white/10">{s}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-[10px] font-mono text-neon-magenta mb-3 uppercase tracking-widest border-b border-neon-magenta/20 pb-1">Machine_Learning</h3>
                              <div className="flex flex-wrap gap-2">
                                {['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenCV'].map(s => (
                                  <span key={s} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-1 border border-white/10">{s}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-[10px] font-mono text-neon-cyan mb-3 uppercase tracking-widest border-b border-neon-cyan/20 pb-1">Cloud_DevOps</h3>
                              <div className="flex flex-wrap gap-2">
                                {['AWS', 'Docker', 'GitHub Actions', 'GitLab CI'].map(s => (
                                  <span key={s} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-1 border border-white/10">{s}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-[10px] font-mono text-neon-magenta mb-3 uppercase tracking-widest border-b border-neon-magenta/20 pb-1">Data_Science_Viz</h3>
                              <div className="flex flex-wrap gap-2">
                                {['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'R'].map(s => (
                                  <span key={s} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-1 border border-white/10">{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </HUDFrame>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'work' && (
                    <motion.div
                      key="work"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">Work_History</h2>
                        <button className="flex items-center space-x-2 px-4 py-2 border border-neon-cyan/30 text-[10px] font-mono uppercase tracking-widest hover:bg-neon-cyan hover:text-black transition-all w-full md:w-auto justify-center">
                          <Download size={14} />
                          <span>Download_Resume.pdf</span>
                        </button>
                      </div>

                      <div className="space-y-6">
                        {[
                          {
                            company: 'Freelance Software Engineer',
                            role: 'Machine learning engineer',
                            period: 'Present',
                            desc: 'I independently offer AI and algorithm development services to multiple clients on a contract basis. I have complete several automatizations and projects in the industry of logistics, commerce and technology.',
                            points: ['Python', 'Deep leaning', 'Computer Vision','Machine Learning']
                          },
            
                          {
                            company: 'Bayerische Motoren Werke (BMW) - Munich, Germany',
                            role: 'Computer Vision Research Engineer Intern (Contract)',
                            period: 'Mar 2024 - Aug 2024',
                            desc: 'Help to built and evaluated image processing and model inference workflows for real-time environmental perception. Designed and trained deep learning object detection models using convolutional neural networks (CNNs).',
                            points: ['Python', 'Deep leaning', 'Computer Vision','Machine Learning']
                          },
                           {
                            company: 'AMHERST INC - San Jose, Costa Rica',
                            role: 'Automation / Continuous Improvement Engineer',
                            period: 'Jun 2022 - Mar 2023',
                            desc: 'Collaborated with cross-functional teams to digitize and optimize internal processes, improving operational efficiency and system reliability. Built script-based automation tools for email handling, system updates, and data processing tasks.',
                            points: ['Python', 'Workflow Automation', 'Scripting', 'Process Optimization']
                          },
                          
                        ].map((exp, i) => (
                          <HUDFrame key={i} title={`Log_Entry #${(3-i).toString().padStart(2, '0')}`}>
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                              <div>
                                <h3 className="text-lg md:text-xl font-bold text-neon-cyan">{exp.company}</h3>
                                <p className="text-xs md:text-sm font-mono text-white/60">{exp.role}</p>
                              </div>
                              <span className="text-[10px] font-mono bg-white/5 px-2 py-1">{exp.period}</span>
                            </div>
                            <p className="text-white/70 mb-4 text-sm leading-relaxed">{exp.desc}</p>
                            <div className="flex flex-wrap gap-2">
                              {exp.points.map(p => (
                                <span key={p} className="text-[9px] font-mono text-neon-cyan/70 border border-neon-cyan/20 px-2 py-0.5">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </HUDFrame>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'education' && (
                    <motion.div
                      key="education"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">Academic_Records</h2>
                      <div className="space-y-6">
                        {[
                          {
                            school: 'TECHNISCHE_HOCHSCHULE DEGGENDORF',
                            degree: 'B.S. in Artificial Intelligence',
                            period: 'Sep 2023 – 2026 (Expected Graduation: 2027)',
                            desc: 'Technical Focus: Machine Learning • Mathematics • Algorithms & Data Structures • Computer Vision • Robotics • Natural Language Processing',
                            gpa: '1.8/2.7'
                          },
                          {
                            school: 'UNIVERSIDAD_LATINA DE COSTA RICA',
                            degree: 'B.Eng in Software Engineering',
                            period: '2022 - 2023',
                            desc: 'Core focus on Software Engineering and Low-Level Programming.',
                            gpa: '-'
                          }
                        ].map((edu, i) => (
                          <HUDFrame key={i} title={`Archive_Entry #${(2-i).toString().padStart(2, '0')}`}>
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                              <div>
                                <h3 className="text-lg md:text-xl font-bold text-neon-magenta">{edu.school}</h3>
                                <p className="text-xs md:text-sm font-mono text-white/60">{edu.degree}</p>
                              </div>
                              <span className="text-[10px] font-mono bg-white/5 px-2 py-1">{edu.period}</span>
                            </div>
                            <p className="text-white/70 mb-4 text-sm leading-relaxed">{edu.desc}</p>
                            <div className="text-[10px] font-mono text-neon-magenta/70">
                              GRADE_POINT_AVERAGE: {edu.gpa}
                            </div>
                          </HUDFrame>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'achievements' && (
                    <motion.div
                      key="achievements"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">Neural_Upgrades</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <HUDFrame title="Certifications">
                          <div className="space-y-4">
                            {[
                              { name: 'Technical Degree: Front-End development', issuer: 'Universidad de Costa Rica', date: 'Jan 2023 - Sept 2023 ' },
                              { name: 'Python Essentials', issuer: 'Cisco', date: 'May 2023' },
                              { name: 'Fundamentals of Cybersecurity (LCSPC)', issuer: 'Universidad Cenfotec', date: 'Feb 2022' },
                              { name: 'Python Programming for Application development', issuer: 'Universidad de Costa Rica', date: 'Oct 2021' }
                              
                            ].map((cert, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0">
                                <h3 className="text-sm font-bold text-neon-cyan">{cert.name}</h3>
                                <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                                  <span>{cert.issuer}</span>
                                  <span>{cert.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </HUDFrame>

                        <HUDFrame title="Hackathon_Records">
                          <div className="space-y-4">
                            {[
                              { name: 'Google_Gemini 3 Hackathon: FemTech', rank: '3th Place', year: '2025' },
                               { name: 'HackaTUM', rank: 'Participant', year: '2025' },
                                { name: 'HackaTUM', rank: 'Participant', year: '2024' },
                              { name: 'hackaton_Universidad de Costa rica', rank: 'Participant', year: '2023' },
                            
                            ].map((hack, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0">
                                <h3 className="text-sm font-bold text-neon-magenta">{hack.name}</h3>
                                <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                                  <span className="text-neon-magenta/70">{hack.rank}</span>
                                  <span>{hack.year}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </HUDFrame>
                        
                      
                        <HUDFrame title="Achievements & Clubs ">
                          <div className="space-y-4">
                            {[
                               { name: 'United AI', role: 'Student Member', period: 'Present' },
                              { name: 'Latin America: 2018 Robotics Competition ', role: '3th Place: Group Project', period: '2018' },
                              { name: 'Canguro Matemático: Math competition', role: 'Top 100 National Performance', period: '2015' },
                             
                            ].map((club, i) => (
                              <div key={i} className="border-b border-white/5 pb-3 last:border-0">
                                <h3 className="text-sm font-bold text-white/90">{club.name}</h3>
                                <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                                  <span className="text-neon-cyan/70">{club.role}</span>
                                  <span>{club.period}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </HUDFrame>
                      </div>

                      <HUDFrame title="Technical_Achievements">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { label: 'GITHUB_CONTRIBUTIONS', val: '' },
                            { label: 'STARS_EARNED', val: '1.2k' },
                            { label: 'SYSTEM_UPTIME', val: '99.9%' }
                          ].map(item => (
                            <div key={item.label} className="text-center p-4 border border-white/5 bg-white/2">
                              <span className="block text-[8px] font-mono text-white/30 uppercase mb-1">{item.label}</span>
                              <span className="text-xl font-bold text-neon-cyan">{item.val}</span>
                            </div>
                          ))}
                        </div>
                      </HUDFrame>
                    </motion.div>
                  )}
                  
  {activeSection === 'contact' && (
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="max-w-2xl mx-auto space-y-8"
                    >
                      <div className="text-center space-y-4">
                        <GlitchText text="ESTABLISH_CONNECTION" className="text-2xl md:text-4xl font-black tracking-tighter" />
                        <p className="text-white/60 font-mono text-[10px] uppercase tracking-widest">Secure encrypted channel open for transmission</p>
                      </div>

                      <HUDFrame title="Transmission_Form">
                        {formState === 'success' ? (
                          <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-16 h-16 rounded-full border-2 border-neon-cyan flex items-center justify-center text-neon-cyan"
                            >
                              <Shield size={32} />
                            </motion.div>
                            <h3 className="text-xl font-bold text-neon-cyan uppercase tracking-widest">Transmission_Received</h3>
                            <p className="text-white/60 font-mono text-xs">Your message has been encrypted and stored in the secure vault.</p>
                            <button 
                              onClick={() => setFormState('idle')}
                              className="mt-4 text-neon-cyan font-mono text-[10px] uppercase border border-neon-cyan/30 px-4 py-2 hover:bg-neon-cyan/10 transition-colors"
                            >
                              Send_Another_Transmission
                            </button>
                          </div>
                        ) : (
                          <form 
                            className="space-y-6" 
                            onSubmit={(e) => {
                              e.preventDefault();
                              setFormState('sending');
                              setTimeout(() => setFormState('success'), 2000);
                            }}
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Sender_Name</label>
                                <input 
                                  required
                                  type="text" 
                                  className="w-full bg-white/5 border border-white/10 p-3 font-mono text-sm focus:border-neon-cyan outline-none transition-colors"
                                  placeholder="IDENTIFY_YOURSELF"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Return_Address</label>
                                <input 
                                  required
                                  type="email" 
                                  className="w-full bg-white/5 border border-white/10 p-3 font-mono text-sm focus:border-neon-cyan outline-none transition-colors"
                                  placeholder="EMAIL@DOMAIN.COM"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Phone_Number</label>
                                <input 
                                  type="tel" 
                                  className="w-full bg-white/5 border border-white/10 p-3 font-mono text-sm focus:border-neon-cyan outline-none transition-colors"
                                  placeholder="+1 (XXX) XXX-XXXX"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Transmission_Payload</label>
                              <textarea 
                                required
                                rows={5}
                                className="w-full bg-white/5 border border-white/10 p-3 font-mono text-sm focus:border-neon-cyan outline-none transition-colors resize-none"
                                placeholder="ENTER_MESSAGE_DATA..."
                              />
                            </div>
                            <button 
                              disabled={formState === 'sending'}
                              className="w-full bg-neon-cyan text-black font-mono text-xs uppercase tracking-[0.3em] py-4 hover:bg-white disabled:bg-white/20 disabled:text-white/40 transition-colors flex items-center justify-center space-x-2"
                            >
                              {formState === 'sending' ? (
                                <>
                                  <Activity size={16} className="animate-spin" />
                                  <span>Encrypting_Data...</span>
                                </>
                              ) : (
                                <>
                                  <TerminalIcon size={16} />
                                  <span>Send_Transmission</span>
                                </>
                              )}
                            </button>
                          </form>
                        )}
                      </HUDFrame>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { label: 'Email', val: 'jimemettr@gmail.com' },
                          { label: 'Phone', val: '+49 151 58394952' },
                          { label: 'Location', val: '127.0.0.1' }
                        ].map(item => (
                          <div key={item.label} className="text-center p-4 border border-white/5 bg-white/2">
                            <span className="block text-[8px] font-mono text-white/30 uppercase mb-1">{item.label}</span>
                            <span className="text-[10px] font-mono text-neon-cyan">{item.val}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global HUD Elements */}
      {activeSection !== 'boot' && (
        <>
          <div className="fixed top-4 right-4 z-50 hidden md:flex items-center space-x-6">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Local_Time</span>
              <span className="text-xs font-mono text-neon-cyan">{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neon-cyan/30 flex items-center justify-center relative overflow-hidden">
              <Activity size={18} className="text-neon-cyan animate-pulse" />
              <div className="absolute inset-0 crt-flicker bg-neon-cyan/5" />
            </div>
          </div>
          
          <div className="hidden md:flex fixed bottom-4 left-72 z-50 items-center space-x-6 text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full" />
              <span>Network: Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-neon-cyan rounded-full" />
              <span>Latency: 12ms</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-neon-magenta rounded-full" />
              <span>Session: Active</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
